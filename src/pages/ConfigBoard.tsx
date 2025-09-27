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
import DetailCellRenderer from "./DetailCellRenderer";
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { EditOutlined } from '@ant-design/icons';
import "./ConfigBoard.css";
const { Panel } = Collapse;

ModuleRegistry.registerModules([TextFilterModule, NumberFilterModule, DateFilterModule, CustomFilterModule]);
ModuleRegistry.registerModules([ClientSideRowModelModule, MasterDetailModule, CellStyleModule]);

const myTheme = themeBalham.withParams({
  headerCellHoverBackgroundColor: 'rgba(80, 40, 140, 0.66)', // Example color
});

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
            let cols = Object.keys(data[0]).map((key) => ({
              headerName: key.toUpperCase(),
              field: key,
              sortable: true,
              filter: true,
            }));
            let mybutton = {
              headerName: '',
              pinned: 'left',
              field: 'action',
              width: 80,
              sortable: false,
              filter: false,
              cellRenderer: (params: ICellRendererParams) => (
                <button onClick={() => {
                  console.log(params.node.data);
                  // params.node.isHovered is a function, not a property. You can check hover state by calling it:
                  
                  console.log(params.node.expanded);
                  params.node.setExpanded(!params.node.expanded);
                  // React 不知道它改變了 → 所以 button 上的文字不會自動重新渲染
                }}>
                  <EditOutlined style={{ fontSize: 16}} />
                </button>
              )
            };
            cols.unshift(mybutton);
            console.log("cols", cols);
            setColumnDefs(cols);
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
            theme={myTheme}
            defaultColDef={{ resizable: true, sortable: true, filter: true }}
            masterDetail={true}
            detailCellRenderer={DetailCellRenderer}
            detailRowHeight={320} // 展開的高度
            
          />
        </div>
      </Panel>
    </Collapse>
  );
};

export default ConfigBoard;
