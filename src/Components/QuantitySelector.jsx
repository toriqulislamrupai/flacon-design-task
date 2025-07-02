

const QuantitySelector = ({ quantity, setQuantity, max = 99 }) => {
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const increment = () => setQuantity((q) => (q < max ? q + 1 : q));

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={decrement}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        -
      </button>
      <input
        type="number"
        min="1"
        max={max}
        value={quantity}
        onChange={(e) =>
          setQuantity(
            Math.min(Math.max(1, Number(e.target.value)), max)
          )
        }
        className="w-12 text-center border rounded"
      />
      <button
        onClick={increment}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
