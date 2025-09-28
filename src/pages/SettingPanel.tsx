import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { TextEditorModule } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { CellClassParams } from 'ag-grid-community';
import { ClientSideRowModelApiModule } from 'ag-grid-community';
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import { Card, Button, Space, message } from 'antd';
import { Modal } from 'antd';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { GridOptions, ColDef, CellValueChangedEvent } from 'ag-grid-community';
import { ColumnAutoSizeModule } from 'ag-grid-community';
import { PinnedRowModule } from 'ag-grid-community';
import type {
  RowValueChangedEvent,
  CellEditingStoppedEvent,
  IRowNode,
} from "ag-grid-community";


import { AgGridReact } from "ag-grid-react";
import { themeBalham, GridApi } from "ag-grid-community";

import ActionButton from './ActionButton';
import InsertButton from './InsertButton';
import { on } from 'events';


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
        gridRef: gridRef
      },
    },
    { field: 'no_action', headerName: '', width: 100, editable: false, pinned: 'left'},
    { field: 'setting', headerName: 'Setting', editable: true },
    { field: 'value', headerName: 'Value', editable: true },
  ]);

  

  // 取得setting資料
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://127.0.0.1:8000/setting?cluster_id=${props.data.name}&dbconn_id=${props.data.type}`);
      const json = await res.json();
      console.log("get setting table api data: ", json);
      const data = json.data;
      setRowData(data);
      originalSettingRef.current = JSON.parse(JSON.stringify(data));; // deep copy 儲存原始資料以便還原
    }
    fetchData();
  }, [props.data]);

  const columnFormatCheck = (data: { [key: string]: any }) => {
    for (const key of Object.keys(data)) {
      if (data[key] === "") return false;
    }
    return true;
  }


  const onRowChanged = (event: RowValueChangedEvent) => {
    console.log("row change", props.data, event);

    // columnFormatCheck();

    // 先檢查是update還是insert
    if (isNewRow(event.node)) return;
    
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
      },
      onCancel() {
        // deep copy
        const original = JSON.parse(JSON.stringify(originalSettingRef.current));
        setRowData(original);
      }
    });

  };

  const onCellEditingStarted = () => {
    console.log("cell editing started");
    // 進入編輯模式時，隱藏 action 欄位(禁止重複點擊編輯或刪除)，顯示 no_action 欄位防止後續欄位位移)
    gridRef.current?.api.setColumnsVisible(['action'], false);
    gridRef.current?.api.setColumnsVisible(['no_action'], true);
  }

  const isNewRow = (node: IRowNode) => {
    if (node.rowIndex! > (originalSettingRef.current.length - 1)) return true;
    else return false;
  }

  const onCellEditingStopped = (event: CellEditingStoppedEvent) => {

    console.log("onCellEditingStopped");
    if (isNewRow(event.node)) {
      console.log("isNewRow");
      // 檢查有沒有不合法的值
      if (columnFormatCheck(event.data)) {
        // 新增一筆 insert database
        // get latest data
        console.log("新增一筆");
      }
      else {
        // 恢復如初
        console.log("恢復如初");
        msgApi.info('新增的資料有空白欄位，取消新增');
        const original = JSON.parse(JSON.stringify(originalSettingRef.current));
        setRowData(original);
      }
    }
    else {
      console.log("no isNewRow");
    }
    

    gridRef.current?.api.setColumnsVisible(['action'], true);
    gridRef.current?.api.setColumnsVisible(['no_action'], false);
  }

  const onGridReady = () => {
    // 初始隱藏 no_action 欄位
    gridRef.current?.api.setColumnsVisible(['no_action'], false);
  };

  // 進入新資料編輯模式
  const addNewRow = () => {
    const newRow: Setting = { setting: "", value: "" };

    const res = gridRef.current!.api.applyTransaction({ add: [newRow] });
    if (res!.add) {
      gridRef.current!.api.setFocusedCell(rowData.length, "setting");
      gridRef.current!.api.startEditingCell({
        rowIndex: rowData.length,
        colKey: "setting",
      });
    }

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
