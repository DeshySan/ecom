import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
const Layout = ({ children, title }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "Ecommerce",
};
export default Layout;
