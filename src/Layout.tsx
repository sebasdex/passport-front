import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function layout() {
  return (
    <div className="flex flex-col justify-between min-h-dvh">
      <ToastContainer />
      <Header />
      <main className="container mx-auto flex-1 flex justify-center items-start p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default layout;
