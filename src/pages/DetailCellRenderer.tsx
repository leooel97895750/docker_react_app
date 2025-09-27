import React, { useState, ChangeEvent } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Card } from 'antd';

// props 的型別用 ICellRendererParams，裡面有 data, node, api…
export default function DetailCellRenderer(props: ICellRendererParams) {
  const [formState, setFormState] = useState({
    setting1: '',
    setting2: '',
    setting3: '',
    setting4: '',
    setting5: '',
    setting6: '',
    setting7: '',
    setting8: '',
    setting9: '',
    setting10: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleExecute = () => {
    // 這裡呼叫 API 或做你要的事
    console.log('Execute settings for row', props.data, formState);
    // props.node.setExpanded(false); // 如果要自動收合
  };

  return (
    <div style={{ padding: 5, backgroundColor: '#c9e0ffff' }}>
    <Card title="設定Setting" style={{ height: 300, margin: 5 }}>

      <button style={{ marginTop: 12 }} onClick={handleExecute}>
        Execute
      </button>
    </Card>
    </div>
  );
}
