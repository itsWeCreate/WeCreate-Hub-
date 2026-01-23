import React, { useState, useEffect, useRef } from 'react';
import { AppConfig, DEFAULT_APP_CONFIG, LinkButton, InfoSection } from '../types';
import { GOOGLE_SHEET_WEB_APP_URL } from '../config';

const InfoPageEditor: React.FC = () => {
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
                    if (data && data.profile) {
                        const buttonsWithDefaults = (data.buttons || []).map((b: any) => ({
                            ...b,
                            fullWidth: b.fullWidth !== undefined ? b.fullWidth : true
                        }));
                        setConfig(prev => ({ ...prev, ...data, buttons: buttonsWithDefaults }));
                    }
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
                setSaveMessage({ type: 'success', text: 'Changes saved successfully!' });
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

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setConfig(prev => ({ ...prev, profile: { ...prev.profile, [name]: value } }));
    };

    const updateButton = (id: string, field: keyof LinkButton, value: any) => {
        setConfig(prev => ({
            ...prev,
            buttons: prev.buttons.map(b => b.id === id ? { ...b, [field]: value } : b)
        }));
    };

    const addButton = () => {
        const newBtn: LinkButton = {
            id: Date.now().toString(),
            title: 'New Link',
            url: '',
            icon: 'link',
            isExternal: true,
            isActive: true,
            fullWidth: true
        };
        setConfig(prev => ({ ...prev, buttons: [...prev.buttons, newBtn] }));
    };

    const deleteButton = (id: string) => {
        if (!window.confirm("Delete this button?")) return;
        setConfig(prev => ({ ...prev, buttons: prev.buttons.filter(b => b.id !== id) }));
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
        const copyListItems = [...config.buttons];
        if (dragItem.current !== null && dragOverItem.current !== null) {
            const dragItemContent = copyListItems[dragItem.current];
            copyListItems.splice(dragItem.current, 1);
            copyListItems.splice(dragOverItem.current, 0, dragItemContent);
            dragItem.current = null;
            dragOverItem.current = null;
            setConfig(prev => ({ ...prev, buttons: copyListItems }));
        }
    };

    const updateSection = (id: string, field: keyof InfoSection, value: any) => {
        setConfig(prev => ({
            ...prev,
            sections: prev.sections.map(s => s.id === id ? { ...s, [field]: value } : s)
        }));
    };

    const addSection = () => {
        const newSec: InfoSection = { id: Date.now().toString(), title: 'New Section', content: '', icon: 'info' };
        setConfig(prev => ({ ...prev, sections: [...prev.sections, newSec] }));
    };

    const deleteSection = (id: string) => {
        if (!window.confirm("Delete this section?")) return;
        setConfig(prev => ({ ...prev, sections: prev.sections.filter(s => s.id !== id) }));
    };

    const updateSocial = (id: string, url: string) => {
        setConfig(prev => ({ ...prev, socialLinks: prev.socialLinks.map(s => s.id === id ? { ...s, url } : s) }));
    };

    if (isLoading) return <div className="text-center py-10">Loading configuration...</div>;

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm sticky top-24 z-20 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-700">Info Page Configuration</h2>
                <div className="flex items-center gap-4">
                     {saveMessage && <span className={`text-sm font-medium ${saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{saveMessage.text}</span>}
                    <button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-medium shadow-sm disabled:opacity-50 transition-colors">{isSaving ? 'Saving...' : 'Save Changes'}</button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm">
                <h3 className="text-xl font-heading font-semibold mb-4 text-gray-800 flex items-center gap-2"><span className="material-symbols-outlined">person</span> Profile Settings</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                        <input type="text" name="name" value={config.profile.name} onChange={handleProfileChange} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avatar Image URL</label>
                        <input type="text" name="avatarUrl" value={config.profile.avatarUrl} onChange={handleProfileChange} placeholder="https://..." className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border" />
                        <p className="text-xs text-gray-500 mt-1">Leave empty to use default logo.</p>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea name="bio" value={config.profile.bio} onChange={handleProfileChange} rows={3} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border" />
                    </div>
                </div>
                <h4 className="font-medium text-gray-700 mt-6 mb-3">Social Links</h4>
                <div className="grid md:grid-cols-3 gap-4">
                    {config.socialLinks.map(link => (
                        <div key={link.id}>
                            <label className="block text-xs uppercase text-gray-500 mb-1">{link.platform}</label>
                            <input type="text" value={link.url} onChange={(e) => updateSocial(link.id, e.target.value)} placeholder="URL" className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2 border" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-heading font-semibold text-gray-800 flex items-center gap-2"><span className="material-symbols-outlined">smart_button</span> Link Buttons</h3>
                    <button onClick={addButton} className="text-primary hover:bg-purple-50 px-3 py-1 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"><span className="material-symbols-outlined text-lg">add</span> Add Button</button>
                </div>
                <p className="text-sm text-gray-500 mb-4 bg-blue-50 p-2 rounded border border-blue-100"><span className="font-semibold">Tip:</span> Drag and drop buttons using the handle icon on the left to reorder them.</p>
                <div className="space-y-4">
                    {config.buttons.map((btn, index) => (
                        <div key={btn.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary/50 transition-colors bg-gray-50 cursor-default" draggable onDragStart={(e) => handleDragStart(e, index)} onDragEnter={(e) => handleDragEnter(e, index)} onDragOver={handleDragOver} onDrop={handleDrop}>
                            <div className="grid md:grid-cols-12 gap-4 items-start">
                                <div className="md:col-span-1 flex flex-col items-center gap-2 pt-4 cursor-grab active:cursor-grabbing"><span className="material-symbols-outlined text-gray-400">drag_indicator</span></div>
                                <div className="md:col-span-10 grid md:grid-cols-2 gap-4">
                                    <input type="text" value={btn.title} onChange={(e) => updateButton(btn.id, 'title', e.target.value)} placeholder="Button Title (Header)" className="border-gray-300 rounded-md p-2 border text-sm font-medium" />
                                    <input type="text" value={btn.subtitle || ''} onChange={(e) => updateButton(btn.id, 'subtitle', e.target.value)} placeholder="Subtitle / Description" className="border-gray-300 rounded-md p-2 border text-sm" />
                                     <input type="text" value={btn.price || ''} onChange={(e) => updateButton(btn.id, 'price', e.target.value)} placeholder="Price (e.g. $197 or Free)" className="border-gray-300 rounded-md p-2 border text-sm" />
                                     <input type="text" value={btn.ctaText || ''} onChange={(e) => updateButton(btn.id, 'ctaText', e.target.value)} placeholder="CTA Button Text" className="border-gray-300 rounded-md p-2 border text-sm" />
                                    <input type="text" value={btn.url} onChange={(e) => updateButton(btn.id, 'url', e.target.value)} placeholder="Link URL" className="border-gray-300 rounded-md p-2 border text-sm" />
                                    <div className="flex gap-2">
                                        <input type="text" value={btn.icon} onChange={(e) => updateButton(btn.id, 'icon', e.target.value)} placeholder="Icon Name" className="border-gray-300 rounded-md p-2 border text-sm w-1/2" />
                                         <input type="text" value={btn.image || ''} onChange={(e) => updateButton(btn.id, 'image', e.target.value)} placeholder="Image URL" className="border-gray-300 rounded-md p-2 border text-sm w-1/2" />
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 col-span-2 bg-white p-2 rounded border border-gray-100">
                                         <label className="flex items-center gap-2 cursor-pointer hover:text-primary"><input type="checkbox" checked={btn.fullWidth !== false} onChange={(e) => updateButton(btn.id, 'fullWidth', e.target.checked)} className="rounded text-primary focus:ring-primary" /> Full Width</label>
                                         <label className="flex items-center gap-2 cursor-pointer hover:text-primary"><input type="checkbox" checked={btn.isExternal} onChange={(e) => updateButton(btn.id, 'isExternal', e.target.checked)} className="rounded text-primary focus:ring-primary" /> Open in new tab</label>
                                        <label className="flex items-center gap-2 cursor-pointer hover:text-primary"><input type="checkbox" checked={btn.isActive} onChange={(e) => updateButton(btn.id, 'isActive', e.target.checked)} className="rounded text-primary focus:ring-primary" /> Active</label>
                                    </div>
                                </div>
                                <div className="md:col-span-1 flex justify-end"><button onClick={() => deleteButton(btn.id)} className="text-red-400 hover:text-red-600 p-2"><span className="material-symbols-outlined">delete</span></button></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-heading font-semibold text-gray-800 flex items-center gap-2"><span className="material-symbols-outlined">view_list</span> Info Sections</h3>
                    <button onClick={addSection} className="text-primary hover:bg-purple-50 px-3 py-1 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"><span className="material-symbols-outlined text-lg">add</span> Add Section</button>
                </div>
                 <div className="space-y-4">
                    {config.sections.map((sec) => (
                        <div key={sec.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                             <div className="flex gap-4 items-start">
                                 <div className="w-12 pt-2">
                                     <input type="text" value={sec.icon} onChange={(e) => updateSection(sec.id, 'icon', e.target.value)} className="w-full border-gray-300 rounded-md p-1 border text-xs text-center" />
                                    <div className="text-center mt-1"><span className="material-symbols-outlined text-gray-500">{sec.icon}</span></div>
                                 </div>
                                 <div className="flex-grow space-y-3">
                                     <input type="text" value={sec.title} onChange={(e) => updateSection(sec.id, 'title', e.target.value)} placeholder="Section Title" className="w-full border-gray-300 rounded-md p-2 border text-sm font-semibold" />
                                    <textarea value={sec.content} onChange={(e) => updateSection(sec.id, 'content', e.target.value)} rows={4} placeholder="Content..." className="w-full border-gray-300 rounded-md p-2 border text-sm" />
                                 </div>
                                 <button onClick={() => deleteSection(sec.id)} className="text-red-400 hover:text-red-600"><span className="material-symbols-outlined">delete</span></button>
                             </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
};

export default InfoPageEditor;