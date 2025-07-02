import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
 import Home from "../Pages/Home";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
// import About from "../Pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home/>,
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 2000)); // delay for 2 sec
          return null;
        }
      },
      {
        path:"/product/:slug" ,
        element: <ProductDetails/>,
        
      },
      {
        path: "/cart",
        element: <Cart/>,
        
      },
      // <Route path="/product/:slug" element={<ProductDetails />} />
      //     <Route path="/cart" element={<Cart />} />
      
      
    ],
  },
]);

export default router;
