import express from "express";
import { isAuthenticated } from "../middlewares/auth.middlware.js";
import { getMessages, sendMessage, updateMessage, deleteMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:receiverId", isAuthenticated, sendMessage);
router.get("/get-messages/:otherParticipantId", isAuthenticated, getMessages);
router.put("/update/:messageId", isAuthenticated, updateMessage);
router.delete("/delete/:messageId", isAuthenticated, deleteMessage);

export default router;
