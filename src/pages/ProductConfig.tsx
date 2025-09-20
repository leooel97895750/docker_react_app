import React, { useState } from "react";
import { Space, Dropdown, Button, Menu, Select, Form } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

{/* call API 把不會變的東西都先拿好，例如fab(這可能存config), product, type */ }

const ProductConfig: React.FC = () => {
  const [fab, setFab] = useState<string | undefined>();
  const [product, setProduct] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>();
  const [clusterId, setClusterId] = useState<string | undefined>();

  {/* 存一些onchange時變動需要call API重新拿的東西，clusterid */ }

  return (
    <div style={{ padding: "16px" }}>
      <Form layout="vertical">

        <Form.Item label="Fab">
          {/* 第一層 */}
          {/* 步驟1. 選FAB */}
          <Select
            placeholder="Fab"
            value={fab}
            onChange={(val) => {
              setFab(val);
              setProduct(undefined);
              setType(undefined);
              setClusterId(undefined);
            }}
            style={{ width: 120 }}
          >
            {/* 應該由get API生成 */}
            <Option value="Fab12">Fab12</Option>
            <Option value="Fab20">Fab20</Option>
          </Select>
        </Form.Item>
      </Form>

      {/* 第二層 */}
      <br />
      <Form layout="vertical">
        <Space size="middle">
          <Form.Item label="Product">
            {/* 步驟2. 選product */}
            <Select
              placeholder="Product"
              value={product}
              disabled={!fab}
              onChange={(val) => {
                setProduct(val);
                setType(undefined);
                setClusterId(undefined);
              }}
              style={{ width: 120 }}
            >
              {/* 應該由get API生成 */}
              <Option value="sql service">sql service</Option>
              <Option value="tns generator">tns generator</Option>
            </Select>
          </Form.Item>

          {/* 步驟3. 選type */}
          <Form.Item label="Type">
            <Select
              placeholder="Type"
              value={type}
              disabled={!product}
              onChange={(val) => {
                setType(val);
                setClusterId(undefined);
              }}
              style={{ width: 120 }}

            >
              {/* 應該由get API生成 */}
              <Option value="general">general</Option>
              <Option value="inline">inline</Option>
              <Option value="critical">critical</Option>
            </Select>
          </Form.Item>

          {/* 步驟4. 選Cluster ID */}
          <Form.Item label="Cluster ID">
            <Select
              placeholder="Cluster ID"
              value={clusterId}
              disabled={!type}
              onChange={(val) => {
                setClusterId(val);
              }}
              style={{ width: 120 }}
            >
              {/* 應該由get API生成 */}
              <Option value="sdfalsdfjalsjdf">sdfalsdfjalsjdf</Option>
              <Option value="qweiruqewoituoi">qweiruqewoituoi</Option>
            </Select>

          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

export default ProductConfig;
