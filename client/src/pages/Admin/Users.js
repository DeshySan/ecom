import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
  return (
    <Layout title={"Dashnboard- Users"}>
      <div className='row m-3 p-3'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>Hi Users</div>
      </div>
    </Layout>
  );
};

export default Users;
