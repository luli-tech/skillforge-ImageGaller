

const ImageModal = ({ image, setClose }) => {
  return (
    <div
      onClick={() => setClose(false)} // Close modal when clicking outside
      className="fixed inset-0 flex opacity-80 items-center justify-center bg-black bg-opacity-0 z-50"
    >
      <div
        className="bg-white min-h-[50vh] rounded-lg shadow-lg p-6 max-w-full sm:max-w-2xl md:max-w-3xl lg:min-w-4xl lg:min-h-[50vh] xl:max-w-5xl relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <button
          onClick={() => setClose(false)} // Close modal when clicking the close button
          className="absolute cursor-pointer top-2 right-2 text-gray-700 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Image */}
        <img
          src={image?.url || "https://via.placeholder.com/300"} // Fallback image if no data is passed
          alt={image?.title || "No title"} // Fallback title if no data is passed
          className="w-full h-64 object-cover rounded-md"
        />

        {/* Image Details */}
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold">
            {image?.title || "No Title"}
          </h2>
          <p className="text-gray-600">ID: {image?.id || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
