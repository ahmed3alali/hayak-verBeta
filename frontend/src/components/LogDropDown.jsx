import React, { useState, useRef, useEffect } from "react";
import { useLazyLogoutQuery } from "../Redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../Redux/store";
import { setIsAuthenticated, setUser } from "../Redux/features/userSlice";

const LogDropDown = ({ userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLogout] = useLazyLogoutQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await triggerLogout();
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));

      persistor.purge().then(() => {
        navigate("/adminLogin");
        window.location.reload();
      });

      navigate(0);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleClick = () => {
    if (!user) {
      navigate("/adminLogin");
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleAddProductClick = () => {
    navigate("/newProduct");
    setIsOpen(false);
  };

  const handleUpdateProductClick = () => {
    navigate("/updateProduct");
    setIsOpen(false);
  };

  const handleMyOrdersClick = () => {
    navigate("/myOrders");
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        data-tooltip-target="tooltip-profile"
        type="button"
        className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
        onClick={handleClick}
      >
        <svg
          className="w-5 h-5 mb-1 text-black-500 dark:text-white-400 group-hover:text-white-800 dark:group-hover:text-white-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <span className="sr-only">Profile</span>
      </button>

      <div
        id="tooltip-profile"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
      >
        Profile
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && user && (
        <div className="absolute right-0 bottom-full mb-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <button
                onClick={handleAddProductClick}
                className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Add Product
              </button>
            </li>
            <li>
              <button
                onClick={handleUpdateProductClick}
                className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Update Product
              </button>

              <button
                onClick={handleMyOrdersClick}
                className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                My Orders
              </button>


            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LogDropDown;
