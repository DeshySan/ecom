import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const CreateProduct = () => {
  return (
    <Layout title={"Create-Products-Ecommerce"}>
      <div className='row m-3 p-3'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>Create Products</div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
