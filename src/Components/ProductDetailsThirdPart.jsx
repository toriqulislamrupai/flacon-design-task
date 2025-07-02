import exportImage from "../assets/package.svg";
import packageMovingImage from "../assets/package-moving.svg";
import ellipseImage from "../assets/Ellipse 2010.png";
import bannerImage from "../assets/Group 1010108421.jpg";
import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { IoStorefrontOutline } from "react-icons/io5";

const ProductDetailsThirdPart = () => {
  return (
    <div className=" p-4 shadow-sm space-y-4 text-gray-800 text-sm bg-white">
      {/* Delivery Options */}
      <div className="border rounded-md p-2">
        <h3 className="font-semibold text-base mb-2">Delivery Options</h3>

        {/* Regular Delivery */}
        <div className="flex flex-col  justify-between  rounded-md p-2 mb-2">
          <div className="flex items-center gap-2">
            <img
              src={exportImage}
              alt="regular"
              className="w-5 h-5 object-contain"
            />
            <span className="font-medium">Regular</span>
          </div>
          <span className="text-gray-500 text-xs">
            Delivery within 2–3 days
          </span>
        </div>

        {/* Express Delivery */}
        <div className="flex flex-col  justify-between rounded-md p-2">
          <div className="flex items-center gap-2 opacity-60">
            <img
              src={packageMovingImage}
              alt="express"
              className="w-5 h-5 object-contain"
            />
            <span className="font-medium line-through">Express</span>
          </div>
          <span className="text-gray-400 text-xs">Not Available</span>
        </div>

        <p className="text-[11px] text-gray-500 mt-1 ml-1">
          Delivery within 24 hours
        </p>
      </div>

      {/* Seller Info */}
      <div className="border rounded-md p-3 space-y-2">
        <div className="flex items-center gap-4">
          <img
            src={ellipseImage}
            alt="bd fashion"
            className="w-6 h-6 rounded-full"
          />
          <div>
            <div className="flex items-center gap-4">
              <span className="font-medium text-sm">BD FASHION HOUSE</span>
              <FaCheckCircle className="text-blue-500 text-base ml-auto" />
            </div>
            <div className="flex  w-full">
              <img
                src={bannerImage}
                alt="shop banner"
                className="  object-cover rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-between">
          <button className="flex items-center justify-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-600  text-xs rounded w-full">
            <HiOutlineChatAlt2 className="text-sm" /> Chat Now
          </button>
          <button className="flex items-center justify-center gap-1 px-3 py-1 border text-xs rounded w-full bg-gray-100">
            <IoStorefrontOutline className="text-sm" /> View Shop
          </button>
        </div>

        <div className="pt-2 flex md:flex-row justify-between flex-col text-xs text-gray-600">
          <div className="flex flex-col items-center justify-between">
            <span>Ship on Time</span>
            <span className="font-semibold text-xl">100%</span>
          </div>
          <div className="flex flex-col items-center justify-between">
            <span>Chat Response</span>
            <span className="font-semibold text-xl">90%</span>
          </div>
          <div className="flex flex-col items-center justify-between">
            <span>Shop Rating</span>
            <span className="font-semibold text-xl">99.8%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsThirdPart;
