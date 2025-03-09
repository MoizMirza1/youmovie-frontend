import React from 'react';
import logo from "../../Assets/Images/logo-without-text.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='bg-black py-12 flex justify-center'>
      <div className='container max-w-screen-xl px-5'>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10'>
          {/* Left section with heading and list */}
          <div className="flex items-start flex-col space-y-4">
            <div className="flex items-center space-x-4"> {/* Added horizontal alignment */}
              <img className="w-20 h-20" src={logo} alt="Logo" />
              <h3 className='text-white font-bold text-lg'>About Us</h3>
            </div>
            <ul className='text-white text-sm space-y-2'>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Consectetur adipisicing elit</li>
              <li>Reiciendis, asperiores?</li>
            </ul>
            <Link to="/pricing">
              <button className="px-10 py-2 bg-red-600 text-white rounded-md font-bold my-5">
                Purchase Plan
              </button>
            </Link>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col space-y-4">
            <h3 className='text-white font-bold text-lg'>Navigation</h3>
            <ul className='text-white text-sm space-y-2'>
              <li><Link to="/" className='hover:text-red-600'>Home</Link></li>
              <li><Link to="/about" className='hover:text-red-600'>About</Link></li>
              <li><Link to="/services" className='hover:text-red-600'>Services</Link></li>
              <li><Link to="/contact" className='hover:text-red-600'>Contact</Link></li>
            </ul>
          </div>

          {/* Additional navigation links */}
          <div className="flex flex-col space-y-4">
            <h3 className='text-white font-bold text-lg'>Resources</h3>
            <ul className='text-white text-sm space-y-2'>
              <li><Link to="/faq" className='hover:text-red-600'>FAQ</Link></li>
              <li><Link to="/blog" className='hover:text-red-600'>Blog</Link></li>
              <li><Link to="/terms" className='hover:text-red-600'>Terms & Conditions</Link></li>
              <li><Link to="/privacy" className='hover:text-red-600'>Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col space-y-4">
            <h3 className='text-white font-bold text-lg'>Follow Us</h3>
            <ul className='text-white text-sm space-y-2'>
              <li><a href="https://facebook.com" className='hover:text-red-600'>Facebook</a></li>
              <li><a href="https://twitter.com" className='hover:text-red-600'>Twitter</a></li>
              <li><a href="https://instagram.com" className='hover:text-red-600'>Instagram</a></li>
              <li><a href="https://linkedin.com" className='hover:text-red-600'>LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
