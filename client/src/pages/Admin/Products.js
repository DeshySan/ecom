import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu.js";
import Layout from "../../components/Layout/Layout.js";
import axios from "axios";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/get-product");
      setProducts(data.product);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Products-Ecommerce"}>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Products List</h1>

          <div className='d-flex flex-wrap'>
            {products?.map((product) => (
              <Link
                to={`/dashboard/admin/product/${product.slug}`}
                key={product._id}
                className='product-link'>
                <div className='card m-2' style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/products/get-product-photo/${product._id}`}
                    className='card-img-top'
                    alt={product.name}
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{product.name}</h5>
                    <p className='card-text'>{product.description}</p>
                    {/* <a href='#' className='btn btn-primary'>
                  Go somewhere
                </a> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
