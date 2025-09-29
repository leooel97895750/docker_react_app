import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CentralConfig from "./pages/CentralConfigPage";
import ProductConfig from "./pages/ProductConfigPage";
import JustTest from "./pages/JustTest";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  FileOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const routeKeyMap: Record<string, string> = {
  "/CentralConfig": "CentralConfig",
  "/ProductConfig": "ProductConfig",
  "/JustTest": "JustTest"
};

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ position: "sticky", top: 0, left: 0, height: "100vh" }}>
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Central DB Config Web
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[routeKeyMap[location.pathname] || "CentralConfig"]}
          onClick={(e) => {
            // e.key 就是我們在 items 設定的 key
            if (e.key === "CentralConfig") navigate("/CentralConfig");
            if (e.key === "ProductConfig") navigate("/ProductConfig");
            if (e.key === "JustTest") navigate("/JustTest");
          }}
          items={[
            {
              key: "CentralConfig",
              icon: <UserOutlined />,
              label: "CentralConfig",
            },
            {
              key: "ProductConfig",
              icon: <FileOutlined />,
              label: "ProductConfig",
            },
            {
              key: "JustTest",
              icon: <FileOutlined />,
              label: "JustTest",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "16px" }}>
          <Routes>
            <Route path="/CentralConfig" element={<CentralConfig />} />
            <Route path="/ProductConfig" element={<ProductConfig />} />
            <Route path="/JustTest" element={<JustTest />} />
            {/* 預設導向 CentralConfig */}
            <Route path="/" element={<CentralConfig />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const App: React.FC = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
