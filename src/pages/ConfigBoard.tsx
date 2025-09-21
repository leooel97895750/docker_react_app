import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule, themeBalham } from "ag-grid-community";
import { ModuleRegistry } from 'ag-grid-community';
import { TextFilterModule } from 'ag-grid-community';
import { NumberFilterModule } from 'ag-grid-community';
import { DateFilterModule } from 'ag-grid-community';
import { CustomFilterModule } from 'ag-grid-community';
import { Collapse } from "antd";
const { Panel } = Collapse;

ModuleRegistry.registerModules([TextFilterModule, NumberFilterModule, DateFilterModule, CustomFilterModule]);
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
    <Collapse defaultActiveKey={['1']}>
      <Panel header="DB Overview" key="1">
        <div style={{ height: 300, width: "100%" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ resizable: true, sortable: true, filter: true }}
            theme={themeBalham}
          />
        </div>
      </Panel>
    </Collapse>
  );
};

export default ConfigBoard;
