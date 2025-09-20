import React, { useState, useEffect } from "react";
import { Space, Dropdown, Button, Menu, Select, Form, Input } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;


const ProductConfig: React.FC = () => {
  {/* 後端資料 */ }
  const [fabList, setFabList] = useState<string[]>([]);
  const [productList, setProductList] = useState<string[]>([]);
  const [typeList, setTypeList] = useState<string[]>([]);
  const [configID, setConfigId] = useState<string>("empty");
  const [clusterIDList, setClusterIDList] = useState<string[]>([]);

  {/* 使用者選取 */ }
  const [fab, setFab] = useState<string | undefined>(undefined);
  const [product, setProduct] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);
  const [clusterId, setClusterId] = useState<string | undefined>(undefined);

  {/* 獲得所有的fab列表，沒有任何依賴 */ }
  useEffect(() => {
    fetch("http://127.0.0.1:8000/fab/")
      .then(res => {
        // console.log(res);
        return res.json();
      })
      .then(data => {
        // console.log(data);
        setFabList(data);
      })
      .catch(err => console.error(err));
  }, []);

  {/* 獲得所有的product列表，沒有任何依賴 */ }
  useEffect(() => {
    fetch("http://127.0.0.1:8000/product/")
      .then(res => res.json())
      .then(data => setProductList(data))
      .catch(err => console.error(err));
  }, []);

  {/* 獲得所有的type列表，沒有任何依賴 */ }
  useEffect(() => {
    fetch("http://127.0.0.1:8000/type/")
      .then(res => res.json())
      .then(data => setTypeList(data))
      .catch(err => console.error(err));
  }, []);

  {/* 獲得product和type對應的config_id */ }
  useEffect(() => {
    if (product && type) {
      fetch(`http://127.0.0.1:8000/config_id?product=${product}&type=${type}`)
        .then(res => res.json())
        .then(data => setConfigId(data.config_id))
        .catch(err => console.error(err));
    } else {
      setClusterId("empty"); // 沒選完整就清空
    }
  }, [product, type]);

  {/* 獲得config_id對應的cluster_id */ }
  useEffect(() => {
    if (configID) {
      fetch(`http://127.0.0.1:8000/current_cluster_id?config_id=${configID}`)
        .then(res => res.json())
        .then(data => setClusterId(data.cluster_id))
        .catch(err => console.error(err));

      fetch("http://127.0.0.1:8000/cluster_id/")
        .then(res => res.json())
        .then(data => setClusterIDList(data))
        .catch(err => console.error(err));
    }
  }, [configID]);

  return (
    <div style={{ padding: "16px" }}>
      {/* 第一層 */}
      <Form layout="vertical">
        <Form.Item label="Fab">
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
            {fabList.map((fab) => (
              <Option key={fab} value={fab}>
                {fab}
              </Option>
            ))}
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
              {productList.map((product) => (
                <Option key={product} value={product}>
                  {product}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* 步驟3. 選type */}
          <Form.Item label="Type">
            <Select
              placeholder="Type"
              value={type}
              disabled={!product}
              onChange={(val) => {
                {/* 用product和type去取得config_id */}

                setType(val);
                setClusterId(undefined);
              }}
              style={{ width: 120 }}

            >
              {typeList.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Space>
      </Form>

      {/* 第三層 */}
      <br />
      <Form layout="vertical">
        <Space size="middle">
        <Form.Item label="Config ID">
          {/* 步驟4. 選Cluster ID */}
          <Input 
            type="email" 
            disabled 
            value={configID}
          />
        </Form.Item>
        <Form.Item label="Cluster ID">
          {/* 步驟4. 選Cluster ID */}
          <Select
              placeholder="Cluster ID"
              value={clusterId}
              disabled={!type}
              onChange={(val) => {
                setClusterId(val);
              }}
              style={{ width: 120 }}
            >
              {clusterIDList.map((clusterIDListItem) => (
                <Option key={clusterIDListItem} value={clusterIDListItem}>
                  {clusterIDListItem}
                </Option>
              ))}
            </Select>
        </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

export default ProductConfig;
