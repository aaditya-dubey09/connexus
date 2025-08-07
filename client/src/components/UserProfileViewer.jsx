import { IoClose } from "react-icons/io5";
import { useTheme } from "../hooks/useTheme";
import PropTypes from "prop-types";

const UserProfileViewer = ({ isOpen, onClose, userDetails }) => {
    const { appTheme } = useTheme();

    const defaultAvatars = [
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face"
    ];

    const getDefaultAvatar = (userId) => {
        const index = userId ? userId.charCodeAt(userId.length - 1) % defaultAvatars.length : 0;
        return defaultAvatars[index];
    };

    if (!isOpen || !userDetails) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-95 modal-animate">
            <div className={`w-full max-w-md mx-4 h-full md:h-auto md:rounded-lg ${appTheme.background} ${appTheme.border} border bounce-in`}>
                {/* Header */}
                <div className={`flex items-center justify-between p-4 border-b ${appTheme.border}`}>
                    <h2 className={`text-lg font-semibold ${appTheme.text}`}>User Profile</h2>
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
                                    src={userDetails?.avatar || getDefaultAvatar(userDetails?._id)}
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                    onError={(e) => {
                                        e.target.src = getDefaultAvatar(userDetails?._id);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${appTheme.text}`}>
                                Full Name
                            </label>
                            <p className={`px-3 py-2 rounded-lg ${appTheme.background} ${appTheme.text}`}>
                                {userDetails?.fullName}
                            </p>
                        </div>

                        {/* Username */}
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${appTheme.text}`}>
                                Username
                            </label>
                            <p className={`px-3 py-2 rounded-lg ${appTheme.background} ${appTheme.text}`}>
                                @{userDetails?.username}
                            </p>
                        </div>

                        {/* About */}
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${appTheme.text}`}>
                                About
                            </label>
                            <p className={`px-3 py-2 rounded-lg ${appTheme.background} ${appTheme.textSecondary}`}>
                                {userDetails?.bio || "Hey there! I'm using Connexus."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserProfileViewer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    userDetails: PropTypes.shape({
        _id: PropTypes.string,
        avatar: PropTypes.string,
        fullName: PropTypes.string,
        username: PropTypes.string,
        bio: PropTypes.string,
    }),
};

export default UserProfileViewer;
