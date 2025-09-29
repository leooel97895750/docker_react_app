import React, { useState, useRef, useEffect, useCallback } from 'react';
import ActionButton from './ActionButton';
import { Card, Button, Space, message, Modal } from 'antd';
import { AgGridReact } from "ag-grid-react";
import { 
  ICellRendererParams, TextEditorModule, ModuleRegistry, ClientSideRowModelApiModule,
  ColumnAutoSizeModule, PinnedRowModule, themeBalham
} from 'ag-grid-community';
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import type { RowValueChangedEvent, CellEditingStoppedEvent, IRowNode } from "ag-grid-community";


ModuleRegistry.registerModules([TextEditorModule, ClientSideRowModelApiModule, ColumnAutoSizeModule, PinnedRowModule]);

type Setting = {
  setting: string,
  value: string,
};


// props 的型別用 ICellRendererParams，裡面有 data, node, api…
export default function SettingPanel(props: ICellRendererParams) {
  
  const [modal, contextHolder] = Modal.useModal();
  const [msgApi, msgContextHolder] = message.useMessage();

  const originalSettingRef = useRef<Setting[]>([]);
  const gridRef = useRef<AgGridReactType<any>>(null);
  const isEditMode = useRef<boolean>(false); // flag避免因editType={"fullRow"}而進入多次onCellEditing functions

  const getDBSettingTable = async () => {
    const res = await fetch(`http://127.0.0.1:8000/setting?cluster_id=${props.data.name}&dbconn_id=${props.data.type}`);
    const json = await res.json();
    console.log("get setting table api data: ", json);
    const data = json.data;
    setRowData(data);
    originalSettingRef.current = JSON.parse(JSON.stringify(data));; // deep copy 儲存原始資料以便還原
  }

  const [rowData, setRowData] = useState<Setting[]>([]);
  const [columnDefs, setColumnDefs] = useState<any[]>([
    {
      field: 'action',
      headerName: '',
      pinned: 'left',
      width: 100,
      sortable: false,
      filter: false,
      editable: false,
      cellRenderer: ActionButton,
      cellRendererParams: {
        gridRef: gridRef,
        getDBSettingTable: getDBSettingTable
      },
    },
    { field: 'no_action', headerName: '', width: 100, editable: false, pinned: 'left'},
    { field: 'setting', headerName: 'Setting', editable: true },
    { field: 'value', headerName: 'Value', editable: true },
  ]);


  useEffect(() => {
    getDBSettingTable();
  }, [props.data]);


  const onGridReady = () => {
    // 初始隱藏 no_action 欄位
    gridRef.current?.api.setColumnsVisible(['no_action'], false);
  };


  // 進入新資料編輯模式
  const addNewRow = () => {
    const newRow: Setting = { setting: "", value: "" };

    const res = gridRef.current!.api.applyTransaction({ add: [newRow] });
    if (res!.add) {
      // focus在最新一筆上面
      gridRef.current!.api.setFocusedCell(rowData.length, "setting");
      gridRef.current!.api.startEditingCell({
        rowIndex: rowData.length,
        colKey: "setting",
      });
    }
  };


  const isNewRow = (node: IRowNode) => {
    if (node.rowIndex! > (originalSettingRef.current.length - 1)) return true;
    else return false;
  }


  const columnFormatCheck = (data: { [key: string]: any }) => {
    let isFormatCheckPass = true;
    const messages: string[] = [];

    for (const key of Object.keys(data)) {
      if (data[key] === "" || data[key] === null) {
        isFormatCheckPass = false;
        messages.push("不允許 " + key + " 欄位是空白，取消此次修改");
      }
    }

    if (isFormatCheckPass == false) {
      const original = JSON.parse(JSON.stringify(originalSettingRef.current));
      setRowData(original);

      modal.confirm({
        content: (
          <div>
            {messages.map((m, i) => (<p key={i}>{m}</p>))}
          </div>
        ),
        okText: '確定',
      });
    }
    return isFormatCheckPass ? true : false;
  }


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

      if (isNewRow(event.node)) {
        if (columnFormatCheck(event.data)) {
          // 新增一筆 insert database
          // get latest data
          getDBSettingTable();
          console.log("新增一筆");
        }
      }

      gridRef.current?.api.setColumnsVisible(['action'], true);
      gridRef.current?.api.setColumnsVisible(['no_action'], false);
    }
  }


  const onRowChanged = (event: RowValueChangedEvent) => {
    console.log("row change", props.data, event);

    // 先檢查是update還是insert
    if (isNewRow(event.node)) return;
    if (!columnFormatCheck(event.data)) return;
    
    const data = event.data;
    const currentRowIndex = event.node.rowIndex;
    const originalData = originalSettingRef.current[currentRowIndex!];

    // 比對有改動到的資料
    let modifiedData : { [key: string]: any } = {};
    (Object.keys(data) as (keyof Setting)[]).forEach((key) => {
      if (data[key] !== originalData[key]) {
        modifiedData[key] = data[key];
      }
    });

    // 要送給後端的資料
    console.log(modifiedData);

    modal.confirm({
      title: '確定要送出所有修改嗎？',
      content: (
        <div>比對結果</div>
      ),
      okText: '確定送出',
      cancelText: '取消',
      onOk() {
        console.log("送出資料");
        // 更新資料
        getDBSettingTable();
      },
      onCancel() {
        // deep copy
        const original = JSON.parse(JSON.stringify(originalSettingRef.current));
        setRowData(original);
      }
    });
  };


  return (
    <>
      {msgContextHolder}
      {contextHolder}
      <div style={{ padding: 5, backgroundColor: '#c9e0ffff' }}>
        <Card style={{ height: 400, margin: 5, paddingLeft: 50 }} >
          MIDDLE_SETTING_BT
          <div style={{ width: 500, height: 250 }}>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              theme={themeBalham}
              editType={"fullRow"}
              defaultColDef={{ resizable: true, sortable: false, filter: false, editable: true }}
              stopEditingWhenCellsLoseFocus={true}  // 離開 cell 就結束編輯
              onCellEditingStarted={onCellEditingStarted}
              onCellEditingStopped={onCellEditingStopped}
              onGridReady={onGridReady}
              onRowValueChanged={onRowChanged}
            />
          </div>
          <button onClick={addNewRow}>新增資料</button>
        </Card>
      </div>
    </>
  );
}
