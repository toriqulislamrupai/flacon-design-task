import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import ImageGallery from "../Components/ImageGallery";
import VariationSelector from "../Components/VariationSelector";
import QuantitySelector from "../Components/QuantitySelector";
import ProductDetailsThirdPart from "../Components/ProductDetailsThirdPart";
import { FaStar } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { fetchProducts } from "../Api/Api";
import { proxifyImage } from "../utils/proxyHelper";
import icon1 from "../assets/Group 8369.png";
import icon2 from "../assets/share-08.png";
import verified from "../assets/Group 1010108455.png";


// ✅ Helper to replace local image URLs via Netlify proxy

// ✅ Fallback content
const fallbackDescription = `Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions. And how good that in such realities Apple everything is fine with displays.`;

const fallbackSpecification = `Sharp FP-J30E-B Air Purifier
GMP Cosmetic Good Manufacturing Practice
Cruelty Free
No Animal Testing
Zenpia Global Standard
Comply with Global Standard`;

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [descExpanded, setDescExpanded] = useState(false);
  const [specExpanded, setSpecExpanded] = useState(false);

  const navigate = useNavigate();
  const { slug } = useParams();
  const { addToCart } = useContext(CartContext);

  // ✅ Fetch product from proxied API
  useEffect(() => {
    axios
      .get(`/.netlify/functions/proxy/api/v1/product/${slug}`)
      .then((res) => {
        const data = res?.data?.data;
        const images = Object.values(data.image || {}).map((img) =>
          proxifyImage(img.url)
        );

        setProduct({
          ...data,
          images: images.length ? images : ["/placeholder.jpg"],
          variations: {
            color: data?.variations?.color || [
              "Black",
              "White",
              "Green",
              "Blue",
            ],
            size: data?.variations?.size || ["XL", "XS", "S", "M", "L"],
          },
          price: data.sale_price || data.regular_price || 99,
          categoryName: data.category?.name || "General",
        });
      })
      .catch((err) => console.error("❌ Product fetch failed", err));
  }, [slug]);

  // ✅ Fetch all products for related/match
  useEffect(() => {
    fetchProducts()
      .then((res) => {
        const all = res?.data?.data || [];
        setFetchedProducts(all);
        setRelatedProducts(all.filter((p) => p.slug !== slug));
      })
      .catch((err) => console.error("❌ Related products fetch failed", err));
  }, [slug]);

  const matchedProduct = fetchedProducts.find(
    (item) => item.slug === product?.slug
  );
  const discountPrice = parseFloat(matchedProduct?.discount_price || 0);
  const regularPrice = parseFloat(matchedProduct?.regular_price || 0);
  const isDiscounted = discountPrice && discountPrice < regularPrice;

  const handleAddToCart = () => {
    const finalPrice = isDiscounted ? discountPrice : regularPrice;

    addToCart({
      productId: product.slug,
      title: product.name || "Unknown Product",
      price: finalPrice,
      discount_price: discountPrice,
      regular_price: regularPrice,
      color: selectedColor || product.variations.color[0],
      size: selectedSize || product.variations.size[0],
      quantity,
      image: product.images[0],
    });

    navigate("/cart");
  };

  if (!product) return <p className="p-4">Loading...</p>;

  const descriptionText = product.description?.trim() || fallbackDescription;
  const specificationText =
    product.specification?.trim() || fallbackSpecification;

  return (
    <div>
      <p className="text-sm p-4 text-gray-500">
        Category: {product.categoryName}
      </p>

      <div className="flex flex-col items-center space-y-6 max-w-7xl mx-auto lg:flex-row bg-white gap-8 py-2">
        <div className="lg:w-1/3">
          <ImageGallery images={product.images}
           thumbnail={proxifyImage(product.thumbnail)} />
        </div>

        <div className="lg:w-1/3 flex flex-col lg:items-start items-center space-y-4">
          <h1 className="text-3xl font-bold text-center lg:text-left">
            {product.name}
          </h1>

          <div className="flex lg:flex-row flex-col items-center justify-between w-full gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-black text-base">
                {matchedProduct?.rating_avg ?? "N/A"}
              </span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(matchedProduct?.rating_avg || 0)
                        ? "fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span>({matchedProduct?.rating_count ?? 0})</span>
              <FiChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            <div className="flex items-center gap-2">
              <img src={icon1} alt="star1" />
              <img src={icon2} alt="star2" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xl font-semibold text-green-700 flex items-center gap-2">
              <span className="font-serif">৳</span>
              {isDiscounted ? (
                <>
                  <span>{discountPrice.toFixed(2)}</span>
                  <span className="text-gray-500 line-through text-base">
                    ৳{regularPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span>{regularPrice.toFixed(2)}</span>
              )}
            </p>

            <img
              src={verified}
              alt="Verified"
              className="object-contain"
            />
          </div>

          <VariationSelector
            label="Available Color"
            options={product.variations.color}
            selected={selectedColor}
            onSelect={setSelectedColor}
          />
          <VariationSelector
            label="Selected Size"
            options={product.variations.size}
            selected={selectedSize}
            onSelect={setSelectedSize}
          />
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

          <button
            onClick={handleAddToCart}
            className="w-full bg-emerald-400 text-white py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>

        <div className="lg:w-1/3">
          <ProductDetailsThirdPart />
        </div>
      </div>

      <div className="bg-gray-200 px-9 lg:w-[68%] py-4">
        <div className="bg-white p-2 space-y-6">
          <div>
            <h2 className="font-normal text-lg mb-2">Description</h2>
            <div
              className={`text-gray-700 whitespace-pre-line leading-relaxed ${
                descExpanded ? "" : "max-h-[72px] overflow-hidden"
              }`}
              style={{ lineHeight: "1.5rem" }}
            >
              {descriptionText}
            </div>
            <div className="flex justify-center">
              <button
                className="mt-2 text-sm hover:text-emerald-400 flex items-center gap-1"
                onClick={() => setDescExpanded(!descExpanded)}
              >
                <span>{descExpanded ? "See Less..." : "See More..."}</span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    descExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-2 mt-4">
          <h2 className="text-lg mb-2">Specification</h2>
          <ul
            className={`list-disc pl-5 text-gray-700 leading-relaxed ${
              specExpanded ? "" : "max-h-[96px] overflow-hidden"
            }`}
            style={{ lineHeight: "1.5rem" }}
          >
            {specificationText
              .split("\n")
              .filter(Boolean)
              .map((line, idx) => (
                <li key={idx}>{line.trim()}</li>
              ))}
          </ul>
          <div className="flex justify-center">
            <button
              className="mt-2 text-sm hover:text-emerald-400 flex items-center gap-1"
              onClick={() => setSpecExpanded(!specExpanded)}
            >
              <span>{specExpanded ? "See Less..." : "See More..."}</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  specExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
