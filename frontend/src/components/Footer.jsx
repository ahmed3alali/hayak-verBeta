import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../Redux/api/authApi';
import { setIsAuthenticated, setUser } from '../Redux/features/userSlice';
import { persistor } from '../Redux/store';
import withLove from '../images/withlove.png';
import LogDropDown from './LogDropDown';
import { Search, Info, ShoppingCart , Person} from 'lucide-react'; // Importing icons

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLogout] = useLazyLogoutQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated,user } = useSelector((state) => state.auth);
console.log(user);
  const handleHomePageClick = () => {
    navigate('/');
  };


const handleSearchClick = () => {
    navigate('/searchPage');
  };


  const handleCartClick = () => {
    navigate('/cart');
  };


  const handleSignInClick = () => {
    navigate('/adminLogin');
  };


  const handleAboutClick = () => {
    navigate('/about');
  };

  
  return (
    <div>
      <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          {/* Home Button */}
          <button
            data-tooltip-target="tooltip-home"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
            onClick={handleHomePageClick}
          >
            <svg
              className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <span className="sr-only">Home</span>
          </button>

          {/* Search Icon (Previously Wallet) */}
          <button
            data-tooltip-target="tooltip-search"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
       onClick={handleSearchClick}   >
            <Search className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600" />
            <span className="sr-only">Search</span>
          </button>

          {/* Center Button */}
          <div className="flex items-center justify-center">
            {user ? (
              <>
                <button
                  data-tooltip-target="tooltip-new"
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 font-medium bg-black rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                  <span className="sr-only">New item</span>
                </button>
              </>
            ) : (
              <div className="withLove w-12">
                <img src={withLove} alt="With Love" />
              </div>
            )}
          </div>

          {/* About Us Icon (Previously Settings) */}
          <button
            data-tooltip-target="tooltip-about"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        onClick={handleAboutClick} >
            <Info className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600" />
            <span className="sr-only">About Us</span>
          </button>

          {/* Profile Dropdown */}
        




          {/* Conditionally Render Cart or Sign In Button */}
          {isAuthenticated ? (
            // If authenticated, show person icon (sign in)
            <button
            data-tooltip-target="tooltip-profile"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <LogDropDown />
            <span className="sr-only">Profile</span>
          </button>
          ) : (
            // If not authenticated, show cart icon
            <button
              data-tooltip-target="tooltip-cart"
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              onClick={handleCartClick}
            >
              <ShoppingCart className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600" />
              <span className="sr-only">My Cart</span>
            </button>
          )}




        



        
        
        </div>
      </div>
    </div>
  );
};

export default Footer;
