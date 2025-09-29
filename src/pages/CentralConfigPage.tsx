import React from "react";
import CentralBoard from "./CentralBoard";
import CentralPanel from "./CentralPanel";

const CentralConfigPage: React.FC = () => {
  return (
    <div>
      <CentralBoard
        clusterId="central_config"
      />
      <CentralPanel />
    </div>
  );
};

export default CentralConfigPage;