import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";
import Footer from "./pages/Movies/Footer";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3 min-h-[78vh] mt-[4.5rem]">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default App;
