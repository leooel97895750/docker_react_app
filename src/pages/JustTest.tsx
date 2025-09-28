import React, { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ColumnResizedEvent, GridApi } from "ag-grid-community";
import { themeBalham } from "ag-grid-community";

interface RowData {
  name: string;
  age: number;
}

const columnDefs: ColDef[] = [
  { field: "name", resizable: true },
  { field: "age", resizable: true },
];

const rowData: RowData[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 22 },
];

const JustTest: React.FC = () => {
  const gridApi1 = useRef<GridApi | null>(null);
  const gridApi2 = useRef<GridApi | null>(null);

  const onGridReady1 = (params: any) => {
    gridApi1.current = params.api;
  };

  const onGridReady2 = (params: any) => {
    gridApi2.current = params.api;
  };

  const onColumnResized = (params: ColumnResizedEvent) => {
    //console.log(params.columns);
    
  };

  return (
    <div>
      <h3>Grid 1</h3>
      <div style={{ height: 200, width: 400 }}>
        <AgGridReact<RowData>
          rowData={rowData}
          columnDefs={columnDefs}
          theme={themeBalham}
          defaultColDef={{ flex: 1 }}
          onGridReady={onGridReady1}
          onColumnResized={onColumnResized}
        />
      </div>

      <h3>Grid 2</h3>
      <div style={{ height: 200, width: 400, marginTop: 20 }}>
        <AgGridReact<RowData>
          rowData={rowData}
          columnDefs={columnDefs}
          theme={themeBalham}
          defaultColDef={{ flex: 1 }}
          onGridReady={onGridReady2}
        />
      </div>
    </div>
  );
};

export default JustTest;
