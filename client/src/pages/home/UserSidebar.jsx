import { useEffect, useState, useRef, useCallback } from "react";
import { IoSearch, IoEllipsisVertical, IoSettings, IoPersonCircle, IoInformationCircle, IoLogOutOutline } from "react-icons/io5";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  logoutUserThunk,
} from "../../store/slice/user/user.thunk";
import { useTheme } from "../../hooks/useTheme";
import Settings from "../../components/Settings";
import UserProfile from "../../components/UserProfile";
import About from "../../components/About";

const UserSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const { otherUsers, userProfile } = useSelector((state) => state.userReducer);
  const { conversations } = useSelector((state) => state.messageReducer);
  const { onlineUsers } = useSelector((state) => state.socketReducer);
  const { appTheme } = useTheme();
  const scrollRef = useRef(null);
  const dropdownRef = useRef(null);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  };

  // Enhanced filtering with conversation data
  const filterUsers = useCallback((userList, filter, search) => {
    let filtered = userList;

    // Apply search filter
    if (search) {
      filtered = filtered.filter((user) => {
        return (
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.fullName.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    // Apply status filter
    if (filter === "unread") {
      filtered = filtered.filter((user) => {
        const conversation = conversations.find(conv => conv.userId === user._id);
        return conversation && conversation.unreadCount > 0;
      });
    } else if (filter === "online") {
      filtered = filtered.filter((user) => {
        return onlineUsers && onlineUsers.includes(user._id);
      });
    }

    // Sort by last message time (most recent first) - create a copy first
    const sortedFiltered = [...filtered].sort((a, b) => {
      const aConv = conversations.find(conv => conv.userId === a._id);
      const bConv = conversations.find(conv => conv.userId === b._id);

      const aTime = aConv ? new Date(aConv.lastMessageTime) : new Date(0);
      const bTime = bConv ? new Date(bConv.lastMessageTime) : new Date(0);

      return bTime - aTime;
    });

    return sortedFiltered;
  }, [conversations, onlineUsers]);

  useEffect(() => {
    const filteredUsers = filterUsers(otherUsers || [], activeFilter, searchValue);
    setUsers(filteredUsers);
  }, [searchValue, otherUsers, activeFilter, filterUsers]);

  useEffect(() => {
    (async () => {
      await dispatch(getOtherUsersThunk());
    })();
  }, [dispatch]);

  const filterTabs = [
    { id: "all", label: "All", count: otherUsers?.length || 0 },
    {
      id: "unread",
      label: "Unread",
      count: conversations.filter(conv => conv.unreadCount > 0).length
    },
    {
      id: "online",
      label: "Online",
      count: otherUsers?.filter(user => onlineUsers?.includes(user._id)).length || 0
    },
  ];

  const getUserConversation = (userId) => {
    return conversations.find(conv => conv.userId === userId);
  };

  const avatarType = userProfile?.gender === "male" ? "boy" : "girl";
  const defaultAvatars = `https://avatar.iran.liara.run/public/${avatarType}?username=${userProfile?.username}`;

  const getDefaultAvatar = (userId) => {
    const index = userId ? userId.charCodeAt(userId.length - 1) % defaultAvatars.length : 0;
    return defaultAvatars[index];
  };

  return (
    <>
      <div className={`
        w-full md:w-96 lg:w-96 sidebar h-screen flex flex-col ${appTheme.sidebar} 
        md:border-r ${appTheme.border} md:min-w-[20rem]
        hover:shadow-md hover:shadow-gray-700
      `}>
        <div className="flex items-center justify-between mx-3 mt-3">
          <h1 className="rounded-lg px-2 py-1 text-[#7480FF] text-xl font-semibold">
            Connexus
          </h1>
          <div className="relative" ref={dropdownRef}>
            <div className="tooltip tooltip-bottom" data-tip="Open Menu">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
                className={`p-2 rounded-full ${appTheme.sidebarHover === 'default' ? 'bg-gray-900' : appTheme.sidebarHover} ${appTheme.text} touch-manipulation`}
              >
              <IoEllipsisVertical size={20} />
            </button>
              </div>

            {showDropdown && (
              <div className={`absolute right-0 top-12 w-48 ${appTheme.background} ${appTheme.border} border rounded-lg shadow-lg z-10 touch-manipulation hover:shadow-xl`}>
                <button
                  onClick={() => {
                    setShowProfile(true);
                    setShowDropdown(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left ${appTheme.sidebarHover} ${appTheme.text} hover:bg-blue-600 hover:text-white first:rounded-t-lg`}
                >
                  <IoPersonCircle size={20} />
                  Profile
                </button>
                <button
                  onClick={() => {
                    setShowSettings(true);
                    setShowDropdown(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left ${appTheme.sidebarHover} ${appTheme.text} hover:bg-blue-600 hover:text-white`}
                >
                  <IoSettings size={20} />
                  Settings
                </button>
                <button
                  onClick={() => {
                    setShowAbout(true);
                    setShowDropdown(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left ${appTheme.sidebarHover} ${appTheme.text} hover:bg-blue-600 hover:text-white`}
                >
                  <IoInformationCircle size={20} />
                  About
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowDropdown(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left ${appTheme.text} hover:bg-red-600 hover:text-white last:rounded-b-lg`}
                >
                  <IoLogOutOutline size={20} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-3 md:p-3">
          <label className={`flex items-center gap-2 rounded-full shadow-md input h-12 md:h-auto focus-within:outline focus-within:outline-violet-700 outline-none border-0 py-1 hover:border hover:border-gray-900 ${appTheme.input}`}>
            <div className="tooltip tooltip-bottom" data-tip="Search">
            <IoSearch className={`${appTheme.textSecondary} text-lg md:text-base`} />
            </div>
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              className={`border-0 outline-none grow focus:outline-none ring-0 focus:border-0 bg-transparent ${appTheme.text} text-base md:text-sm caret-purple-700 caret-2`}
              placeholder="Search your friends"
            />
          </label>
        </div>

        {/* Filter Tabs */}
        <div className="px-3 mb-2">
          <div className="flex gap-1 pb-1 overflow-x-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors whitespace-nowrap touch-manipulation md:px-3 md:py-1 md:text-xs xs:px-2 xs:py-1 ${activeFilter === tab.id
                  ? 'bg-blue-600 text-white'
                  : `${appTheme.sidebarHover} ${appTheme.textSecondary}`
                  }`}
              >
                {tab.label} {tab.count > 0 && `(${tab.count})`}
              </button>
            ))}
          </div>
        </div>

        <div ref={scrollRef} className="flex flex-col h-full px-3 overflow-y-auto">
          {users?.map((userDetails) => {
            const conversation = getUserConversation(userDetails._id);
            return (
              <div key={userDetails?._id} className="relative">
                <User
                  userDetails={userDetails}
                  conversation={conversation}
                  className={`flex group gap-3 items-center ${appTheme.sidebarHover} rounded-lg py-4 px-3 cursor-pointer touch-manipulation min-h-[60px] md:py-3 md:px-2 md:min-h-0`}
                  userClassName={`ring-primary ring-offset-base-100 group-hover:ring ring-offset-2`}
                />
                {conversation && conversation.unreadCount > 0 && (
                  <div className="absolute flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full text-xs text-black bg-green-600 bottom-3 right-3">
                    {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={`flex items-center justify-between p-3 border-t ${appTheme.border}`}>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                <img
                  src={userProfile?.avatar || getDefaultAvatar(userProfile?._id)}
                  alt={`${userProfile?.username} avatar`}
                  onError={(e) => {
                    e.target.src = getDefaultAvatar(userProfile?._id);
                  }}
                />
              </div>
            </div>
            <h2 className={appTheme.text}>{userProfile?.username}</h2>
          </div>
        </div>
      </div>

      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />
      <About isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

export default UserSidebar;
