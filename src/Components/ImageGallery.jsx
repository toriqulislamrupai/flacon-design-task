import { useState } from "react";

const ImageGallery = ({ images }) => {
  const [mainIndex, setMainIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col items-center py-4 max-w-lg mx-auto">
      {/* Main Image */}
      <div className="w-full mb-4">
        <img
          src={images[mainIndex]}
          alt={`Main image ${mainIndex + 1}`}
          className="w-full max-h-[400px] object-contain rounded-lg shadow-lg"
          loading="lazy"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto px-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainIndex(idx)}
            className={`border-2 rounded-md overflow-hidden cursor-pointer transition-shadow duration-300 ${
              idx === mainIndex
                ? "border-emerald-400 shadow-lg"
                : "border-transparent hover:shadow-md"
            }`}
            aria-label={`Select image ${idx + 1}`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-20 h-20 object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
