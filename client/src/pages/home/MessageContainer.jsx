import { useEffect, useRef, useCallback, useState } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import { resetMessages, setPage } from "../../store/slice/message/message.slice";
import { setSelectedUser } from "../../store/slice/user/user.slice";
import SendMessage from "./SendMessage";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../../hooks/useTheme";
import UserProfileViewer from "../../components/UserProfileViewer";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const { chatTheme, wallpaper, appTheme } = useTheme();
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);

  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages, hasMore, page, screenLoading } = useSelector((state) => state.messageReducer);

  const handleUserProfileClick = () => {
    setViewingUser(selectedUser);
    setShowUserProfile(true);
  };

  // Infinite scroll handler
  const handleScroll = useCallback((e) => {
    const { scrollTop } = e.target;
    if (scrollTop === 0 && hasMore && !screenLoading) {
      dispatch(setPage(page + 1));
      dispatch(getMessageThunk({
        receiverId: selectedUser?._id,
        page: page + 1
      }));
    }
  }, [dispatch, hasMore, screenLoading, page, selectedUser?._id]);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(resetMessages());
      dispatch(getMessageThunk({ receiverId: selectedUser?._id, page: 1 }));
    }
  }, [dispatch, selectedUser]);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  function handleClickBack() {
    dispatch(setSelectedUser(null));
    navigate("/");
  }

  // Listen for browser back/gesture (popstate) to deselect user and navigate to home
  useEffect(() => {
    const handlePopState = () => {
      if (selectedUser) {
        dispatch(setSelectedUser(null));
        navigate("/");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedUser, dispatch, navigate]);

  return (
    <>
      {!selectedUser ? (
        <div className={`flex flex-col message-container items-center justify-center w-full gap-5 h-screen ${chatTheme.background} ${wallpaper.background}`}>
          <h2 className={`text-2xl text-white ${chatTheme.text} font-bold`}>Welcome to Connexus</h2>
          <p className={`text-xl text-gray-300 ${chatTheme.text}`}>Please select a person to continue your chat!!</p>
        </div>
      ) : (
        <div className={`flex flex-col w-full h-screen ${appTheme.sidebar}`}>
          <div className={`flex items-center gap-3 p-3 border-b border-b-white/10 ${appTheme.background === 'default' || appTheme.background === 'dark' ? 'bg-black' : appTheme.background} hover:shadow-md hover:shadow-gray-900`}>
            <button
              type="button"
              className="p-2 transition-colors rounded-full md:hidden hover:bg-gray-950"
              onClick={handleClickBack}
            >
              <IoArrowBack size={20} className={`${chatTheme.text} hover:text-purple-400`} />
            </button>
            <div
              onClick={handleUserProfileClick}
              className="p-2 rounded-lg cursor-pointer"
            >
              <div className="tooltip tooltip-bottom" data-tip="View Profile">
                <User
                  userDetails={selectedUser}
                  className={`flex group gap-5 items-center text-start`}
                />
              </div>
            </div>
          </div>

          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className={`relative h-full p-3 overflow-y-auto scroll-smooth messages-container ${wallpaper?.background} ${chatTheme.background}`}
          >
            {screenLoading && page > 1 && (
              <div className="flex justify-center py-2">
                <div className="loading loading-spinner loading-sm"></div>
              </div>
            )}

            {messages?.map((messageDetails, index) => {
              const previousMessage = index > 0 ? messages[index - 1] : null;
              const shouldShowDate = !previousMessage ||
                new Date(messageDetails.createdAt).toDateString() !== new Date(previousMessage.createdAt).toDateString();

              return (
                <div key={messageDetails?._id}>
                  {shouldShowDate && (
                    <div className="flex justify-center my-4">
                      <div className="px-3 py-1 text-xs text-gray-400 bg-black rounded-full bg-opacity-20">
                        {new Date(messageDetails.createdAt).toDateString() === new Date().toDateString()
                          ? 'Today'
                          : new Date(messageDetails.createdAt).toDateString() === new Date(Date.now() - 86400000).toDateString()
                            ? 'Yesterday'
                            : new Date(messageDetails.createdAt).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })
                        }
                      </div>
                    </div>
                  )}
                  <Message
                    messageDetails={messageDetails}
                  />
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <SendMessage />
        </div>
      )}

      <UserProfileViewer
        isOpen={showUserProfile}
        onClose={() => setShowUserProfile(false)}
        userDetails={viewingUser}
      />
    </>
  );
};

export default MessageContainer;
