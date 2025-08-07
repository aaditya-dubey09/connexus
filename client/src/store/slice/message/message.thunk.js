import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../components/utils/axiosInstance";

export const sendMessageThunk = createAsyncThunk(
  "message/send",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/message/send/${receiverId}`, {
        message
      });
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getMessageThunk = createAsyncThunk(
  "message/get",
  async ({ receiverId, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/message/get-messages/${receiverId}?page=${page}`);
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const updateMessageThunk = createAsyncThunk(
  "message/update",
  async ({ messageId, newContent }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/message/update/${messageId}`, {
        message: newContent
      });
      toast.success("Message updated successfully");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const deleteMessageThunk = createAsyncThunk(
  "message/delete",
  async (messageId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/message/delete/${messageId}`);
      toast.success("Message deleted successfully");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
