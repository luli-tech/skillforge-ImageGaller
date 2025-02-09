import { useState } from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4 z-10 fixed w-[100%]  text-white">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="#" className="text-xl font-bold">
            ImageGallery
          </Link>
          <button className="md:hidden" onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded">
              Home
            </Link>
            <Link
              to="/favourites"
              className="hover:bg-gray-700 px-3 py-2 rounded"
            >
              Favourites
            </Link>
          </div>
        </div>
      </nav>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="container min-w-10 pt-18 mx-auto p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
