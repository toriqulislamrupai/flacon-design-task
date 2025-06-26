import { Outlet, useNavigation } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Loader from "../Loader/Loader";

const MainLayout = () => {
  const navigation = useNavigation(); // 👈 detect if route is loading
  // const { language } = useContext(LanguageContext);
  return (
    <div className="">
      {/* globalLoader */}
      {navigation.state === "loading" && <Loader />} {/* 👈 show loader */}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
