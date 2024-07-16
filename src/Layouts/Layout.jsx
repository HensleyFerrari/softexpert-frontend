import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 p-4 bg-neutral-100 pt-24">{children}</div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Layout;
