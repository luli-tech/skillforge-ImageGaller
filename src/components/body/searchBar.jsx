import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleSearch } from "../../store/store";

const SearchBar = ({ onNewSearch, handlePageChange }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const onSearch = () => {
    dispatch(handleSearch(query)); // Dispatch the query to the Redux store
    setQuery(""); // Clear the input after the search
    handlePageChange(1)
    onNewSearch(); // Notify parent component about the new search
  };

  return (
    <div className="flex items-center justify-center p-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search with ImageID...."
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-800"
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
