const { Server } = require("socket.io");
const Message = require("./models/Chat");

const users = new Map(); // Active users (userId -> socketId)

function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", async (socket) => {
    try {
      const userId = socket.handshake.query.userId;
      if (!userId) {
        console.warn("❌ User ID missing in handshake!");
        socket.disconnect();
        return;
      }

      console.log(`✅ User Connected: ${userId} (Socket ID: ${socket.id})`);
      socket.join(userId);
      users.set(userId, socket.id);

      io.emit("updateUserStatus", { userId, status: "online" });

      // Send unread messages
      const unreadMessages = await Message.find({ receiverId: userId, isRead: false });
      if (unreadMessages.length > 0) {
        socket.emit("receiveMessages", unreadMessages.map((msg) => msg.toObject()));
        await Message.updateMany({ receiverId: userId, isRead: false }, { isRead: true });
      }

      socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
        if (!senderId || !receiverId || !text.trim()) return;

        console.log(`📩 Message from ${senderId} to ${receiverId}: ${text}`);

        const message = new Message({ senderId, receiverId, text, timestamp: new Date() });
        await message.save();

        io.to(receiverId).emit("receiveMessage", message.toObject());
        console.log(`✅ Delivered to ${receiverId}`);
      });

      socket.on("disconnect", () => {
        console.log(`🚪 User ${userId} disconnected.`);
        users.delete(userId);

        setTimeout(() => {
          if (!users.has(userId)) {
            io.emit("updateUserStatus", { userId, status: "offline" });
          }
        }, 3000);
      });

    } catch (error) {
      console.error("🔥 Socket Error:", error);
    }
  });
}

module.exports = { setupSocket };
