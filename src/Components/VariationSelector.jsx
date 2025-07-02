

const VariationSelector = ({ label, options, selected, onSelect }) => {
  return (
    <div>
      <p className="font-semibold mb-1">{label}:{selected}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-3 py-1 border rounded hover:bg-gray-100 ${
              selected === option
                ? "border-emerald-400 bg-blue-100"
                : "border-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariationSelector;
