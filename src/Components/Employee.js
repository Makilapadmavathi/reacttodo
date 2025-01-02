import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';
import { Plus, ArrowLeftCircleFill } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import ExcelExport from './Excelfile';
import Sweetalerttododelete from './Sweetalerttododelete';
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

function Employee() {

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
      name: "Action",
      cell: row => (
        <div >
        
        <BiEdit onClick={() => handleEdit(row.employeeId)} style={{ color: "green" }} /> &nbsp; &nbsp;
        <RiDeleteBin6Line onClick={() => handledeleteemployee(row.employeeId)} style={{ color: "red" }}/>

    </div>
        
      )
    }
  ];

  
  const [employeeDel, setEmployeeDel] = useState({
    id: '',
    remarks: '',
    createdby: ''
})
const [isDeleteAlertVisible, setDeleteAlertVisibility] = useState(false);
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [filterRecords, setfilterRecords] = useState([]);
  const [search, setSearch] = useState([]);
  const [employee, setEmployee] = useState({
    employeeId:'',
    employeeName:'',
    mobile:'',
    userName:'',
    password:'',
    confirmPassword:'',
    createdBy:''

})



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
  const handledeleteemployee=(val)=>
  {
    // setDeleteAlertVisibility(true);
    setEmployeeDel({ ...employeeDel, id:val });
     handleDelete();
    
  }

  const handleDelete = () => {
    //  clientDel.id=val;
      const data = {
          employeeId: employeeDel.id,
          removedRemarks: employeeDel.remarks,
          createdBy: 1,
      };
  // console.log(data);
      axios
          .post('http://catodotest.elevadosoftwares.com/Employee//RemoveEmployee', data )
          .then((res) => {
            Swal.fire({
              title: '<h1>Are you sure? </h1><br/>want to Delete?',
              showCancelButton: true,
              confirmButtonText: 'Delete',
            }).then((result) => 
            {
              if (result.isConfirmed) {
              Swal.fire({
                title: 'Remarks',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'yes',               
              })}
              else if (result.isDenied) {
                  Swal.fire('Datas are not Deleted', '', 'info')
                }
            }
            )
            // <Sweetalerttododelete isVisible={isDeleteAlertVisible} toggleVisibility={setDeleteAlertVisibility} />
              navigate('/employee');
                         
          })
          .catch((error) => {
              console.error("API request failed", error);
          }); 
  }
  const handleEdit = (val) => {
  
    const Id=val;
    const edit='/employeeadd/'+Id;
    console.log(edit);
    navigate(edit);
    
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
    <div className='container-allmaster' style={{ backgroundColor: "white" }}>
      <div>
          <p className='heading'>Employee Master</p>
        </div>
      <div style={{ display: 'flex', justifyContent: 'left' }}>
      </div>
      {/* <Sweetalerttododelete isVisible={isDeleteAlertVisible} toggleVisibility={setDeleteAlertVisibility} /> */}
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

          <Link to='/employeeadd'>
          <Button variant="outline-success"><Plus/>Add New</Button>{' '}</Link>
          <ExcelExport data={exportData} fileName="EmployeeMaster" />&nbsp;
          <Link to='/dashboard'>
          <Button variant="outline-danger"><ArrowLeftCircleFill/>Back</Button>{' '}</Link>
                             </div>        }        
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

export default Employee;
