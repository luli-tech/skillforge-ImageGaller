import React from "react";
import { Link } from "react-router-dom";



const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      onClick={toggleSidebar}
      className={`fixed lg:hidden md:hidden inset-0 bg-gray-800 bg-opacity-[10px] z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
    >
      <div
        className={`w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          }  bg-gray-900 h-full p-4`}
      >
        {/* <button className="text-white mb-4" onClick={toggleSidebar}>
          &times;
        </button> */}
        <Link
          to="/"
          className="block text-white py-2 px-4 hover:bg-gray-700 rounded"
        >
          Home
        </Link>
        <Link
          to="/favourites"
          className="block text-white py-2 px-4 hover:bg-gray-700 rounded"
        >
          Favourites
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
