import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const subtotal = cart.reduce((acc, item) => {
    const price =
      item.discount_price && item.discount_price < item.price
        ? item.discount_price
        : item.price;
    return acc + price * item.quantity;
  }, 0);

  const handleQuantityChange = (item, qty) => {
    if (qty < 1) return;
    updateQuantity(item.productId, item.color, item.size, qty,);
  };

  const getItemKey = (item) => `${item.productId}_${item.color}_${item.size}`;

  const isSelected = (item) => selectedItems.includes(getItemKey(item));

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map(getItemKey));
    }
  };

  const toggleSelectItem = (item) => {
    const key = getItemKey(item);
    setSelectedItems((prev) =>
      prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key]
    );
  };

  const clearSelectedItems = () => {
    selectedItems.forEach((key) => {
      const [productId, color, size] = key.split("_");
      removeFromCart(productId, color, size);
    });
    setSelectedItems([]);
  };

  return (
    <div className="bg-gray-200">
      <div className="max-w-7xl mx-auto p-4">
        {cart.length === 0 ? (
          <p>
            Your cart is empty.{" "}
            <Link to="/" className="text-blue-600 underline">
              Shop now
            </Link>
          </p>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Information */}
              <div className="flex-1 bg-white space-y-4 p-4">
                <div className="flex lg:flex-row flex-col justify-between items-center">
                  <div className="text-3xl font-bold">
                    Your Cart ({cart.length}{" "}
                    {cart.length === 1 ? "item" : "items"})
                  </div>
                  <div className="flex gap-4 items-center">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === cart.length}
                        onChange={toggleSelectAll}
                      />
                      Select All
                    </label>
                    <button
                      onClick={clearSelectedItems}
                      className="text-red-600 text-sm font-medium hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {cart.map((item, idx) => {
                  const regularPrice = item.regular_price || item.price;
                  const isDiscounted =
                    item.discount_price && item.discount_price < regularPrice;
                  const unitPrice = isDiscounted
                    ? item.discount_price
                    : regularPrice;

                  return (
                    <div
                      key={idx}
                      className="flex lg:flex-row flex-col items-center gap-4 border-b pb-4"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected(item)}
                          onChange={() => toggleSelectItem(item)}
                        />
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-semibold">{item.title}</h2>
                        <div className="flex lg:flex-row  gap-2 flex-col">
                          <p>Color: {item.color}</p>
                          <p>Size: {item.size}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() =>
                              handleQuantityChange(item, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded border flex items-center justify-center text-lg hover:bg-gray-200"
                          >
                            –
                          </button>
                          <input
                            id={`qty-${idx}`}
                            type="number"
                            min="1"
                            className="w-16 border rounded px-2 py-1 text-center"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item, Number(e.target.value))
                            }
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(item, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded border flex items-center justify-center text-lg hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Final Price */}
                      <div className="font-mono text-right flex gap-2 items-center">
                        <p className="text-green-600">
                          ৳{(unitPrice * item.quantity).toFixed(2)}
                        </p>
                        {isDiscounted && (
                          <p className="text-sm line-through text-gray-500">
                            ৳{(regularPrice * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-96 h-[500px] bg-white p-6 border rounded flex flex-col justify-between">
                <div>
                  <h2 className="font-medium text-xl mb-6">Order Summary</h2>

                  <div className="flex justify-between mb-3">
                    <span>
                      Price ({cart.length}{" "}
                      {cart.length === 1 ? "item" : "items"})
                    </span>
                    <span className="font-mono">৳{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between mb-3">
                    <span>Shipping fee</span>
                    <span className="italic text-blue-500">To be added</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex lg:flex-row flex-col gap-2 lg:gap-0 border border-emerald-500">
                      <input
                        type="text"
                        id="coupon"
                        placeholder="Store / Falcon coupon"
                        className="flex-1 border outline-none px-3 py-2"
                      />
                      <button
                        type="button"
                        className="bg-emerald-400 text-white px-4 lg:py-0 py-1 hover:bg-blue-700 transition"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between font-medium text-lg border-t pt-3">
                    <span>Sub Total</span>
                    <span className="font-mono">৳{subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="inline-flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={() => setAgreeTerms(!agreeTerms)}
                      className="mt-1"
                    />
                    <span>
                      I have read and agree to the{" "}
                      <a
                        href="/terms"
                        className="underline hover:text-blue-600"
                      >
                        Terms and Conditions
                      </a>
                      ,{" "}
                      <a
                        href="/privacy"
                        className="underline hover:text-blue-600"
                      >
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="/refund"
                        className="underline hover:text-blue-600"
                      >
                        Refund and Return Policy
                      </a>
                      .
                    </span>
                  </label>

                  <button
                    disabled={!agreeTerms}
                    className={`mt-6 w-full py-3 rounded font-semibold text-white transition ${
                      agreeTerms
                        ? "bg-emerald-400 hover:bg-blue-700 cursor-pointer"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                    onClick={() => alert("Proceeding to checkout...")}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
