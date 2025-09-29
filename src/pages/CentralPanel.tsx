import React, { useState, useEffect, useRef } from "react";
import CentralActionButton from './CentralActionButton';
import { Menu } from "antd";
import { AgGridReact } from "ag-grid-react";
import { 
  ICellRendererParams, TextEditorModule, ModuleRegistry, ClientSideRowModelApiModule,
  ColumnAutoSizeModule, PinnedRowModule, themeBalham, NumberEditorModule
} from 'ag-grid-community';
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import type { RowValueChangedEvent, CellEditingStoppedEvent, IRowNode } from "ag-grid-community";


ModuleRegistry.registerModules([
  TextEditorModule, ClientSideRowModelApiModule, ColumnAutoSizeModule, PinnedRowModule,
  NumberEditorModule
]);

const tableList = ["middel_cluster", "middle_dbconn", "middle_tns_name", "middle_dbinfo"];

// 還是要每個table都定義好欄位
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


const CentralPanel: React.FC = () => {
  const gridRef = useRef<AgGridReactType<any>>(null);
  const isEditMode = useRef<boolean>(false); // flag避免因editType={"fullRow"}而進入多次onCellEditing functions
  
  const [currentTable, setCurrentTable] = useState<string>("middel_cluster");
  const [rowData, setRowData] = useState<Product[]>([]);
  const [columnDefs, setColumnDefs] = useState<any[]>([]);

  const getDBCentralTable = async () => {
    const res = await fetch(`http://127.0.0.1:8000/product_config_table?cluster_id=just_for_test`);
    const json = await res.json();
    console.log("get central table api data: ", json);
    const data = json.data;
    setRowData(data);

    if (data.length > 0) {
      // 動態生成欄位
      const columns = Object.keys(data[0]).map((key) => ({
        headerName: key.toUpperCase(),
        field: key,
        sortable: true,
        filter: true,
      }));

      columns.unshift(noActionColumn);
      columns.unshift(actionColumn);
      setColumnDefs(columns);
    }
  }

  const actionColumn = {
      field: 'action',
      headerName: '',
      pinned: 'left',
      width: 100,
      editable: false,
      sortable: false,
      filter: false,
      cellRenderer: CentralActionButton,
      cellRendererParams: {
        gridRef: gridRef,
        getDBCentralTable: getDBCentralTable
      },
  };

  const noActionColumn = { 
    field: 'no_action', 
    headerName: '', 
    width: 100, 
    editable: false, 
    sortable: false,
    filter: false,
    pinned: 'left',
    hide: true
  };

  useEffect(() => {
    getDBCentralTable();
  }, [currentTable]);

  const onGridReady = () => {
    // 初始隱藏 no_action 欄位
    console.log("初始隱藏 no_action 欄位");
    gridRef.current!.api.setColumnsVisible(['no_action'], false);
  };

  // 進入新資料編輯模式
  const addNewRow = () => {
    const newRow: Product = { 
      cluster_id: 0,
      dbconn_id: "",
      type: "",
      asdfa: "",
      bsdfa: "",
      csdfa: "",
      dsdfa: "",
      esdfa: "",
      fsdfa: ""
     };

    const res = gridRef.current!.api.applyTransaction({ add: [newRow] });
    if (res!.add) {
      // focus在最新一筆上面
      gridRef.current!.api.setFocusedCell(rowData.length, "cluster_id");
      gridRef.current!.api.startEditingCell({
        rowIndex: rowData.length,
        colKey: "cluster_id",
      });
    }
  };

  const onCellEditingStarted = () => {
    if (isEditMode.current === false) {
      console.log("cell editing started");
      isEditMode.current = true;

      // 進入編輯模式時，隱藏 action 欄位(禁止重複點擊編輯或刪除)，顯示 no_action 欄位防止後續欄位位移)
      gridRef.current?.api.setColumnsVisible(['action'], false);
      gridRef.current?.api.setColumnsVisible(['no_action'], true);
    }
  }

  const onCellEditingStopped = (event: CellEditingStoppedEvent) => {
    if (isEditMode.current === true) {
      console.log("onCellEditingStopped");
      isEditMode.current = false;

      // if (isNewRow(event.node)) {
      //   if (columnFormatCheck(event.data)) {
      //     // 新增一筆 insert database
      //     // get latest data
      //     getDBSettingTable();
      //     console.log("新增一筆");
      //   }
      // }

      gridRef.current?.api.setColumnsVisible(['action'], true);
      gridRef.current?.api.setColumnsVisible(['no_action'], false);
    }
  }

  const onRowChanged = (event: RowValueChangedEvent) => {
    console.log("row change", event);
  }

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
        <div style={{ height: 300, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            key={currentTable}  // 當 currentTable 改變時，重新掛載 AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            theme={themeBalham}
            editType={"fullRow"}
            defaultColDef={{ resizable: true, sortable: true, filter: true, editable: true }}
            stopEditingWhenCellsLoseFocus={true}  // 離開 cell 就結束編輯
            onCellEditingStarted={onCellEditingStarted}
            onCellEditingStopped={onCellEditingStopped}
            onGridReady={onGridReady}
            onRowValueChanged={onRowChanged}
            
          />
        </div>
        <button onClick={addNewRow} style={{ marginTop: 10 }}>新增資料</button>
      </div>
    </div>
  );
};

export default CentralPanel;
