import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-grow min-h-[75vh]">
        <div className="max-w-7xl mx-auto px-3 mt-16 py-3">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
