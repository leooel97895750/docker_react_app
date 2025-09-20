import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CentralConfig from "./pages/CentralConfig";
import ProductConfig from "./pages/ProductConfig";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CentralConfig" element={<CentralConfig />} />
        <Route path="/ProductConfig" element={<ProductConfig />} />
      </Routes>
    </Router>
  );
};

export default App;
