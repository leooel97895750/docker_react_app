import React from "react";
import DBConfigBoard from "./ConfigBoard";
import DBOperator from "./DBOperator";

const CentralConfig: React.FC = () => {
  return (
    <div style={{ padding: "16px" }}>
      <DBConfigBoard
        clusterId="central_config"
      />
      <DBOperator />
    </div>
  );
};

export default CentralConfig;