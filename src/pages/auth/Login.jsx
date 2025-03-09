import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import Loginform from '../../components/auth/Loginform';
import axios from "axios";

const Login = () => {
  const [loginChoice , setloginChoice] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For displaying error messages
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://youmovie-production.up.railway.app/api/auth/login", { loginChoice, password });
      localStorage.setItem("userToken", data.token);
      setUser(data.user);
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };


  return (
    <div>

      <Loginform
        loginChoice={loginChoice}
        setloginChoice={setloginChoice}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
    
      />
      
     
    </div>
  );
};

export default Login;
