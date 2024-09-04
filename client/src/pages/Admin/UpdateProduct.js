import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useAuth } from "../../context/auth";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get all products
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-nextline
  }, []);
  //create products function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `/api/v1/products/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.success) {
        alert("Product Created Successfully");
        navigate("/dashboard/admin/product");
      } else {
        alert("Something went wrong creating data");
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/api/v1/products/product/${id}`);
      alert("product delted");
      navigate("/dashboard/admin/product");
    } catch (error) {
      console.log(error);
      alert("Something has gone wrong after clicking the button");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Create-Products-Ecommerce"}>
      <div className='row m-3 p-3'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1> Create Products</h1>
          <div className='m-1'>
            <Select
              placeholder='Select a category'
              showSearch
              className='form-select mb-3'
              value={category}
              onChange={(value) => setCategory(value)}>
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className='mb-3'>
            <label className='btn btn-outline-secondary col-md-12'>
              {photo ? photo.name : "Upload Photos"}
              <input
                type='file'
                name='photo'
                accept='image/*'
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div className='mb-3'>
            {photo ? (
              <div className='text-center'>
                <img
                  // src={URL.createObjectURL(photo)}
                  alt='product_photo'
                  height={"200px"}
                  className='img img-responsive'
                />
              </div>
            ) : (
              <div className='text-center'>
                <img
                  src='data:image/png;base64,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'
                  alt='product_photo'
                  height={"200px"}
                  className='img img-responsive'
                />
              </div>
            )}
          </div>
          <div className='mb-3'>
            <input
              type='text'
              value={name}
              placeholder='Write a name'
              className='form-control'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <input
              type='text'
              value={description}
              placeholder='Write a description'
              className='form-control'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <input
              type='text'
              value={price}
              placeholder='Write a Price'
              className='form-control'
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <input
              type='text'
              value={quantity}
              placeholder='Write a quanitty'
              className='form-control'
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className='m-3'>
            <Select
              placeholder='Select a Shipping'
              size='large'
              showSearch
              className='form-select mb-3'
              onChange={(value) => setShipping(value)}
              value={shipping ? "Yes" : "No"}>
              <Option value='0'>No</Option>
              <Option value='1'>Yes</Option>
            </Select>
          </div>
          <div className='mb-3 col-md-12'>
            <button
              className='btn btn-primary col-md-10'
              onClick={handleUpdate}>
              UpdateProduct
            </button>
          </div>
          <div className='mb-3 col-md-12'>
            <button
              className='btn btn-primary col-md-10'
              onClick={handleDelete}>
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
