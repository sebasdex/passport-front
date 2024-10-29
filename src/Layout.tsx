import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

function layout() {
  return (
    <div className="flex flex-col justify-between min-h-dvh">
      <Header />
      <main className="container mx-auto flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default layout;
