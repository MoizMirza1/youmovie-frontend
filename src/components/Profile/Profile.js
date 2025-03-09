import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaEnvelope, FaPhoneAlt, FaLocationArrow, FaCamera, FaSignOutAlt, FaTimes, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Footer from '../Home/Footer.jsx';
import ResponsiveNavbar from '../../components/Home/ResponsiveNavbar.jsx'
import { Link } from "react-router-dom";


const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user?.profilePic || "");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  
  const ADMIN_ID = "67adf008270270e7047749df"; // Ensure this is the correct admin ID

  useEffect(() => {
    if (user?.profilePic) setPreview(user.profilePic);
  }, [user]);

  useEffect(() => {
    if (!chatOpen || !user?._id) return;
    
    const socket = io("https://youmovie-production.up.railway.app");
    socket.emit("joinChat", user._id);
    
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`https://youmovie-production.up.railway.app/api/auth/chat/messages/${user._id}`);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    fetchMessages();
  
    return () => {
      socket.disconnect();
      socket.off("receiveMessage");
    };
  }, [chatOpen, user]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user?._id) return;

    const messageData = { senderId: user._id, receiverId: ADMIN_ID, text: newMessage };
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");

    try {
      const token = localStorage.getItem("userToken");
      await axios.post("https://youmovie-production.up.railway.app/api/auth/chat/send", messageData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));

    const token = localStorage.getItem("userToken");
    if (!token) return alert("You need to log in first!");

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const response = await axios.post("https://youmovie-production.up.railway.app/api/auth/uploadProfilePic", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setUser((prev) => ({ ...prev, profilePic: response.data.profilePic }));
    } catch (error) {
      if (error.response?.data.error === "jwt expired") {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("userToken");
        navigate("/login");
      } else console.error("Upload error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.post("https://youmovie-production.up.railway.app/api/auth/logout", {}, { headers: { Authorization: `Bearer ${token}` } });

      localStorage.removeItem("userToken");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.response?.data?.message || error.message);
    }
  };
   const goToWatchList = () =>{
    navigate("/watchlist");
   }

  return (
    <>
   <ResponsiveNavbar/>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex justify-center items-center relative">
        <div className="p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-full min-h-[90vh]">
          {/* Profile Picture Section */}
          <div className="col-span-1 flex flex-col items-center text-center p-6 bg-gradient-to-t from-gray-800 via-black to-gray-900 rounded-lg shadow-2xl hover:shadow-rose-500/20 transition-shadow duration-300">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-rose-600 relative group">
              {preview ? (
                <img src={preview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex justify-center items-center bg-gray-700">
                  <FaCamera className="text-white text-4xl" />
                </div>
              )}

              <label htmlFor="file-input" className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 hover:bg-opacity-70 cursor-pointer transition-all">
                <FaCamera className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </label>

              <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>

            <h1 className="text-3xl font-semibold mb-2 text-white">{user?.name}</h1>
            <h2 className="font-semibold bg-gradient-to-r from-rose-500 to-rose-700 text-white rounded-full px-6 py-1 mb-6">
              {user?.subscription || "Free Subscription"}
            </h2>

            <button className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg transition w-full">Edit Profile</button>
            

  <button onClick={goToWatchList} className="bg-white text-black px-6 py-3 rounded-lg transition w-full mt-5">
    WatchList
  </button>

            <button onClick={handleLogout} className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg mt-6 transition w-full flex justify-center items-center">
              Logout <FaSignOutAlt className="ml-2" />
            </button>
          </div>

          {/* Profile Details */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3 bg-gradient-to-b from-gray-800 via-black to-gray-900 p-8 rounded-lg shadow-2xl flex flex-col space-y-6 text-white">
            <h3 className="text-2xl font-semibold text-gray-100 mb-3">About Me</h3>
            <p className="text-gray-300">Welcome to your cinematic journey! Explore your favorite movies and shows.</p>

            <h3 className="text-2xl font-semibold text-gray-100 mb-3">Role</h3>
            <div className="bg-rose-600 text-white py-1 px-6 rounded-full inline-block font-semibold">{user?.role}</div>

            <h2 className="font-semibold text-2xl text-gray-100 mb-3">Contact Information</h2>
            <p className="flex items-center space-x-4 text-gray-300"><FaEnvelope /> {user?.email}</p>
            <p className="flex items-center space-x-4 text-gray-300"><FaPhoneAlt /> +92 0123456789</p>
            <p className="flex items-center space-x-4 text-gray-300"><FaLocationArrow /> Karachi, Pakistan</p>

            <button onClick={() => setChatOpen(true)} className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg transition w-full">
              Contact Us
            </button>
          </div>
        </div>

        {/* Chat UI */}
        {chatOpen && (
          <div className="fixed bottom-4 right-4 w-80 bg-gray-800 text-white rounded-lg shadow-2xl border border-gray-700">
            <div className="p-3 border-b border-gray-700 flex justify-between items-center">
              <span className="font-semibold">Chat with Admin</span>
              <FaTimes className="cursor-pointer hover:text-rose-500" onClick={() => setChatOpen(false)} />
            </div>
            <div className="p-3 h-60 overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`mb-2 ${msg.senderId === user._id ? "text-right" : "text-left"}`}>
                  <p className={`inline-block px-3 py-2 rounded-lg ${msg.senderId === user._id ? "bg-rose-600" : "bg-gray-700"}`}>
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-700 flex">
              <input
                className="flex-grow bg-gray-700 text-white p-2 rounded-l focus:outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage} className="bg-rose-600 hover:bg-rose-700 px-4 rounded-r">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;