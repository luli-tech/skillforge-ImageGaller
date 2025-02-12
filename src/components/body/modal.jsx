const ImageModal = ({ image, setClose }) => {
  return (
    <div
      onClick={() => setClose(false)} // Close modal when clicking outside
      className="over fixed inset-0 flex items-center justify-center overflow-hidden bg-black  z-50"
    >
      <div
        className="bg-white text-black md:max-w-[600px] lg:max-w-[600px] w-full rounded-lg shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={() => setClose(false)}
          className="absolute cursor-pointer top-4 right-4 text-gray-700 hover:text-red-600 text-2xl font-bold"
        >
          Close
        </button>

        {/* Image with Fixed Size */}
        <img
          src={image?.url || "https://via.placeholder.com/600"}
          alt={image?.title || "No title"}
          className="w-[500px] h-[400px] object-cover rounded-md mx-auto"
        />

        {/* Image Details */}
        <div className="mt-4 text-center px-4">
          <h2 className="text-2xl text-black font-semibold">{image?.title || "No Title"}</h2>
          <p className="text-gray-600 text-lg">ID: {image?.id || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
