import React, { useState, ChangeEvent } from 'react';
import { ICellRendererParams } from 'ag-grid-community';

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
    <div style={{ padding: 16, background: '#fafafa' }}>
      <h4>設定 {(props.data as any).name}</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
        {Object.keys(formState).map((key) => (
          <input
            key={key}
            name={key}
            value={(formState as any)[key]}
            onChange={handleChange}
            placeholder={key}
          />
        ))}
      </div>
      <button style={{ marginTop: 12 }} onClick={handleExecute}>
        Execute
      </button>
    </div>
  );
}
