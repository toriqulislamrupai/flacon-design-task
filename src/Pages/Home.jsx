import { useEffect, useState } from "react";
import { fetchProducts } from "../Api/Api";
import { Link } from "react-router-dom";
import { proxifyImage } from "../utils/proxyHelper";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((res) => setProducts(res?.data?.data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.length === 0 ? (
        <p className="text-red-500">No products found</p>
      ) : (
        products.map((item) => (
          <Link to={`/product/${item.slug}`} key={item.slug}>
            <div className="border p-2 h-96 rounded shadow hover:shadow-md transition">
              <img
                src={proxifyImage(item.thumbnail)}
                alt={item.name}
                className="w-full  h-44 object-cover"
              />

              <h2 className="text-sm  font-bold mt-2">{item.name}</h2>
              <p className="text-gray-600">${item.regular_price}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Home;
