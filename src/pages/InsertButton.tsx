import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import type {
  RowValueChangedEvent,
} from "ag-grid-community";
import { Modal } from 'antd';
import { Card, Button, Space, message } from 'antd';

import { AgGridReact } from "ag-grid-react";
import { themeBalham } from "ag-grid-community";



const InsertButton: React.FC = () => {

  const [modal, contextHolder] = Modal.useModal();


  // 新增一列
  const handleInsert = () => {
    modal.confirm({
      title: '確定要新增一筆嗎？',
      content: (
        <div>比對結果</div>
      ),
      okText: '確定新增',
      cancelText: '取消',
      onOk() {
        console.log("送出資料");
        // 更新資料
      },
      onCancel() {
        // deep copy
      }
    });
  };

  return (
    <>
      {contextHolder}
      <div style={{ marginTop: 10 }}>
        <div style={{ width: 500, height: 250 }}>
          
        </div>
      </div>
    </>
    
  );
};

export default InsertButton;