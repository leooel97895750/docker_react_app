import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule, themeAlpine } from "ag-grid-community";
import { themeBalham } from "ag-grid-community";
import { ModuleRegistry } from 'ag-grid-community';
import { TextFilterModule } from 'ag-grid-community';
import { NumberFilterModule } from 'ag-grid-community';
import { DateFilterModule } from 'ag-grid-community';
import { CustomFilterModule } from 'ag-grid-community';
import { CellStyleModule } from 'ag-grid-community';
import { MasterDetailModule } from 'ag-grid-enterprise';
//import "ag-grid-community/styles/ag-grid.css";
//import "ag-grid-community/styles/ag-theme-alpine.css";
import { Collapse } from "antd";
import DetailCellRenderer from "./SettingPanel";
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { EditOutlined } from '@ant-design/icons';
import "./ConfigBoard.css";

import { RenderApiModule } from 'ag-grid-community';
import { ColumnApiModule } from 'ag-grid-community';

import type {
  GridApi,
  GridReadyEvent,
  FirstDataRenderedEvent
} from 'ag-grid-community';

import type { GridOptions, CellValueChangedEvent } from 'ag-grid-community';
import { ColumnAutoSizeModule } from 'ag-grid-community'; 

const { Panel } = Collapse;

ModuleRegistry.registerModules([TextFilterModule, NumberFilterModule, DateFilterModule, CustomFilterModule]);
ModuleRegistry.registerModules([ClientSideRowModelModule, MasterDetailModule, CellStyleModule, ColumnAutoSizeModule]);
ModuleRegistry.registerModules([RenderApiModule, ColumnApiModule]);

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


const ConfigBoard: React.FC<ConfigBoardProps> = (props) => {
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
        // console.log(params);
        params.node.setExpanded(!params.node.expanded);
      }}>
        <EditOutlined style={{ fontSize: 16}} />
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
    <Collapse defaultActiveKey={['1']}>
      <Panel header="DB Overview" key="1">
        <div style={{ height: 500, width: '100%'}}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            theme={themeBalham}
            defaultColDef={{ resizable: true, sortable: true, filter: true }}
            masterDetail={true}
            detailCellRenderer={DetailCellRenderer}
            detailRowHeight={370} // 展開的高度
            
          />
        </div>
      </Panel>
    </Collapse>
  );
};

export default ConfigBoard;
