import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("https://youmovie-production.up.railway.app", {
  query: { userId: "67adf008270270e7047749df" }, // Admin's ID
  reconnectionAttempts: 5, // Attempt reconnecting 5 times
  reconnectionDelay: 1000, // 1-second delay before retrying
});

const AdminChat = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  
  useEffect(() => {
    // Check if the socket is connected
    if (!socket.connected) {
      console.warn("Socket is not connected! Retrying...");
    }

    socket.on("connect", () => {
      console.log("✅ Admin connected to socket server.");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    socket.on("receiveMessage", (message) => {
      console.log("📩 Admin received message:", message);
      setMessages((prev) => [...prev, message]);
    });

    // Fetch previous chat messages
    const fetchMessages = async () => {
      try {
        console.log("📡 Fetching previous messages for:", userId);
        const { data } = await axios.get(`https://youmovie-production.up.railway.app/api/auth/chat/messages/${userId}`);
        console.log("✅ Fetched messages:", data);
        setMessages(data);
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
      }
    };

    fetchMessages();

    return () => {
      console.log("🚪 Admin chat component unmounted. Cleaning up socket listeners...");
      socket.off("receiveMessage");
    };
  }, [userId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      console.warn("⚠️ Cannot send an empty message.");
      return;
    }

    const messageData = {
      senderId: "67adf008270270e7047749df", // Admin's ID
      receiverId: userId, // Dynamic User ID
      text: newMessage,
      timestamp: new Date(),
    };

    console.log("🚀 Sending message:", messageData);

    if (!socket.connected) {
      console.error("❌ Socket is disconnected! Cannot send message.");
      return;
    }

    // Emit message to the server
    socket.emit("sendMessage", messageData, (response) => {
      console.log("📨 Server acknowledgment:", response);
    });

    // Add the message to local state
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");

    // Uncomment if saving messages to DB
    /*
    try {
      const res = await axios.post("http://localhost:5000/api/auth/chat/send", messageData);
      console.log("✅ Message saved to DB:", res.data);
    } catch (error) {
      console.error("❌ Error saving message:", error);
    }
    */
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Admin Chat</h2>
      <div className="h-60 overflow-y-auto border p-4">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded-md ${
                msg.senderId === "67adf008270270e7047749df"
                  ? "bg-gray-300 text-black"
                  : "bg-blue-500 text-white"
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AdminChat;
