import React, { useState } from "react";
import { Menu } from "antd";

const tableList = ["middel_cluster", "middle_dbconn", "middle_tns_name", "middle_dbinfo"];

const DBOperator: React.FC = () => {
  const [currentTable, setCurrentTable] = useState<string>("middel_cluster");

  return (
    <div style={{ marginTop: 20 }}>
      {/* 橫向選單 */}
      <Menu
        mode="horizontal"
        selectedKeys={[currentTable]}
        onClick={(e) => setCurrentTable(e.key)}
      >
        {tableList.map((table) => (
          <Menu.Item key={table}>{table}</Menu.Item>
        ))}
      </Menu>

      {/* 顯示目前選中的 table */}
      <div style={{ marginTop: 20 }}>
        <h3>目前選中：{currentTable}</h3>
      </div>
    </div>
  );
};

export default DBOperator;
