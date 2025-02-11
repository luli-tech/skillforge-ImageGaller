import { useState } from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDarkMode } from "../../store/store";
import DarkModeToggle from "../body/DarkModeToggle";

const Navbar = () => {
  let dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  let { isDarkMode } = useSelector((state) => state.photo);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }
  function toggleDarkMode() {
    dispatch(getDarkMode());
  }

  return (
    <div>
      <nav className={`p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} z-10 fixed w-[100%]`}>
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            ImageGallery
          </Link>
          <div className=""><DarkModeToggle /></div>
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
