import React, { useContext, useState } from 'react'
import { AuthContext }from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

import Registerform from '../../components/auth/Registerform'
import axios from "axios";


const Register = () => {

    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password ,setPassword] = useState("")
    const [role, setRole] = useState("user");
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post("http://localhost:5000/api/auth/register", { name ,email, password, role });
        localStorage.setItem("userToken", data.token);
        setUser(data.user);
        navigate(`/verify-email/${data.user._id}`); 
       
      } catch (error) {
        alert(error.response?.data?.message || "Registration failed");
      }
    };
    
  return (
    <div>
      
        <Registerform  email={email}
                name={name}
                setName={setName}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                role={role}
                setRole={setRole}
                handleRegister={handleRegister}
                ></Registerform>
    </div>
  )
}

export default Register