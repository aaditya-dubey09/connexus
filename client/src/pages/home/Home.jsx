import { useEffect } from "react";
import UserSidebar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeSocket,
  setOnlineUsers,
} from "../../store/slice/socket/socket.slice";
import { setNewMessage, updateMessage, deleteMessage } from "../../store/slice/message/message.slice";
import { useParams } from "react-router-dom";
import { setSelectedUser } from "../../store/slice/user/user.slice";
import { playNotificationSound, createMessageNotification } from "../../components/utils/notifications";

const Home = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const { isAuthenticated, userProfile, otherUsers, selectedUser } = useSelector(
    (state) => state.userReducer
  );
  const { socket } = useSelector((state) => state.socketReducer);

  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(initializeSocket(userProfile?._id));
  }, [isAuthenticated, dispatch, userProfile?._id]);

  useEffect(() => {
    if (!socket) return;

    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessage(newMessage));

      // Handle notifications and sounds
      const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';
      const soundsEnabled = localStorage.getItem('soundsEnabled') !== 'false';

      // Only show notification if the message is not from current user
      if (newMessage.senderId !== userProfile?._id) {
        const sender = otherUsers?.find(user => user._id === newMessage.senderId);

        if (soundsEnabled) {
          playNotificationSound();
        }

        if (notificationsEnabled && sender && document.hidden) {
          createMessageNotification(newMessage.message, sender);
        }
      }
    });

    socket.on("messageUpdated", (updatedMessage) => {
      dispatch(updateMessage({
        messageId: updatedMessage._id,
        newContent: updatedMessage.message
      }));
    });

    socket.on("messageDeleted", (messageId) => {
      dispatch(deleteMessage(messageId));
    });

    return () => {
      socket.off("onlineUsers");
      socket.off("newMessage");
      socket.off("messageUpdated");
      socket.off("messageDeleted");
    };
  }, [socket, dispatch, userProfile?._id, otherUsers]);

  // Handle user selection from URL params
  useEffect(() => {
    if (username && otherUsers) {
      const selectedUserFromUrl = otherUsers.find(user => user.username === username);
      if (selectedUserFromUrl) {
        dispatch(setSelectedUser(selectedUserFromUrl));
      }
    }
  }, [username, otherUsers, dispatch]);

  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      {/* Sidebar - hidden on mobile when user is selected */}
      <div className={`${selectedUser ? 'hidden md:block' : 'block w-full md:w-auto'} md:block md:w-auto`}>
        <UserSidebar />
      </div>

      {/* Main content area - full width on mobile when user selected */}
      <div className={`flex-1 min-w-0 ${!selectedUser ? 'hidden md:block' : 'block'}`}>
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
