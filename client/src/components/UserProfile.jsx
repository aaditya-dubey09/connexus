import { useState } from "react";
import { useSelector } from "react-redux";
import { IoClose, IoPencil, IoCheckmark, IoCamera } from "react-icons/io5";
import { useTheme } from "../hooks/useTheme";
import PropTypes from "prop-types";

const UserProfile = ({ isOpen, onClose }) => {
    const { userProfile } = useSelector((state) => state.userReducer);
    const { appTheme } = useTheme();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: userProfile?.username || "",
        fullName: userProfile?.fullName || "",
        bio: userProfile?.bio || "Hey there! I'm using Connexus.",
    });

    const defaultAvatars = [
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face"
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // TODO: Implement update profile API call
        console.log("Updating profile:", formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            username: userProfile?.username || "",
            fullName: userProfile?.fullName || "",
            bio: userProfile?.bio || "Hey there! I'm using Connexus.",
        });
        setIsEditing(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 modal-animate">
            <div className={`w-full max-w-md mx-4 h-full md:h-auto md:rounded-lg ${appTheme.background} ${appTheme.border} border bounce-in`}>
                {/* Header */}
                <div className={`flex items-center justify-between p-4 border-b ${appTheme.border}`}>
                    <h2 className={`text-lg font-semibold ${appTheme.text}`}>
                        {isEditing ? "Edit Profile" : "Profile"}
                    </h2>
                    <button
                        onClick={onClose}
                        className={`p-1 rounded-full ${appTheme.sidebarHover}`}
                    >
                        <IoClose size={20} className={appTheme.text} />
                    </button>
                </div>

                {/* Profile Content */}
                <div className="p-4 space-y-4">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div className="w-24 h-24 overflow-hidden border-4 border-blue-500 rounded-full">
                                <img
                                    src={userProfile?.avatar || defaultAvatars[0]}
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            {isEditing && (
                                <button className="absolute bottom-0 right-0 p-2 text-white bg-blue-600 rounded-full">
                                    <IoCamera size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        {/* Username */}
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${appTheme.text}`}>
                                Username
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 rounded-lg border ${appTheme.input} ${appTheme.text}`}
                                />
                            ) : (
                                <p className={`px-3 py-2 rounded-lg ${appTheme.background} ${appTheme.text}`}>
                                    @{userProfile?.username}
                                </p>
                            )}
                        </div>

                        {/* Full Name */}
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${appTheme.text}`}>
                                Full Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 rounded-lg border ${appTheme.input} ${appTheme.text}`}
                                />
                            ) : (
                                <p className={`px-3 py-2 rounded-lg ${appTheme.background} ${appTheme.text}`}>
                                    {userProfile?.fullName}
                                </p>
                            )}
                        </div>

                        {/* Bio */}
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${appTheme.text}`}>
                                About
                            </label>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className={`w-full px-3 py-2 rounded-lg border ${appTheme.input} ${appTheme.text}`}
                                    placeholder="Tell us about yourself..."
                                />
                            ) : (
                                <p className={`px-3 py-2 rounded-lg ${appTheme.background} ${appTheme.textSecondary}`}>
                                    {userProfile?.bio || "Hey there! I'm using Connexus."}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg"
                                >
                                    <IoCheckmark size={18} />
                                    Save Changes
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className={`px-4 py-2 rounded-lg ${appTheme.sidebarHover} ${appTheme.text}`}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg"
                            >
                                <IoPencil size={18} />
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

UserProfile.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default UserProfile;
