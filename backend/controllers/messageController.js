import Message from "../models/Message.js";

// @desc Send message
// @route POST /api/messages
export const createMessage = async (req, res) => {
  try {
    const { name, email,phone, message } = req.body;

    const newMessage = await Message.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all messages (Admin)
// @route GET /api/messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};