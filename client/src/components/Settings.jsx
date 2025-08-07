import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoClose, IoSettings, IoColorPalette, IoChatbubbleEllipses, IoImage, IoNotifications } from 'react-icons/io5';
import { useTheme } from '../hooks/useTheme';

const Settings = ({ isOpen, onClose }) => {
    const {
        appTheme,
        currentAppTheme,
        currentChatTheme,
        currentWallpaper,
        setAppTheme,
        setChatTheme,
        setWallpaper,
        themes,
    } = useTheme();

    const [activeTab, setActiveTab] = useState('general');

    if (!isOpen) return null;

    const tabs = [
        { id: 'general', label: 'General', icon: IoSettings },
        { id: 'notifications', label: 'Notifications', icon: IoNotifications },
        { id: 'appearance', label: 'App Theme', icon: IoColorPalette },
        { id: 'chat', label: 'Chat Theme', icon: IoChatbubbleEllipses },
        { id: 'wallpaper', label: 'Wallpaper', icon: IoImage },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-animate">
            <div className={`w-full max-w-4xl h-full md:max-h-[90vh] md:h-auto ${appTheme.sidebar} ${appTheme.text} md:rounded-lg shadow-xl bounce-in`}>
                {/* Header */}
                <div className={`flex items-center justify-between p-4 border-b ${appTheme.border}`}>
                    <h2 className="text-xl font-semibold">Settings</h2>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-lg ${appTheme.sidebarHover}`}
                    >
                        <IoClose size={20} />
                    </button>
                </div>

                <div className="flex h-[70vh]">
                    {/* Sidebar */}
                    <div className={`w-64 ${appTheme.border} border-r`}>
                        <div className="p-4">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                            ? 'bg-blue-600 text-white'
                                            : `${appTheme.sidebarHover} ${appTheme.text}`
                                            }`}
                                    >
                                        <Icon size={20} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        {activeTab === 'general' && (
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">General Settings</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span>Auto-download Media</span>
                                        <input type="checkbox" className="toggle" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Read Receipts</span>
                                        <input type="checkbox" className="toggle" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Online Status</span>
                                        <input type="checkbox" className="toggle" defaultChecked />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">Notifications</h3>
                                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                    <div className="p-4 bg-blue-100 rounded-full">
                                        <IoNotifications size={32} className="text-blue-600" />
                                    </div>
                                    <h4 className="text-lg font-medium text-blue-600">Coming Soon!</h4>
                                    <p className={`text-center ${appTheme.textSecondary} max-w-sm`}>
                                        Push notifications and notification settings will be available in the next update.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'appearance' && (
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">App Theme</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {Object.entries(themes.appThemes).map(([key, theme]) => (
                                        <button
                                            key={key}
                                            onClick={() => setAppTheme(key)}
                                            className={`p-4 rounded-lg border-2 transition-colors ${currentAppTheme === key
                                                ? 'border-blue-500 bg-blue-500 bg-opacity-20'
                                                : `border-gray-600 ${appTheme.sidebarHover}`
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-6 h-6 rounded-full ${theme.sidebar}`}></div>
                                                <span>{theme.name}</span>
                                                {currentAppTheme === key && (
                                                    <span className="ml-auto text-blue-500">✓</span>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'chat' && (
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">Chat Theme</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {Object.entries(themes.chatThemes).map(([key, theme]) => (
                                        <button
                                            key={key}
                                            onClick={() => setChatTheme(key)}
                                            className={`p-4 rounded-lg border-2 transition-colors ${currentChatTheme === key
                                                ? 'border-blue-500 bg-blue-500 bg-opacity-20'
                                                : `border-gray-600 ${appTheme.sidebarHover}`
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <span>{theme.name}</span>
                                                {currentChatTheme === key && (
                                                    <span className="ml-auto text-blue-500">✓</span>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <div className={`w-16 h-8 rounded-lg ${theme.sentBubble} flex items-center justify-center text-xs text-white`}>
                                                    Sent
                                                </div>
                                                <div className={`w-16 h-8 rounded-lg ${theme.receivedBubble} flex items-center justify-center text-xs ${theme.text}`}>
                                                    Received
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'wallpaper' && (
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">Chat Wallpaper</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(themes.wallpapers).map(([key, wallpaper]) => (
                                        <button
                                            key={key}
                                            onClick={() => setWallpaper(key)}
                                            className={`p-4 rounded-lg border-2 h-32 transition-colors ${currentWallpaper === key
                                                ? 'border-blue-500'
                                                : 'border-gray-600'
                                                } ${wallpaper.background || appTheme.sidebar}`}
                                        >
                                            <div className="flex flex-col items-center justify-center h-full">
                                                <span className={`text-sm ${wallpaper.background ? 'text-white' : appTheme.text}`}>
                                                    {wallpaper.name}
                                                </span>
                                                {currentWallpaper === key && (
                                                    <span className="mt-2 text-blue-500">✓</span>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

Settings.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Settings;
