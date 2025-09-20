import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>首頁</h1>

      <button
        style={{ margin: "10px", padding: "10px 20px" }}
        onClick={() => navigate("/CentralConfig")}
      >
        CentralConfig
      </button>

      <button
        style={{ margin: "10px", padding: "10px 20px" }}
        onClick={() => navigate("/ProductConfig")}
      >
        ProductConfig
      </button>
      
    </div>
  );
};

export default Home;