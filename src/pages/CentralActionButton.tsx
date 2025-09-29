import React, { useState, useRef, useEffect, useCallback } from 'react';

import { Modal } from 'antd';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';

import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import { ICellRendererParams } from 'ag-grid-community';


type CentralActionButtonProps = {
  gridRef: React.RefObject<AgGridReactType<any>>;
  getDBCentralTable: () => void;

} & ICellRendererParams;


const CentralActionButton: React.FC<CentralActionButtonProps> = (props) => {
  const [modal, contextHolder] = Modal.useModal();


  // 進入編輯模式
  const handleEdit = () => {
    console.log("handleEdit", props);

    props.gridRef.current!.api.setFocusedCell(props.node.rowIndex!, "cluster_id");
    props.gridRef.current!.api.startEditingCell({
      rowIndex: props.node.rowIndex!,
      colKey: "cluster_id",
    });
  };


  // 刪除該列
  const handleDelete = () => {
    console.log("handleDelete", props);

    modal.confirm({
      title: '確定刪除這列資料嗎？',
      content: (
        <div>比對結果</div>
      ),
      okText: '確定刪除',
      cancelText: '取消',
      onOk() {
        console.log("刪除資料");
        // 更新資料
        props.getDBCentralTable();

      }
    });
  };

  return (
    <>
      {contextHolder}
      <div>
        <button>
          <EditOutlined onClick={handleEdit} style={{ fontSize: 16 }} />
        </button>
        <button>
          <DeleteOutlined onClick={handleDelete} style={{ fontSize: 16 }} />
        </button>
      </div>
    </>
  );
};

export default CentralActionButton;