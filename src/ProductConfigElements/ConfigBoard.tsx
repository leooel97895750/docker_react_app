import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

type ConfigBoardProps = {
  clusterId: string | undefined;
};

type Product = {
  id: number, 
  name: string, 
  type: string, 
  asdfa: string, 
  bsdfa: string, 
  csdfa: string, 
  dsdfa: string, 
  esdfa: string, 
  fsdfa: string
};

const ConfigBoard: React.FC<ConfigBoardProps> = (props) => {
  const [rowData, setRowData] = useState<Product[]>([]);
  const [columnDefs, setColumnDefs] = useState<any[]>([]);

  useEffect(() => {
    if (props.clusterId) {
      fetch(`http://127.0.0.1:8000/product_config_table?cluster_id=${props.clusterId}`)
      .then((res) => res.json())
      .then((res) => {
        const data = res.data;
        setRowData(data);

        if (data.length > 0) {
          // 動態生成欄位
          const cols = Object.keys(data[0]).map((key) => ({
            headerName: key.toUpperCase(),
            field: key,
            sortable: true,
            filter: true,
          }));
          setColumnDefs(cols);
        }
      })
      .catch((err) => console.error(err));
    }
  }, [props.clusterId]);


  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ resizable: true }}
      />
    </div>
  );
};

export default ConfigBoard;
