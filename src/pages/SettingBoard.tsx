import React, { useState, useEffect } from "react";
import SettingPanel from "./SettingPanel";
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


const SettingBoard: React.FC<ConfigBoardProps> = (props) => {
  const [rowData, setRowData] = useState<Product[]>([]);
  const [columnDefs, setColumnDefs] = useState<any[]>([]);

  // 展開按鈕
  const settingPage = {
    headerName: '',
    pinned: 'left',
    field: 'action',
    width: 80,
    sortable: false,
    filter: false,
    cellRenderer: (params: ICellRendererParams) => (
      <button onClick={() => {
        params.node.setExpanded(!params.node.expanded);
      }}>
        <SettingOutlined style={{ fontSize: 16}} />
      </button>
    )
  };

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
            
            columns.unshift(settingPage);
            setColumnDefs(columns);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [props.clusterId]);


  return (
    <div style={{ height: 500, width: '100%'}}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        theme={themeBalham}
        defaultColDef={{ resizable: true, sortable: true, filter: true }}
        masterDetail={true}
        detailCellRenderer={SettingPanel}
        detailRowHeight={420} // 展開的高度
      />
    </div>
  );
};

export default SettingBoard;
