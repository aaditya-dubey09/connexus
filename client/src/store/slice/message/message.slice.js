import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk, updateMessageThunk, deleteMessageThunk } from "./message.thunk";

const initialState = {
  buttonLoading: false,
  screenLoading: false,
  messages: null,
  hasMore: true,
  page: 1,
  editingMessage: null,
  conversations: [], // Store last message and unread count for each user
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, action.payload];

      // Update conversations with latest message
      const senderId = action.payload.senderId;
      const existingConvIndex = state.conversations.findIndex(conv => conv.userId === senderId);

      if (existingConvIndex !== -1) {
        state.conversations[existingConvIndex] = {
          ...state.conversations[existingConvIndex],
          lastMessage: action.payload.message,
          lastMessageTime: action.payload.createdAt,
          unreadCount: state.conversations[existingConvIndex].unreadCount + 1,
          hasNewMessage: true,
        };
      } else {
        state.conversations.push({
          userId: senderId,
          lastMessage: action.payload.message,
          lastMessageTime: action.payload.createdAt,
          unreadCount: 1,
          hasNewMessage: true,
        });
      }
    },

    markMessagesAsRead: (state, action) => {
      const userId = action.payload;
      const convIndex = state.conversations.findIndex(conv => conv.userId === userId);
      if (convIndex !== -1) {
        state.conversations[convIndex].unreadCount = 0;
        state.conversations[convIndex].hasNewMessage = false;
      }
    },

    setEditingMessage: (state, action) => {
      state.editingMessage = action.payload;
    },

    updateMessage: (state, action) => {
      const { messageId, newContent } = action.payload;
      if (state.messages) {
        const messageIndex = state.messages.findIndex(msg => msg._id === messageId);
        if (messageIndex !== -1) {
          state.messages[messageIndex] = {
            ...state.messages[messageIndex],
            message: newContent,
            isEdited: true,
            updatedAt: new Date().toISOString(),
          };
        }
      }
    },

    deleteMessage: (state, action) => {
      const messageId = action.payload;
      if (state.messages) {
        state.messages = state.messages.filter(msg => msg._id !== messageId);
      }
    },

    resetMessages: (state) => {
      state.messages = null;
      state.page = 1;
      state.hasMore = true;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
  },
  extraReducers: (builder) => {
    // send message
    builder.addCase(sendMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      const oldMessages = state.messages ?? [];
      const newMessage = action.payload?.responseData;
      state.messages = [...oldMessages, newMessage];

      // Update conversations with the sent message
      if (newMessage) {
        const receiverId = action.meta.arg.receiverId; // Get receiverId from the thunk arguments
        const existingConvIndex = state.conversations.findIndex(conv => conv.userId === receiverId);

        if (existingConvIndex !== -1) {
          state.conversations[existingConvIndex] = {
            ...state.conversations[existingConvIndex],
            lastMessage: newMessage.message,
            lastMessageTime: newMessage.createdAt,
          };
        } else {
          state.conversations.push({
            userId: receiverId,
            lastMessage: newMessage.message,
            lastMessageTime: newMessage.createdAt,
            unreadCount: 0,
            hasNewMessage: false,
          });
        }
      }

      state.buttonLoading = false;
    });
    builder.addCase(sendMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // get messages
    builder.addCase(getMessageThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      const newMessages = action.payload?.responseData?.messages || [];
      const page = action.payload?.page || 1;

      if (page === 1) {
        state.messages = newMessages;
      } else {
        // Prepend older messages for infinite scroll
        state.messages = [...newMessages, ...(state.messages || [])];
      }

      state.hasMore = newMessages.length === 20; // Assuming 20 messages per page
      state.screenLoading = false;
    });
    builder.addCase(getMessageThunk.rejected, (state) => {
      state.screenLoading = false;
    });

    // update message
    builder.addCase(updateMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(updateMessageThunk.fulfilled, (state, action) => {
      const updatedMessage = action.payload?.responseData;
      if (state.messages && updatedMessage) {
        const messageIndex = state.messages.findIndex(msg => msg._id === updatedMessage._id);
        if (messageIndex !== -1) {
          state.messages[messageIndex] = updatedMessage;
        }
      }
      state.buttonLoading = false;
    });
    builder.addCase(updateMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // delete message
    builder.addCase(deleteMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(deleteMessageThunk.fulfilled, (state, action) => {
      const messageId = action.meta.arg; // The messageId that was passed to the thunk
      if (state.messages) {
        state.messages = state.messages.filter(msg => msg._id !== messageId);
      }
      state.buttonLoading = false;
    });
    builder.addCase(deleteMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });
  },
});

export const {
  setNewMessage,
  markMessagesAsRead,
  setEditingMessage,
  updateMessage,
  deleteMessage,
  resetMessages,
  setPage,
  setHasMore
} = messageSlice.actions;

export default messageSlice.reducer;
