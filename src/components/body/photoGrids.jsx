import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../store/store";
import Pagination from "./pagination";
import ImageModal from "./modal";
import { toast } from "react-toastify";
import { addToFavourite } from "../../store/store";

const PHOTOS_PER_PAGE = 32;

const PhotoGrids = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState("");
    const [close, setClose] = useState(false);
    const [search, onSearch] = useState("");
    const { photos, isLoading, error, favourite, message } = useSelector(
        (state) => state.photo
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [isDarkMode, setIsDarkMode] = useState(false);

    function getModalFunction(modal) {
        const modalData = photos.find((photo) => photo.id === modal.id);
        setModal(modalData || null);
        setClose(true);
    }

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const totalPages = Math.ceil(photos?.length / PHOTOS_PER_PAGE);
    const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
    const currentPhotos = photos?.slice(startIndex, startIndex + PHOTOS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    function handleAddToFavourite(photo) {
        dispatch(addToFavourite(photo));
        toast(message);
    }

    if (isLoading) return <div className="text-center mt-4">Loading...</div>;
    if (error)
        return <div className="text-center text-red-500 mt-4">Error: {error}</div>;
    if (!photos?.length)
        return <div className="text-center mt-4">No photos available.</div>;

    return (
        <div
            className={`p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
                }`}
        >
            {close && <ImageModal image={modal} setClose={setClose} />}
            <button
                onClick={toggleDarkMode}
                className="mb-4 p-2 rounded bg-gray-800 text-white hover:bg-gray-600"
            >
                Toggle Dark Mode
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentPhotos?.map((photo) => (
                    <div
                        key={photo.id}
                        onClick={() => getModalFunction(photo)}
                        className={`rounded-lg w-1xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 ${isDarkMode ? "bg-gray-800" : "bg-white"
                            }`}
                    >
                        <img
                            src={photo?.url}
                            alt={photo.title}
                            className="w-full h-60 object-cover"
                        />
                        <div className="p-4">
                            <p
                                className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"
                                    }`}
                            >
                                ID: {photo.id}
                            </p>
                            <p
                                className={`truncate ${isDarkMode ? "text-gray-300" : "text-gray-600"
                                    }`}
                            >
                                Title: {photo.title}
                            </p>
                        </div>
                        <button
                            onClick={(e) => {
                                handleAddToFavourite(photo);
                                e.stopPropagation();
                            }}
                            className={`font-bold cursor-pointer ml-4 mb-4 rounded px-2 m ${isDarkMode
                                ? "bg-white text-gray-800 hover:bg-gray-800 hover:text-white"
                                : "bg-gray-800 text-white hover:bg-white hover:text-gray-800"
                                }`}
                        >
                            Add to favourite
                        </button>
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default PhotoGrids;
