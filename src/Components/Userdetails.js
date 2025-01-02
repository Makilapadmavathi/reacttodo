import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import {  ArrowLeftCircleFill} from 'react-bootstrap-icons';
import ExcelExport from './Excelfile';
const customStyles = {
  headRow: {
    style: { backgroundColor: "white", color: "black" }
  },
  headCells: {
    style: {  fontSize: "16px", fontWeight: "300", textTransform: "uppercase"}
  },
  Cells: {
    style: { fontSize: "16px" }
  },
};
function Userdetails() {
  const column = [
    {
      name: "S.No",
      selector: row => row.employeeId,
      sortable: true
    },
    {
      name: "employeeName",
      selector: row => row.employeeName,
      sortable: true
    },
    {
      name: "mobile",
      selector: row => row.mobile,
      sortable: true
    },
    {
        name: " userName",
        selector: row => row.userName,
        sortable: true
      },
      {
        name: " password",
        selector: row => row.password,
        sortable: true
      },
  ];
  const [records, setRecords] = useState([]);
  const [filterRecords, setfilterRecords] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      axios.get('http://catodotest.elevadosoftwares.com/Employee/GetAllEmployeeDetails')
        .then(res => {
          setRecords(res.data.employeeList);
          setfilterRecords(res.data.employeeList);
        })
        .catch(err => console.log(err));
    }
    fetchData();
  }, []);
  const handlefilter = (e) => {
    const newData = filterRecords.filter((row) => {
      return Object.values(row).join('').toLowerCase().includes(e.target.value.toLowerCase())
    });
    setRecords(newData);
  }
  const exportData = records.map((record) => ({
    employeeId: record.employeeId,
            employeeName: record.employeeName,
            mobile: record.mobile,
            userName: record.userName,
            password: record.password,
            confirmPassword: record.confirmPassword,
            createdBy: record.createdBy,
  }));
return (
    <div className='container-allmaster' style={{ backgroundColor: "secondary" }}>
      <div>
          <p className='heading'>User Details</p>
        </div>
      <div style={{ display: 'flex', justifyContent: 'left' }}>
      </div>
      
      <DataTable
        columns={column}
        data={records}
        customStyles={customStyles}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 20]}
        selectableRows
        fixedHeader
        selectableRowsHighlight
        highlightOnHover
        actions={
        <div>
       <ExcelExport data={exportData} fileName="Userdetails" />&nbsp;&nbsp;
          <Link to='/dashboard'>
          <Button variant="outline-danger"><ArrowLeftCircleFill/>Back</Button>{' '}</Link>
        </div>
                  }        
        subHeader
        subHeaderComponent={
          <input type='text' className='w-25 form-control' placeholder='Search' onChange={handlefilter}></input>
        }
        subHeaderAlign='right'
      >
      </DataTable>
    </div>
  );
}
export default Userdetails;