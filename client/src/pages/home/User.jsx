import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { setSelectedUser } from "../../store/slice/user/user.slice";
import { markMessagesAsRead } from "../../store/slice/message/message.slice";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { IoEye, IoChatbubbleEllipses } from "react-icons/io5";
import UserProfileViewer from "../../components/UserProfileViewer";

const User = ({ userDetails, conversation, className, userClassName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { appTheme } = useTheme();
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [showProfileViewer, setShowProfileViewer] = useState(false);
  const avatarRef = useRef(null);

  const { selectedUser } = useSelector((state) => state.userReducer);
  const { onlineUsers } = useSelector(state => state.socketReducer);
  const isUserOnline = onlineUsers?.includes(userDetails?._id);

  // Handle click outside to close avatar menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowAvatarMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails));
    dispatch(markMessagesAsRead(userDetails._id));
    navigate(`/users/${userDetails?.username}`);
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    setShowAvatarMenu(!showAvatarMenu);
  };

  const handleViewProfile = () => {
    setShowProfileViewer(true);
    setShowAvatarMenu(false);
  };

  const handleMessage = () => {
    handleUserClick();
    setShowAvatarMenu(false);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.abs(now - date) / 36e5;

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <div
      onClick={handleUserClick}
      className={`${className} smooth-transition hover-scale ${userDetails?._id === selectedUser?._id && userClassName ? userClassName : ''
}`}
    >
      <div className={`avatar ${isUserOnline ? 'online' : 'offline'} relative`} ref={avatarRef}>
        <div
          className={`md:w-12 w-10 rounded-full relative cursor-pointer ${userClassName}`}
          onClick={handleAvatarClick}
        >
          <img
            src={userDetails?.avatar || getDefaultAvatar(userDetails?._id)}
            alt={`${userDetails?.fullName} avatar`}
            onError={(e) => {
              e.target.src = getDefaultAvatar(userDetails?._id);
            }}
          />
        </div>

        {/* Avatar Menu */}
        {showAvatarMenu && (
          <div className={`absolute left-0 top-12 w-36 ${appTheme.background} ${appTheme.border} border rounded-lg shadow-lg z-10`}>
            <button
              onClick={handleViewProfile}
              className={`w-full flex items-center gap-3 px-3 py-2 text-left ${appTheme.sidebarHover} ${appTheme.text} hover:bg-blue-600 hover:text-white first:rounded-t-lg text-sm`}
            >
              <IoEye size={16} />
              View Profile
            </button>
            <button
              onClick={handleMessage}
              className={`w-full flex items-center gap-3 px-3 py-2 text-left ${appTheme.sidebarHover} ${appTheme.text} hover:bg-blue-600 hover:text-white last:rounded-b-lg text-sm`}
            >
              <IoChatbubbleEllipses size={16} />
              Message
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h2 className={`line-clamp-1 font-medium ${appTheme.text}`}>
            {userDetails?.fullName}
          </h2>
          {conversation?.lastMessageTime && (
            <span className={`text-xs ${conversation?.unreadCount > 0 ? 'text-green-500 font-medium' : appTheme.textSecondary}`}>
              {formatTime(conversation.lastMessageTime)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            {conversation?.lastMessage ? (
              <p className={`text-sm line-clamp-1 ${appTheme.textSecondary}`}>
                {conversation.lastMessage}
              </p>
            ) : (
              <p className={`text-xs ${appTheme.textSecondary}`}>
                @ {userDetails?.username}
              </p>
            )}
          </div>
        </div>
      </div>

      <UserProfileViewer
        isOpen={showProfileViewer}
        onClose={() => setShowProfileViewer(false)}
        userDetails={userDetails}
      />
    </div>
  );
};

User.propTypes = {
  userDetails: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  conversation: PropTypes.shape({
    lastMessage: PropTypes.string,
    lastMessageTime: PropTypes.string,
    unreadCount: PropTypes.number,
    hasNewMessage: PropTypes.bool,
  }),
  className: PropTypes.string,
  userClassName: PropTypes.string,
};

export default User;
