import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDarkMode } from '../../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const DarkModeToggle = () => {
    const dispatch = useDispatch();
    const { isDarkMode } = useSelector(state => state.photo);

    const handleToggle = () => {
        dispatch(getDarkMode());
    };

    return (
        <div
            className="flex items-center justify-center cursor-pointer"
            onClick={handleToggle}
        >
            <div
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-300'}`}
            >
                <div
                    className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white transition-all duration-300 ${isDarkMode ? 'left-8' : 'left-2'}`}
                >
                    {isDarkMode ? (
                        <FontAwesomeIcon
                            icon={faSun}
                            className="text-yellow-500 w-full h-full flex justify-center items-center"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faMoon}
                            className="text-gray-800 w-full h-full flex justify-center items-center"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DarkModeToggle;
