import { useEffect, useState } from "react";
import { fetchCategories } from "../../Api/Api";
import { FaBars, FaHeadset, FaShippingFast, FaStore } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const TopBars = () => {
  const [categories, setCategories] = useState([]);
  const [openCategoryId, setOpenCategoryId] = useState(null); // Track open category

  useEffect(() => {
    fetchCategories()
      .then((res) => {
        setCategories(res?.data?.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // Toggle open category - only one open at a time
  const toggleCategory = (id) => {
    setOpenCategoryId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="w-full bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 flex-wrap gap-4 text-sm md:text-base font-medium text-gray-800">

        {/* Left: Category with Dropdown */}
        <div className="flex items-center gap-2 cursor-pointer relative group">
          <FaBars className="text-lg text-emerald-400" />
          <span className="hidden sm:inline">Category</span>

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 bg-white shadow-lg border rounded w-56 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity z-50 max-h-96 overflow-y-auto">
            {categories.length === 0 ? (
              <p className="p-4 text-gray-500">Loading categories...</p>
            ) : (
              <ul>
                {categories.map((cat) => (
                  <li key={cat.id} className="border-b last:border-none">
                    <div
                      className="px-4 py-2 hover:bg-emerald-100 cursor-pointer flex justify-between items-center"
                      onClick={() => toggleCategory(cat.id)}
                    >
                      <span>{cat.name}</span>
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <span
                          className={`ml-2 text-gray-500 transition-transform duration-200 ${
                            openCategoryId === cat.id ? "rotate-90" : ""
                          }`}
                        >
                         <FaChevronDown className="text-emerald-400"/>
                        </span>
                      )}
                    </div>

                    {/* Show subcategories only if this category is open */}
                    {openCategoryId === cat.id && cat.subcategories && cat.subcategories.length > 0 && (
                      <ul className="bg-green-100 border-t">
                        {cat.subcategories.map((subcat) => (
                          <li
                            key={subcat.id}
                            className="px-6 py-1 hover:bg-emerald-200 cursor-pointer"
                          >
                            {subcat.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Center nav items unchanged */}
        <div className="flex flex-wrap flex-row  justify-center gap-4 text-center flex-1">
          <span className="cursor-pointer hover:text-emerald-400 transition">Electronics</span>
          <span className="cursor-pointer hover:text-emerald-400 transition">Home Appliances</span>
          <span className="cursor-pointer hover:text-emerald-400 transition">Mother & Baby</span>
          <span className="cursor-pointer hover:text-emerald-400 transition">Automotive</span>
          <span className="cursor-pointer hover:text-emerald-400 transition">Sports Gear</span>
        </div>

        {/* Right utilities unchanged */}
        <div className="flex items-center gap-4 whitespace-nowrap">
          <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-400 transition">
            <FaShippingFast className="text-base" />
            <span className="hidden sm:inline">Track Order</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-400 transition">
            <FaHeadset className="text-base" />
            <span className="hidden sm:inline">Help Center</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-400 transition">
            <FaStore className="text-base" />
            <span className="hidden sm:inline">Sell With Us</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TopBars;
