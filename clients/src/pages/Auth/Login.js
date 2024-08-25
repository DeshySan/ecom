import React from "react";
import Layout from "../../components/Layout/Layout.js";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth.js";
const Login = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, { email, password });
      if (res && res.data.success) {
        toast.success("Registered succesfully");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      }
    } catch (error) {
      toast.error("Oops Something went wrong");
    }
  };
  return (
    <>
      <Layout title='Register'>
        <div className='register'>
          <h1>Ecommerce</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                Email address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type='email'
                className='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputPassword1' className='form-label'>
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type='password'
                className='form-control'
                id='exampleInputPassword1'
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
