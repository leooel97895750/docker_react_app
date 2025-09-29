import React, { useState, useEffect, useRef } from "react";
import { Space, Dropdown, Button, Menu, Select, Form, Input } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import SettingBoard from "./SettingBoard";

const { Option } = Select;

const getFabList = async (): Promise<string[]> => {
  try {
    const res = await fetch("http://127.0.0.1:8000/fab/");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getProductList = async (): Promise<string[]> => {
  try {
    const res = await fetch("http://127.0.0.1:8000/product/");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getTypeList = async (): Promise<string[]> => {
  try {
    const res = await fetch("http://127.0.0.1:8000/type/");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getClusterIdList = async (): Promise<string[]> => {
  try {
    const res = await fetch("http://127.0.0.1:8000/cluster_id/");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const ProductConfigPage: React.FC = () => {
  {/* 後端資料 */ }
  const [fabList, setFabList] = useState<string[]>([]);
  const [productList, setProductList] = useState<string[]>([]);
  const [typeList, setTypeList] = useState<string[]>([]);
  const [configId, setConfigId] = useState<string | undefined>(undefined);
  const [clusterIDList, setClusterIDList] = useState<string[]>([]);

  {/* 使用者選取 */ }
  const [fab, setFab] = useState<string | undefined>(undefined);
  const [product, setProduct] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);
  const [clusterId, setClusterId] = useState<string | undefined>(undefined);

  const isGetInitialData = useRef(false);

  {/* 獲得所有的fab列表，沒有任何依賴 */ }
  useEffect(() => {
    if (isGetInitialData.current === false) {
      isGetInitialData.current = true;
      getFabList().then(data => {
        setFabList(data);
      });
      getProductList().then(data => {
        setProductList(data);
      });
      getTypeList().then(data => {
        setTypeList(data);
      });
      getClusterIdList().then(data => {
        setClusterIDList(data);
      });
    }
  }, []);

  {/* 獲得product和type對應的config_id */ }
  const getConfigIdByProductAndType = async (product: string, type: string) => {
    if (product && type) {
      const res1 = await fetch(`http://127.0.0.1:8000/config_id?product=${product}&type=${type}`);
      const data1 = await res1.json();
      setConfigId(data1.config_id)

      const res2 = await fetch(`http://127.0.0.1:8000/current_cluster_id?config_id=${data1.config_id}`);
      const data2 = await res2.json();
      setClusterId(data2.cluster_id)

    }
  };

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
      <Form layout="vertical">
        <Space size="small">
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
                setType(val);
                {/* 用product和type去取得config_id */}
                getConfigIdByProductAndType(product!, val);
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
      <Form layout="vertical">
        <Space size="small">
        <Form.Item label="Config ID">
          {/* 步驟4. 選Cluster ID */}
          <Input 
            type="email" 
            disabled 
            value={configId}
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

      <SettingBoard
        clusterId={clusterId}
      />
    </div>
  );
};

export default ProductConfigPage;
