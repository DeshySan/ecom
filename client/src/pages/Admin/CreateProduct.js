import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

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
  //create products function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        "/api/v1/products/create-product",
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
            <div className='text-center'>
              <img
                // src={URL.createObjectURL(photo)}
                alt='product_photo'
                height={"200px"}
                className='img img-responsive'
              />
            </div>
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
              onChange={(value) => setShipping(value)}>
              <Option value='0'>No</Option>
              <Option value='1'>Yes</Option>
            </Select>
          </div>
          <div className='mb-3 col-md-12'>
            <button
              className='btn btn-primary col-md-10'
              onClick={handleCreate}>
              CreateProduct
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
