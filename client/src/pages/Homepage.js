import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
const Homepage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  //get total count products
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotal();
  }, []);
  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  //getAll products

  const getAllProducts = async () => {
    try {
      setLoading(false);
      const { data } = await axios.get(`api/v1/products/product-list/${page}`);
      setLoading(true);
      if (data?.success) {
        console.log(data.products);
        setProducts(data.products);
      } else {
        alert("error got");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
      console.log(all);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    getAllCategory();

    if (!checked.length || !radio.length) getAllProducts();
    //eslint-disable-next-line
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  //get filtered products

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/products/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  const loadMore = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setProducts([...products, ...data.products]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadMore();
  }, [page]);
  return (
    <Layout title={"All Products- Best Offers"}>
      <div className='row m-3'>
        <div className='col-md-3'>
          <h6 className='text-center'>Filter By Category</h6>
          <div className='d-flex flex-column'>
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h6 className='text-center mt-4'>Filter By Price</h6>
          <div className='d-flex flex-column'>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p.id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className='d-flex'>
            <button
              className='btn btn-danger'
              onClick={() => window.location.reload()}>
              Reset Filters
            </button>
          </div>
        </div>
        <div className='col-md-9'>
          {JSON.stringify(radio, null, 4)}
          <h3 className='text-center'>All Products</h3>
          <div className='d-flex flex-wrap'>
            {products?.map((product) => (
              <div className='card m-2' style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/products/get-product-photo/${product._id}`}
                  className='card-img-top'
                  alt={product.name}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{product.name}</h5>
                  <p className='card-text'>
                    {product.description.substring(0, 30)}...
                  </p>
                  <p className='card-text'>${product.price}</p>
                  <div className='btn btn-primary ms-1'>More Details</div>
                  <div className='btn btn-secondary ms-1'>ADD TO CART</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='m-2 p-3'>
          {products && products.length < total && (
            <button
              className='btn btn-warning'
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}>
              {loading ? "Loading..." : "Loadmore"}
            </button>
          )}
        </div>
        {total}
      </div>
    </Layout>
  );
};

export default Homepage;
