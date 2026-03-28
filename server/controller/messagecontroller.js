import Conversation from "../model/conversationmodel.js";
import Message from "../model/messagemodel.js";
import User from "../model/usermodel.js";
export async function createconversation(req, res) {
  try {
    const senderId = req.userid;
    const { recieverId } = req.body;

    if (!recieverId) {
      return res.status(400).json({ message: "Receiver ID is required" });
    }

    if (senderId.toString() === recieverId) {
      return res.status(400).json({ message: "You cannot chat with yourself" });
    }

    let conversation = await Conversation.findOne({
      isGroup: false,
      members: { $all: [senderId, recieverId], $size: 2 },
    });

    if (conversation) {
      return res.status(200).json(conversation);
    }

    conversation = await Conversation.create({
      isGroup: false,
      members: [senderId, recieverId],
    });

    return res.status(200).json(conversation);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mess: "conversstoin error" });
  }
}

export async function createmessage(req, res) {
  try {
    const senderId = req.userid;

    const { conversationId, text } = req.body;

    if (!conversationId || !text.trim()) {
      return res
        .status(400)
        .json({ mes: "conversation and text are required. " });
    }

    const message = await Message.create({
      conversationId,
      senderId,
      text,
    });

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ mess: "create message error" });
  }
}

export async function getconversationmessage(req, res) {
  try {
   

    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res
        .status(400)
        .json({ mess: "conversation is not created btw users" });
    }

    if (!conversation.members.includes(req.userid)) {
      return res.status(400).json({ mess: "you are not in this chat" });
    }

    const messages = await Message.find({ conversationId })
     
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ mess: "get message error" });
  }
}
