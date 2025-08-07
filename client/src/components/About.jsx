import { IoClose, IoGlobeOutline, IoLogoGithub } from "react-icons/io5";
import { useTheme } from "../hooks/useTheme";
import PropTypes from "prop-types";

const About = ({ isOpen, onClose }) => {
    const { appTheme } = useTheme();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`w-full max-w-md mx-4 h-full md:h-auto md:rounded-lg ${appTheme.background} ${appTheme.border} border`}>
                {/* Header */}
                <div className={`flex items-center justify-between p-4 border-b ${appTheme.border}`}>
                    <h2 className={`text-lg font-semibold ${appTheme.text}`}>About Connexus</h2>
                    <button
                        onClick={onClose}
                        className={`p-1 rounded-full ${appTheme.sidebarHover}`}
                    >
                        <IoClose size={20} className={appTheme.text} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {/* App Info */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-[#7480FF] mb-2">Connexus</h3>
                        <p className={`text-sm ${appTheme.textSecondary} mb-4`}>
                            A modern real-time chat application built with React, Socket.io, and MongoDB.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                        <h4 className={`font-semibold ${appTheme.text}`}>Features:</h4>
                        <ul className={`space-y-2 text-sm ${appTheme.textSecondary}`}>
                            <li>• Real-time messaging</li>
                            <li>• Message editing and deletion</li>
                            <li>• Online status indicators</li>
                            <li>• Customizable themes</li>
                            <li>• Progressive Web App (PWA)</li>
                            <li>• Responsive design</li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div className="space-y-3">
                        <h4 className={`font-semibold ${appTheme.text}`}>Links:</h4>
                        <div className="space-y-2">
                            <a
                                href="https://github.com/yourusername/connexus"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-3 p-3 rounded-lg ${appTheme.sidebarHover} ${appTheme.text} hover:bg-blue-600 hover:text-white transition-colors`}
                            >
                                <IoLogoGithub size={20} />
                                <span>Source Code</span>
                            </a>

                            <a
                                href="https://your-blog-platform.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-3 p-3 rounded-lg ${appTheme.sidebarHover} ${appTheme.text} hover:bg-blue-600 hover:text-white transition-colors`}
                            >
                                <IoGlobeOutline size={20} />
                                <span>Blog Platform</span>
                            </a>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-3">
                        <h4 className={`font-semibold ${appTheme.text}`}>Built with:</h4>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'Redux', 'Socket.io', 'MongoDB', 'Tailwind CSS', 'Vite'].map((tech) => (
                                <span
                                    key={tech}
                                    className={`px-2 py-1 text-xs rounded-full ${appTheme.sidebarHover} ${appTheme.textSecondary}`}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Version */}
                    <div className="text-center pt-4 border-t border-gray-700">
                        <p className={`text-xs ${appTheme.textSecondary}`}>
                            Version 1.0.0 • Built with ❤️
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

About.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default About;
