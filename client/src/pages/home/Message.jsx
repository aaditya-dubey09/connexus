import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoTrash, IoPencil } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import calendar from 'dayjs/plugin/calendar';
import { deleteMessageThunk } from "../../store/slice/message/message.thunk";
import { setEditingMessage } from "../../store/slice/message/message.slice";
import { useTheme } from "../../hooks/useTheme";
dayjs.extend(calendar);

const Message = ({ messageDetails }) => {
  const messageRef = useRef(null);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { chatTheme } = useTheme();

  const { userProfile, selectedUser } = useSelector(
    (state) => state.userReducer
  );

  const isOwner = userProfile?._id === messageDetails?.senderId;

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Function to format the timestamp for display in bubble
  const formatBubbleTime = (timestamp) => {
    return dayjs(timestamp).format('h:mm A');
  };

  // Function to check if date separator should be shown
  const shouldShowDateSeparator = (currentMessage, previousMessage) => {
    if (!previousMessage) return true;

    const currentDate = dayjs(currentMessage.createdAt).format('YYYY-MM-DD');
    const previousDate = dayjs(previousMessage.createdAt).format('YYYY-MM-DD');

    return currentDate !== previousDate;
  };

  // Function to format date separator
  const formatDateSeparator = (timestamp) => {
    const messageDate = dayjs(timestamp);
    const today = dayjs();
    const yesterday = today.subtract(1, 'day');

    if (messageDate.isSame(today, 'day')) {
      return 'Today';
    } else if (messageDate.isSame(yesterday, 'day')) {
      return 'Yesterday';
    } else {
      return messageDate.format('MMMM D, YYYY');
    }
  };

  const handleEdit = () => {
    dispatch(setEditingMessage(messageDetails));
    setShowMenu(false);
  };

  const handleDelete = () => {
    dispatch(deleteMessageThunk(messageDetails._id));
    setShowMenu(false);
  };

  return (
    <>
      <div
        ref={messageRef}
        className={`chat chat-bubble-animate ${userProfile?._id === messageDetails?.senderId
          ? "chat-end"
          : "chat-start"
          }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Chat avatar"
              src={
                userProfile?._id === messageDetails?.senderId
                  ? userProfile?.avatar
                  : selectedUser?.avatar
              }
            />
          </div>
        </div>

        <div className="relative group">
          <div
            className={`${chatTheme.text} ${userProfile?._id === messageDetails?.senderId
              ? chatTheme.sentBubble
              : chatTheme.receivedBubble
              } chat-bubble relative max-w-xs md:max-w-sm lg:max-w-md px-3 py-2 rounded-2xl shadow-sm`}
          >
            <div className="pr-12">
              <span className="leading-relaxed">{messageDetails?.message}</span>
              {messageDetails?.isEdited && (
                <span className="ml-2 text-xs opacity-70">(edited)</span>
              )}
            </div>

            {/* Time at bottom right corner like WhatsApp */}
            <div className={`absolute bottom-1 right-2 text-[10px] opacity-70 flex items-center gap-1`}>
              {messageDetails?.createdAt ? formatBubbleTime(messageDetails?.createdAt) : ''}
              {userProfile?._id === messageDetails?.senderId && (
                <span className="text-blue-400">✓✓</span>
              )}
            </div>
          </div>

          {/* Message options menu - only show for own messages */}
          {isOwner && (
            <div className="absolute top-0 right-0 transition-opacity opacity-0 group group-hover:opacity-100">
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1 text-white transition-colors duration-200 bg-transparent rounded-full"
                >
                  <IoIosArrowDown size={12} />
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-1 bg-gray-900 rounded-lg shadow-lg z-10 min-w-[100px]">
                    <button
                      onClick={handleEdit}
                      className="flex items-center w-full gap-2 px-3 py-1 pt-2 text-sm text-left text-white rounded-t-lg hover:bg-gray-700"
                    >
                      <IoPencil size={12} />
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center w-full gap-2 px-3 py-1 pb-2 text-sm text-left text-red-500 rounded-b-lg hover:bg-red-700/10"
                    >
                      <IoTrash size={12} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Message.propTypes = {
  messageDetails: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    senderId: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    isEdited: PropTypes.bool,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date)
    ]).isRequired,
    updatedAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date)
    ]),
  }).isRequired,
};

export default Message;
