import { useSelector, useDispatch } from "react-redux";
import { removeFromFavourite } from "../../store/store";
const Favourites = () => {
  const dispatch = useDispatch();
  const { favourite, isDarkMode } = useSelector((state) => state.photo);

  function removeFavourite(photo) {
    dispatch(removeFromFavourite(photo))
  }

  return (
    <div className="p-4 container">
      <h1 className={`font-bold text-4xl mb-5 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Favourites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favourite.map((photo) => (
          <div
            key={photo.id}
            className={`rounded-lg w-1xl cursor-pointer shadow-lg overflow-hidden transition-transform transform hover:scale-105 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <p className={`font-semibold text-gray-800 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>ID: {photo.id}</p>
              <p className={`text-gray-600 truncate  ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Title: {photo.title}</p>
            </div>
            <button
              onClick={() => removeFavourite(photo)}
              className={` font-bold cursor-pointer hover:bg-white hover:text-gray-800 ml-4 mb-4 rounded px-2  ${isDarkMode ? 'text-white bg-black' : 'text-white bg-black'}`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
