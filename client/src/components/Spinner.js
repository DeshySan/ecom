import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div
        className='d-flex justify-content-center align-items-center flex-column'
        style={{ minHeight: "100vh" }}>
        <h4 className='align-self-center'>
          Redirecting you to Login Page in {count} seconds
        </h4>
        <div>
          <div className='spinner-grow text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <div className='spinner-grow text-secondary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <div className='spinner-grow text-success' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <div className='spinner-grow text-danger' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <div className='spinner-grow text-warning' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <div className='spinner-grow text-info' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <div className='spinner-grow text-light' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <div className='spinner-grow text-dark' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
