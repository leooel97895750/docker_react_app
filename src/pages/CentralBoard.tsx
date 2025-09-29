import React, { useState, useEffect } from "react";
import { Collapse } from "antd";
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import { AgGridReact } from "ag-grid-react";
import { 
  ClientSideRowModelModule, themeBalham, ModuleRegistry, TextFilterModule,
  NumberFilterModule, DateFilterModule, CustomFilterModule, CellStyleModule,
  ICellRendererParams, RenderApiModule, ColumnApiModule, ColumnAutoSizeModule
} from "ag-grid-community";
import { MasterDetailModule } from 'ag-grid-enterprise';


ModuleRegistry.registerModules([
  TextFilterModule, NumberFilterModule, DateFilterModule, CustomFilterModule,
  ClientSideRowModelModule, MasterDetailModule, CellStyleModule, ColumnAutoSizeModule,
  RenderApiModule, ColumnApiModule
]);

type ConfigBoardProps = {
  clusterId: string | undefined;
};

type Product = {
  cluster_id: number,
  dbconn_id: string,
  type: string,
  asdfa: string,
  bsdfa: string,
  csdfa: string,
  dsdfa: string,
  esdfa: string,
  fsdfa: string
};

const { Panel } = Collapse;


const CentralBoard: React.FC<ConfigBoardProps> = (props) => {
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
            let columns = Object.keys(data[0]).map((key) => ({
              headerName: key.toUpperCase(),
              field: key,
              sortable: true,
              filter: true,
            }));

            setColumnDefs(columns);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [props.clusterId]);


  return (
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header="DB Overview" key="1">
        <div style={{ height: 400, width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            theme={themeBalham}
            defaultColDef={{ resizable: true, sortable: true, filter: true }}
          />
        </div>
      </Panel>
    </Collapse>
  );
};

export default CentralBoard;
