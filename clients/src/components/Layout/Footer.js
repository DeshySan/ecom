import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='bg-dark text-light p-3 footer'>
      <h4 className='text-center'>
        All RIghts Reserver &copy; Sandesh Neupane
      </h4>
      <p className='text-center mt-3'>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        <Link to='/policy'>Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
