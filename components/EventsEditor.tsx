import React, { useState, useEffect, useRef } from 'react';
import { AppConfig, DEFAULT_APP_CONFIG, EventItem } from '../types';
import { GOOGLE_SHEET_WEB_APP_URL } from '../config';

const EventsEditor: React.FC = () => {
    const [config, setConfig] = useState<AppConfig>(DEFAULT_APP_CONFIG);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    useEffect(() => {
        const loadConfig = async () => {
            if (!GOOGLE_SHEET_WEB_APP_URL) return;
            setIsLoading(true);
            try {
                const response = await fetch(`${GOOGLE_SHEET_WEB_APP_URL}?action=getConfig`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const text = await response.text();
                try {
                    const data = JSON.parse(text);
                    if (data) setConfig(prev => ({ ...prev, ...data }));
                } catch (e) {
                    console.warn("Editor received non-JSON config, using default.");
                }
            } catch (e) {
                console.warn("Error loading config for editor", e);
            } finally {
                setIsLoading(false);
            }
        };
        loadConfig();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveMessage(null);
        try {
            if (!GOOGLE_SHEET_WEB_APP_URL) throw new Error("API URL not configured");
            const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ action: 'saveConfig', config: config }),
            });
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            const text = await response.text();
            let result;
            try {
                result = JSON.parse(text);
            } catch (e) {
                throw new Error("Invalid response from server");
            }
            if (result.result === 'success') {
                setSaveMessage({ type: 'success', text: 'Events saved successfully!' });
            } else {
                throw new Error(result.error || "Unknown error");
            }
        } catch (error) {
            console.error(error);
            setSaveMessage({ type: 'error', text: 'Failed to save changes. Check connection.' });
        } finally {
            setIsSaving(false);
        }
    };

    const updateEvent = (id: string, field: keyof EventItem, value: any) => {
        setConfig(prev => ({
            ...prev,
            events: prev.events.map(evt => evt.id === id ? { ...evt, [field]: value } : evt)
        }));
    };

    const addEvent = () => {
        const newEvent: EventItem = { id: Date.now().toString(), month: 'JAN', day: '1', type: 'EVENT', title: 'New Event', time: '12:00 PM', location: 'Virtual', description: 'Event description.', buttonText: 'RSVP', typeColor: 'text-[#0bceff]', url: '#' };
        setConfig(prev => ({ ...prev, events: [...prev.events, newEvent] }));
    };

    const deleteEvent = (id: string) => {
        if (!window.confirm("Delete this event?")) return;
        setConfig(prev => ({ ...prev, events: prev.events.filter(e => e.id !== id) }));
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
        dragItem.current = position;
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
        dragOverItem.current = position;
        e.preventDefault();
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const copyListItems = [...config.events];
        if (dragItem.current !== null && dragOverItem.current !== null) {
            const dragItemContent = copyListItems[dragItem.current];
            copyListItems.splice(dragItem.current, 1);
            copyListItems.splice(dragOverItem.current, 0, dragItemContent);
            dragItem.current = null;
            dragOverItem.current = null;
            setConfig(prev => ({ ...prev, events: copyListItems }));
        }
    };

    if (isLoading) return <div className="text-center py-10">Loading events...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm sticky top-24 z-20 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-700">Events Manager</h2>
                <div className="flex items-center gap-4">
                     {saveMessage && <span className={`text-sm font-medium ${saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{saveMessage.text}</span>}
                    <button onClick={addEvent} className="text-primary hover:bg-purple-50 px-3 py-1 rounded-md text-sm font-medium flex items-center gap-1 transition-colors border border-transparent hover:border-purple-100"><span className="material-symbols-outlined text-lg">add</span> Add Event</button>
                    <button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-medium shadow-sm disabled:opacity-50 transition-colors">{isSaving ? 'Saving...' : 'Save Changes'}</button>
                </div>
            </div>
            <p className="text-sm text-gray-500 mb-4 bg-blue-50 p-2 rounded border border-blue-100"><span className="font-semibold">Tip:</span> Drag and drop events to reorder them.</p>
            <div className="space-y-6">
                {config.events.map((evt, index) => (
                    <div key={evt.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:border-primary/50 transition-colors" draggable onDragStart={(e) => handleDragStart(e, index)} onDragEnter={(e) => handleDragEnter(e, index)} onDragOver={handleDragOver} onDrop={handleDrop}>
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center pt-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"><span className="material-symbols-outlined">drag_indicator</span></div>
                            <div className="flex-grow space-y-4">
                                <div className="grid md:grid-cols-12 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Month</label>
                                        <input type="text" value={evt.month} onChange={(e) => updateEvent(evt.id, 'month', e.target.value)} className="w-full border-gray-300 rounded-md text-sm p-2" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Day</label>
                                        <input type="text" value={evt.day} onChange={(e) => updateEvent(evt.id, 'day', e.target.value)} className="w-full border-gray-300 rounded-md text-sm p-2" />
                                    </div>
                                    <div className="md:col-span-4">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Event Title</label>
                                        <input type="text" value={evt.title} onChange={(e) => updateEvent(evt.id, 'title', e.target.value)} className="w-full border-gray-300 rounded-md text-sm p-2 font-semibold" />
                                    </div>
                                    <div className="md:col-span-4">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Date/Time</label>
                                        <input type="text" value={evt.time} onChange={(e) => updateEvent(evt.id, 'time', e.target.value)} className="w-full border-gray-300 rounded-md text-sm p-2" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                     <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                                        <textarea value={evt.description} onChange={(e) => updateEvent(evt.id, 'description', e.target.value)} rows={3} className="w-full border-gray-300 rounded-md text-sm p-2" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                             <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                                                <input type="text" value={evt.type} onChange={(e) => updateEvent(evt.id, 'type', e.target.value)} className="w-full border-gray-300 rounded-md text-sm p-2" />
                                            </div>
                                             <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Color Class</label>
                                                <select value={evt.typeColor} onChange={(e) => updateEvent(evt.id, 'typeColor', e.target.value)} className="w-full border-gray-300 rounded-md text-sm p-2">
                                                    <option value="text-[#0bceff]">Cyan</option>
                                                    <option value="text-blue-600">Blue</option>
                                                    <option value="text-purple-600">Purple</option>
                                                </select>
                                            </div>
                                        </div>
                                         <div className="grid grid-cols-2 gap-4">
                                             <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Button Text</label>
                                                <input type="text" value={evt.buttonText} onChange={(e) => updateEvent(evt.id, 'buttonText', e.target.value)} className="w-full border-gray-300 rounded-md text-sm p-2" />
                                            </div>
                                             <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Link URL</label>
                                                <input type="text" value={evt.url} onChange={(e) => updateEvent(evt.id, 'url', e.target.value)} className="w-full border-gray-300 rounded-md text-sm p-2" />
                                            </div>
                                        </div>
                                         <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                                            <input type="text" value={evt.location} onChange={(e) => updateEvent(evt.id, 'location', e.target.value)} className="w-full border-gray-300 rounded-md text-sm p-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start"><button onClick={() => deleteEvent(evt.id)} className="text-red-400 hover:text-red-600 p-1"><span className="material-symbols-outlined">delete</span></button></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsEditor;