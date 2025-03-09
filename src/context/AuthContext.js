import { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [serverDown, setServerDown] = useState(false); 
  const socketRef = useRef(null); // 🔹 Use ref instead of state for socket

  useEffect(() => {
    const checkUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("https://youmovie-production.up.railway.app/api/auth/home", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setUser(data.user);
        setServerDown(false);

        // 🔹 Ensure socket only connects once
        if (!socketRef.current) {
          socketRef.current = io("https://youmovie-production.up.railway.app", {
            query: { userId: data.user._id },
          });

          // 🔹 Log when socket connects
          socketRef.current.on("connect", () => {
            console.log("🟢 Connected to Socket.io:", socketRef.current.id);
          });

          // 🔹 Handle incoming messages
          socketRef.current.on("receiveMessage", (msg) => {
            console.log("📩 New Message:", msg);
          });
        }
      } catch (error) {
        if(error.response){
          setUser(null);
        }else{
          console.error("🚨 Backend Down:", error);
          setServerDown(true); // 🔹 Mark backend as down
        }
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [token]);

  const login = (token) => {
    localStorage.setItem("userToken", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setToken(null);
    setUser(null);
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout,serverDown, socket: socketRef.current }}>
      {children}
    </AuthContext.Provider>
  );
};
