import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { TextEditorModule } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { CellClassParams } from 'ag-grid-community';
import { ClientSideRowModelApiModule } from 'ag-grid-community'; 
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import { Card, Button, Space, message } from 'antd';
import { Modal } from 'antd';


import { AgGridReact } from "ag-grid-react";
import { themeBalham } from "ag-grid-community";

import './DetailCellRenderer.css';


ModuleRegistry.registerModules([TextEditorModule, ClientSideRowModelApiModule]);

type Setting = {
  setting: string,
  value: string
};

// props 的型別用 ICellRendererParams，裡面有 data, node, api…
export default function DetailCellRenderer(props: ICellRendererParams) {
  const gridRef = useRef<AgGridReactType<Setting>>(null);

  console.log("DetailCellRenderer props", props);

  const [modal, contextHolder] = Modal.useModal();
  const [msgApi, msgContextHolder] = message.useMessage();

  const [rowData, setRowData] = useState<Setting[]>([]);
  const originalSettingRef = useRef<Setting[]>([]);

  const [columnDefs, setColumnDefs] = useState<any[]>([
    { field: 'setting', headerName: 'Setting', editable: false },
    {
      field: 'value', headerName: 'Value (點選欄位修改數值)', editable: true,
      cellClassRules: {
        'cell-modified': (params: CellClassParams) => {
          console.log("cellClassRules params", params);
          const orig = originalSettingRef.current.find((d) => d.setting === params.data.setting);
          console.log(originalSettingRef.current);
          console.log('orig', orig?.value, 'current', params.value);
          return orig?.value !== params.value; // 不同就加 class
        }
      }
    },
  ]);

  const isGetInitialData = useRef(false);


  useEffect(() => {
    console.log("cell renderer useEffect");
    if (isGetInitialData.current === false) {
      isGetInitialData.current = true;

      async function fetchData() {
        const res = await fetch(`http://127.0.0.1:8000/setting?cluster_id=${props.data.name}&dbconn_id=${props.data.type}`);
        const json = await res.json();
        console.log("cell fetch data", json);
        const data = json.data;
        setRowData(data);
        originalSettingRef.current = JSON.parse(JSON.stringify(data));; // deep copy 儲存原始資料以便還原
      }
      fetchData();
      console.log("cell get api");
    }
  }, [props.data]);


  const handleCancel = () => {
    // 原始資料
    console.log(originalSettingRef.current);
    // 目前資料
    console.log(rowData);

    let isChanged = false;
    for (let i = 0; i < rowData.length; i++) {
      if (rowData[i].value !== originalSettingRef.current[i].value) {
        isChanged = true;
        break;
      }
    }

    if (isChanged === false) {
      msgApi.info('目前沒有任何修改');
      return;
    }
    else {
      modal.confirm({
        title: '確定要取消之前的所有修改嗎？',
        content: '取消後欄位會還原到初始值',
        okText: '確定取消',
        cancelText: '不要',
        onOk() {
          // deep copy
          const original = JSON.parse(JSON.stringify(originalSettingRef.current));
          setRowData(original);
        }
      });
    }
  }

  const handleSubmit = () => {
    // 原始資料
    console.log(originalSettingRef.current);
    // 目前資料
    console.log(rowData);

    let isChanged = false;
    let changedList: Setting[] = [];
    for (let i = 0; i < rowData.length; i++) {
      if (rowData[i].value !== originalSettingRef.current[i].value) {
        isChanged = true;
        changedList.push(rowData[i]);
      }
    }

    if (isChanged === false) {
      msgApi.info('目前沒有任何修改');
      return;
    }
    else {
      modal.confirm({
        title: '確定要送出修改嗎？',
        content: `送出後會更新 ${changedList.length} 筆資料`,
        okText: '確定送出',
        cancelText: '不要',
        onOk() {
          // 送出 changedList，呼叫update API
          console.log("送出 changedList", changedList);
        }
      });
    }
  }

  const addNewRow = useCallback(() => {
    const newRow = { setting: "abc", value: "2" }; // 預設空值
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.applyTransaction({ add: [newRow] });
    }
  }, []);

  return (
    <>
      {msgContextHolder}
      {contextHolder}
      <div style={{ padding: 5, backgroundColor: '#c9e0ffff' }}>
        <Card title="設定Setting" style={{ height: 300, margin: 5 }}>

          <div style={{ display: 'flex', height: 200, width: 'auto' }}>
            <div style={{ width: 400, height: 200 }}>
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                theme={themeBalham}
                defaultColDef={{ resizable: true, sortable: false, filter: false, editable: true }}
                stopEditingWhenCellsLoseFocus={true}  // 離開 cell 就結束編輯
              />
            </div>
            <div style={{ display: 'flex', marginLeft: 10, marginTop: 'auto' }}>
              <Space>
                <Button onClick={handleCancel}>取消修改</Button>
                <Button onClick={handleSubmit} type="primary">送出修改</Button>
              </Space>
            </div>
            <button
              onClick={addNewRow}
              style={{
                position: "absolute",
                right: "10px",
                bottom: "10px",
                backgroundColor: "#ccc", // 灰色
                color: "#333",
                padding: "8px 12px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              ➕ 新增
            </button>
          </div>

        </Card>
      </div>
    </>
  );
}
