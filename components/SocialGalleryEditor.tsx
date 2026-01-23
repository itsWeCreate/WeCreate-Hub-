
import React, { useState, useEffect, useRef } from 'react';
import { AppConfig, DEFAULT_APP_CONFIG, SocialPost } from '../types';
import { GOOGLE_SHEET_WEB_APP_URL } from '../config';

const SocialGalleryEditor: React.FC = () => {
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
                    if (data && data.socialGallery) {
                        setConfig(prev => ({ ...prev, ...data }));
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
                setSaveMessage({ type: 'success', text: 'Gallery saved successfully!' });
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

    const updatePost = (id: string, field: keyof SocialPost, value: string) => {
        setConfig(prev => ({
            ...prev,
            socialGallery: prev.socialGallery.map(p => p.id === id ? { ...p, [field]: value } : p)
        }));
    };

    const addPost = () => {
        const newPost: SocialPost = {
            id: Date.now().toString(),
            title: 'New Video Title',
            videoUrl: '',
            link: '#',
            type: 'Studio Life',
            thumbnail: ''
        };
        setConfig(prev => ({ ...prev, socialGallery: [...prev.socialGallery, newPost] }));
    };

    const deletePost = (id: string) => {
        if (!window.confirm("Delete this video tile?")) return;
        setConfig(prev => ({ ...prev, socialGallery: prev.socialGallery.filter(p => p.id !== id) }));
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
        const copyListItems = [...config.socialGallery];
        if (dragItem.current !== null && dragOverItem.current !== null) {
            const dragItemContent = copyListItems[dragItem.current];
            copyListItems.splice(dragItem.current, 1);
            copyListItems.splice(dragOverItem.current, 0, dragItemContent);
            dragItem.current = null;
            dragOverItem.current = null;
            setConfig(prev => ({ ...prev, socialGallery: copyListItems }));
        }
    };

    if (isLoading) return <div className="text-center py-10">Loading social gallery...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm sticky top-24 z-20 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-700">Home Social Gallery Manager</h2>
                <div className="flex items-center gap-4">
                     {saveMessage && <span className={`text-sm font-medium ${saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{saveMessage.text}</span>}
                    <button onClick={addPost} className="text-primary hover:bg-purple-50 px-3 py-1 rounded-md text-sm font-medium flex items-center gap-1 transition-colors border border-transparent hover:border-purple-100"><span className="material-symbols-outlined text-lg">add</span> Add Video Tile</button>
                    <button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-medium shadow-sm disabled:opacity-50 transition-colors">{isSaving ? 'Saving...' : 'Save Changes'}</button>
                </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <h4 className="text-blue-800 font-bold text-sm mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">info</span>
                    Pro Tip for Videos:
                </h4>
                <p className="text-blue-700 text-sm">
                    To use Google Drive videos, simply paste the standard share link. We'll automatically convert it to a streamable link. Ensure the video is shared as "Anyone with the link can view".
                </p>
            </div>

            <div className="space-y-6">
                {config.socialGallery.map((post, index) => (
                    <div 
                        key={post.id} 
                        className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:border-primary/50 transition-colors" 
                        draggable 
                        onDragStart={(e) => handleDragStart(e, index)} 
                        onDragEnter={(e) => handleDragEnter(e, index)} 
                        onDragOver={handleDragOver} 
                        onDrop={handleDrop}
                    >
                        <div className="flex gap-6">
                            <div className="flex flex-col items-center pt-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">drag_indicator</span>
                            </div>
                            <div className="flex-grow space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Video Title</label>
                                        <input type="text" value={post.title} onChange={(e) => updatePost(post.id, 'title', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="e.g., Build Session v1" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Category / Type</label>
                                        <input type="text" value={post.type} onChange={(e) => updatePost(post.id, 'type', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="e.g., Studio Life" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Video URL (MP4 or Drive)</label>
                                        <input type="text" value={post.videoUrl} onChange={(e) => updatePost(post.id, 'videoUrl', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="https://drive.google.com/..." />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Redirect URL (On Click)</label>
                                        <input type="text" value={post.link} onChange={(e) => updatePost(post.id, 'link', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="https://instagram.com/..." />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Thumbnail Image URL</label>
                                    <input type="text" value={post.thumbnail} onChange={(e) => updatePost(post.id, 'thumbnail', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="https://images.unsplash.com/..." />
                                </div>
                            </div>
                            <div className="flex items-start">
                                <button onClick={() => deletePost(post.id)} className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors">
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {config.socialGallery.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
                        No video tiles added yet. Click "Add Video Tile" to get started.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SocialGalleryEditor;
