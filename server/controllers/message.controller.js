import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import { getSocketId, io } from '../socket/socket.js'

export const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;
  const message = req.body.message;

  if (!senderId || !receiverId || !message) {
    return next(new errorHandler("All fields are required", 400));
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }

  // socket.io
  const socketId = getSocketId(receiverId)
  io.to(socketId).emit("newMessage", newMessage);

  res.status(200).json({
    success: true,
    responseData: newMessage,
  });
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const myId = req.user._id;
  const otherParticipantId = req.params.otherParticipantId;

  if (!myId || !otherParticipantId) {
    return next(new errorHandler("All fields are required", 400));
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [myId, otherParticipantId] },
  }).populate("messages");

  res.status(200).json({
    success: true,
    responseData: conversation,
  });
});

export const updateMessage = asyncHandler(async (req, res, next) => {
  const messageId = req.params.messageId;
  const { message } = req.body;
  const userId = req.user._id;

  if (!messageId || !message) {
    return next(new errorHandler("Message ID and new content are required", 400));
  }

  const existingMessage = await Message.findById(messageId);

  if (!existingMessage) {
    return next(new errorHandler("Message not found", 404));
  }

  // Check if the user is the sender
  if (existingMessage.senderId.toString() !== userId.toString()) {
    return next(new errorHandler("You can only edit your own messages", 403));
  }

  const updatedMessage = await Message.findByIdAndUpdate(
    messageId,
    {
      message,
      updatedAt: new Date(),
      isEdited: true
    },
    { new: true }
  );

  // Emit socket event to both sender and receiver
  const senderSocketId = getSocketId(existingMessage.senderId);
  const receiverSocketId = getSocketId(existingMessage.receiverId);

  if (senderSocketId) {
    io.to(senderSocketId).emit("messageUpdated", updatedMessage);
  }
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("messageUpdated", updatedMessage);
  }

  res.status(200).json({
    success: true,
    responseData: updatedMessage,
  });
});

export const deleteMessage = asyncHandler(async (req, res, next) => {
  const messageId = req.params.messageId;
  const userId = req.user._id;

  if (!messageId) {
    return next(new errorHandler("Message ID is required", 400));
  }

  const existingMessage = await Message.findById(messageId);

  if (!existingMessage) {
    return next(new errorHandler("Message not found", 404));
  }

  // Check if the user is the sender
  if (existingMessage.senderId.toString() !== userId.toString()) {
    return next(new errorHandler("You can only delete your own messages", 403));
  }

  await Message.findByIdAndDelete(messageId);

  // Remove message from conversation
  await Conversation.updateOne(
    { messages: messageId },
    { $pull: { messages: messageId } }
  );

  // Emit socket event to both sender and receiver
  const senderSocketId = getSocketId(existingMessage.senderId);
  const receiverSocketId = getSocketId(existingMessage.receiverId);

  if (senderSocketId) {
    io.to(senderSocketId).emit("messageDeleted", messageId);
  }
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("messageDeleted", messageId);
  }

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});
