import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Film, Users, DollarSign, MessageSquare, LogOut, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AdminChat from "./AdminChat";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState("movies");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://youmovie-production.up.railway.app/api/auth/users")
      .then((res) => {
        console.log("Users Data:", res.data);
        setUsers(res.data);
      })
      .catch((err) => console.error("Error fetching users:", err));

    axios
      .get("https://youmovie-production.up.railway.app/api/auth/active-users")
      .then((res) => {
        console.log("Active Users Data:", res.data);
        setActiveUsers(res.data);
      })
      .catch((err) => console.error("Error fetching active users:", err));
  }, []);

  const handleBanUser = (id) => setUsers(users.filter((user) => user._id !== id));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-4 flex flex-col justify-between h-full">
        <div>
          {/* Home Redirect Link */}
          <Link to="/" className="flex items-center gap-2 mb-4 hover:text-gray-300 ">
            <Home size={20} /> Home
          </Link>
          <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
          <button
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 w-full text-left"
            onClick={() => setSelectedTab("movies")}
          >
            <Film size={20} /> Movies
          </button>
          <button
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 w-full text-left"
            onClick={() => setSelectedTab("users")}
          >
            <Users size={20} /> Users
          </button>
          <button
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 w-full text-left"
            onClick={() => setSelectedTab("subscriptions")}
          >
            <DollarSign size={20} /> Subscriptions
          </button>
          <button
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 w-full text-left"
            onClick={() => setSelectedTab("chat")}
          >
            <MessageSquare size={20} /> Chat
          </button>
        </div>
        <button
          className="flex items-center gap-2 p-2 bg-red-600 hover:bg-red-700 rounded-lg w-full text-left"
          onClick={handleLogout}
        >
          <LogOut size={20} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {selectedTab === "movies" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">📽️ Manage Movies</h2>
            <table className="w-full border rounded-lg bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Genre</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Movie rows will be added later */}
              </tbody>
            </table>
          </div>
        )}

        {selectedTab === "users" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">👥 Manage Users</h2>
            <h3 className="font-semibold mt-4">All Registered Users</h3>
            <table className="w-full border rounded-lg bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                        onClick={() => handleBanUser(user._id)}
                      >
                        Ban
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="font-semibold mt-6">Currently Logged-In Users</h3>
            <table className="w-full border rounded-lg bg-white">
              <thead className="bg-green-200">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {activeUsers.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedTab === "subscriptions" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">💳 Manage Subscriptions</h2>
            <table className="w-full border rounded-lg bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 text-left">User</th>
                  <th className="p-2 text-left">Plan</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Subscription rows will be added later */}
              </tbody>
            </table>
          </div>
        )}

        {selectedTab === "chat" && <AdminChat />}
      </div>
    </div>
  );
};

export default AdminDashboard;
