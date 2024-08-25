import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const Homepage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
      <div>Git check</div>
    </Layout>
  );
};

export default Homepage;
