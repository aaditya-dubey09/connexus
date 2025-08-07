import { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk, updateMessageThunk } from "../../store/slice/message/message.thunk";
import { setEditingMessage } from "../../store/slice/message/message.slice";
import { useTheme } from "../../hooks/useTheme";
import EmojiPicker from 'emoji-picker-react';

const SendMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { buttonLoading, editingMessage } = useSelector((state) => state.messageReducer);
  const { chatTheme } = useTheme();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    if (editingMessage) {
      setMessage(editingMessage.message);
    } else {
      setMessage("");
    }
  }, [editingMessage]);

  const handleEmojiClick = (emojiObject) => {
    setMessage(prev => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const convertEmojiShortcuts = (text) => {
    const emojiMap = {
      ':)': '😊', ':(': '😢', ':D': '😃', ':P': '😛', ':o': '😮', ':*': '😘',
      ':|': '😐', ';)': '😉', '</3': '💔', '<3': '❤️', ':thumbsup:': '👍',
      ':thumbsdown:': '👎', ':fire:': '🔥', ':heart:': '❤️', ':laugh:': '😂',
      ':cry:': '😭', ':angry:': '😠', ':love:': '😍', ':cool:': '😎', ':party:': '🎉'
    };
    let convertedText = text;
    Object.entries(emojiMap).forEach(([shortcut, emoji]) => {
      convertedText = convertedText.replace(new RegExp(shortcut.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), emoji);
    });
    return convertedText;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
      if (editingMessage && textareaRef.current && !textareaRef.current.contains(event.target)) {
        dispatch(setEditingMessage(null));
        setMessage("");
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingMessage, dispatch]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const processedMessage = convertEmojiShortcuts(message.trim());

    if (editingMessage) {
      if (processedMessage !== editingMessage.message) {
        dispatch(updateMessageThunk({
          messageId: editingMessage._id,
          newContent: processedMessage
        }));
      }
      dispatch(setEditingMessage(null));
    } else {
      dispatch(
        sendMessageThunk({
          receiverId: selectedUser?._id,
          message: processedMessage,
        })
      );
    }
    setMessage('');
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (editingMessage) {
        dispatch(setEditingMessage(null));
        setMessage("");
      }
      if (showEmojiPicker) {
        setShowEmojiPicker(false);
      }
    }
  };

  return (
    <>
      <div className={`lex w-full gap-2 p-3 items-end bg-transparent relative`}>
        {showEmojiPicker && (
          <div ref={emojiPickerRef} className="absolute z-50 mb-2 bottom-full left-2">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme='dark'
              height={350}
              width={400}
              searchDisabled={false}
              skinTonesDisabled={false}
            />
          </div>
        )}

        {/* Input container with flex layout for better alignment */}
        <div className={`relative flex items-end w-full rounded-full shadow-md bg-black bg-opacity-20 backdrop-blur-sm ${chatTheme.text}`}>
          {/* Emoji Button on the left side */}
          <div className="relative flex items-center h-full">
            <div className="tooltip tooltip-top" data-tip="Add emoji">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                disabled={!selectedUser}
                className={`p-3 text-gray-400 transition-colors duration-200 transform rounded-full bg-transparent hover:bg-black hover:bg-opacity-20 hover:text-gray-300 disabled:opacity-50`}
              >
                <BsEmojiSmile size={20} />
              </button>
            </div>
          </div>

          <textarea
            ref={textareaRef}
            placeholder={editingMessage ? "Edit your message..." : "Type a message"}
            className={`w-full border-0 outline-none resize-none min-h-[40px] max-h-32 p-3 bg-transparent placeholder:text-gray-500 text-sm focus:outline-none overflow-y-auto caret-purple-600`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!selectedUser}
            rows={1}
            style={{
              height: 'auto',
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
            }}
          />

          {/* Send Button on the right side */}
          <div className="relative flex items-center h-full">
            <div className="tooltip tooltip-top" data-tip="Tap to send message">
              <button
                onClick={handleSendMessage}
                disabled={buttonLoading || !selectedUser || !message.trim()}
                className="text-white shadow-md btn btn-circle bg-violet-700 hover:bg-violet-800 active:bg-violet-800 disabled:opacity-50 min-w-[40px] min-h-[40px] p-2"
              >
                {buttonLoading ? (
                  <div className="loading loading-spinner loading-sm"></div>
                ) : editingMessage ? (
                  <IoCheckmark size={18} />
                ) : (
                  <IoIosSend size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendMessage;