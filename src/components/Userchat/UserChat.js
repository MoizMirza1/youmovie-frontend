// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import axios from "axios";



// const userId = localStorage.getItem("userId");
// const socket = io("http://localhost:5000", { query: { userId } });

// const ChatUI = ({ userId }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     socket.emit("joinChat", userId);

//     // Load chat history
//     axios.get(`http://localhost:5000/api/chat/history/${userId}`).then(({ data }) => {
//       setMessages(data);
//     });

//     socket.on("receiveMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     socket.on("userTyping", ({ senderId }) => {
//       setIsTyping(senderId !== userId);
//       setTimeout(() => setIsTyping(false), 2000); // Reset after 2 seconds
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("userTyping");
//     };
//   }, [userId]);

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     const messageData = {
//       senderId: userId,
//       receiverId: "admin", // Dynamic selection needed
//       text: newMessage,
//       timestamp: new Date(),
//     };

//     socket.emit("sendMessage", messageData);
//     setMessages((prev) => [...prev, messageData]);
//     setNewMessage("");

//     await axios.post("http://localhost:5000/api/chat/send", messageData);
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="p-4 bg-gray-800 text-white font-bold text-center">Live Chat with Admin</div>
//       <div className="h-60 overflow-y-auto p-4">
//         {messages.map((msg, index) => (
//           <div key={index} className={`p-2 my-1 rounded-md ${msg.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
//             <span className="block text-sm">{msg.text}</span>
//             <span className="text-xs text-gray-600">{new Date(msg.timestamp).toLocaleTimeString()}</span>
//           </div>
//         ))}
//         {isTyping && <div className="text-gray-500 text-sm">Admin is typing...</div>}
//       </div>
//       <div className="p-4 border-t flex">
//         <input
//           type="text"
//           className="flex-1 p-2 border rounded-md"
//           placeholder="Type a message..."
//           value={newMessage}
//           onChange={(e) => {
//             setNewMessage(e.target.value);
//             socket.emit("typing", { senderId: userId, receiverId: "admin" });
//           }}
//         />
//         <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md" onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatUI;