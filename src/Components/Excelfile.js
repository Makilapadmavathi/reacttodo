import React from 'react';
import XLSX from 'sheetjs-style';
import * as FileSaver from 'file-saver';
import { Button } from 'react-bootstrap';
function ExcelExport({ data, fileName }) {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(blob, fileName + fileExtension);
  };

  return (
    <Button variant="outline-info" onClick={exportToExcel}>Excel   </Button>
  );
}

export default ExcelExport;

