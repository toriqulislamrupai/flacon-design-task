import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import mainIcon from "../../assets/Frame 1618874453.png";

const TopHeader = () => {
  return (
    <div className="w-full bg-gray-900 text-white px-4 py-2 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between  gap-4">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2 text-xl font-bold w-[30%] md:w-[10%] ">
          
          <img src={mainIcon} alt="Loading..." className=" " />
        </div>

        {/* Center: Search bar */}
        <div className="flex-1 max-w-md w-full relative">
          <div className="flex items-center w-full bg-white rounded-sm overflow-hidden">
            <input
              type="text"
              placeholder="Search for anything........"
              className="w-full placeholder:text-xs md:placeholder:text-base px-2 md:px-3 py-2 text-black outline-none"
            />
            <div className="bg-emerald-400 py-3 p-2">
              <FaSearch className="text-white" />
            </div>
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <FaShoppingCart className="text-2xl" />
            {/* Absolute badge */}
            <div className="absolute top-[-6px] right-[-10px] bg-red-600 text-white text-xs px-1.5 rounded-full">
              12
            </div>
          </div>
          <FaUser className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
