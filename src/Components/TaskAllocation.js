import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Search,Plus, EyeFill,Trash3,PencilSquare} from 'react-bootstrap-icons';
import DataTable from "react-data-table-component";
import Sweetalerttododelete from './Sweetalerttododelete';
import Swal from "sweetalert2";
import ExcelExport from './Excelfile';
const customStyles = {
  headRow: {
    style: { backgroundColor: "white", color: "black" }
  },
  headCells: {
    style: {  fontSize: "16px", fontWeight: "200", textTransform: "uppercase"}
  },
  Cells: {
    style: { fontSize: "14px" }
  },
};
function TaskAllocation() {
  
  const [selectedValue, setSelectedValue] = useState('0');
  const [tasksearch, setasksearch] = useState({
    fromDate: "",
    toDate: "",
    status: "",
    EmpId: "",
  });
  const handleInput = (e) => {
    setasksearch({ ...tasksearch, [e.target.name]: e.target.value });
  };
  const clearSelection = () => {
    setSelectedValue('0'); 
  };
  const [records, setRecords] = useState([]); 
    const [filterRecords, setfilterRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); 
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchdata, setSearchdata]=useState(
  {
    fromDate: "2023-01-01",
    toDate: "2023-01-01",
    status: "Inprogress",
    employeeId: 1,
    pageNumber: 1,
    pageSize: 10,
    searchString: "",
})
  const column = [
    {
      name: "S.No",
      selector: row => row.allocationId,
      sortable: true
    },
    {
      name: "Assigned to",
      selector: row => row.employeeName,
      sortable: true
    },
    {
      name: "Client",
      selector: row => row.clientName,
      sortable: true
    },   
    {
        name: " Category",
        selector: row => row.category,
        sortable: true
      },
      {
        name: " Description",
        selector: row => row.description,
        sortable: true
      },
      {
        name: " Sheduled date",
        selector: row => row.scheduledDate,
        sortable: true
      },     
      {
        name: " Due date",
        selector: row => row.dueDate,
        sortable: true
      },      
      {
        name: " Status",
        selector: row => row.status,
        sortable: true
      },     
    {
      name: "Action",
      cell: row => (
        <div >
       <EyeFill onClick={() =>handleviewEdit(row.allocationId)}   style={{ color: "blue" }}/>&nbsp; &nbsp;
       <PencilSquare  onClick={() => handleEdit(row.allocationId)} style={{ color: "green" }}/>&nbsp; &nbsp;
        <Trash3 onClick={() => handledeletetaskalloc(row.allocationId)} style={{ color: "red" }}/>
    </div>       
      )
    }   
  ];
  const [isDeleteAlertVisible, setDeleteAlertVisibility] = useState(false);
  const navigate = useNavigate();  
  const [rec, setRec] = useState([]);
  const [tas, settas] = useState({
    fromDate: "",
    toDate: "",
    pageNumber: 1,
    pageSize:10,
    searchString: "",    
  });
  const [taskallocDel, setTaskAllocDel] = useState({
    allocationId: " ",
    removedRemarks: "Test",
    createdBy: 1
})
  useEffect(() => {
    const fetchData = async () => {
      const datas={
        fromDate: tas.fromDate,
        toDate:tas.toDate,
        pageNumber:tas.pageNumber,
        pageSize:tas.pageSize,
        searchString:tas.searchString,
      }
      console.log(datas)
      try {
        const response = await axios.post('http://catodotest.elevadosoftwares.com/Allocation/GetAllAllocationDetails',datas);
       console.log(response)
        const allocationList = response.data.allocationList;
        setRecords(allocationList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://catodotest.elevadosoftwares.com/Allocation/GetAllAllocationDetails', {
        fromDate: "2023-01-01",
        toDate: "2023-11-01",
        pageNumber: currentPage,
        pageSize,
        searchString: "",
      });

      const allocationList = response.data.allocationList;
      setRecords(prevRecords => [...prevRecords, ...allocationList]);
      console.log(records)
      if (allocationList.length < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchDataemployee = async () => {
      try {
        const response = await axios.get('http://catodotest.elevadosoftwares.com/Employee/GetAllEmployeeDetails');
        const employeeList = response.data.employeeList;
        setRec(employeeList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataemployee();
  }, []);
  const handleAdd = () => {  
    let key ="Add";
  let queryParameters = new URLSearchParams({
 key:key,
  });
console.log(key);
  let editt = `/taskallocadd?${queryParameters.toString()}`;
  navigate(editt);   
}
  const handleEdit = (val) => { 
    let key ="Edit";
  const Id=val;
  let queryParameters = new URLSearchParams({
    Id:Id,
 key:key,
  });
console.log(key);
  let editt = `/taskallocadd?${queryParameters.toString()}`;
  navigate(editt);   
}
const handleviewEdit = (val) => {
  let key ="View";
  const Id=val;
  const queryParameters = new URLSearchParams({
    Id: Id,
    key: key,
  });
  const editt = `/taskallocadd?${queryParameters.toString()}`;
  console.log(editt)
  navigate(editt);
}
const handledeletetaskalloc=(val)=>
{
  setDeleteAlertVisibility(true);
  setTaskAllocDel({ ...taskallocDel, id:val });
   handleDelete();  
}

const handleDelete = () => {

    const data = {
      allocationId: taskallocDel.id,
      removedRemarks: taskallocDel.removedRemarks,
      createdBy:1,
    };
console.log(data);
    axios
        .post('http://catodotest.elevadosoftwares.com/Allocation/RemoveAllocation', data )
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
            navigate('/taskalloc');
                       
        })
        .catch((error) => {
            console.error("API request failed", error);
        }); 
}
const exportData = records.map((re) => ({
    allocationId: re.allocationId,
    employeeName:re.employeeName,
    ClientName: re.clientName,
    category: re.category,
    description: re.description,
    scheduledDate: re.scheduledDate,
    dueDate: re.dueDate,
    status: re.status,
  }));
const handleLoadMore = () => {
  if (!loading && hasMore) {
    setCurrentPage(currentPage + 1);
    fetchData();
  }
};
const handleSearch = () => {
  const fetchData = async () => {
    const data = {
      fromDate: tasksearch.fromDate,
      toDate: tasksearch.toDate,
      status: tasksearch.status,
      employeeId:  tasksearch.EmpId,
      pageNumber: 1,
      pageSize: 10,
      searchString: ""
    };
    console.log(data)
    try {
      const response = await axios.post(
        "http://catodotest.elevadosoftwares.com/Allocation/GetAllAllocationDetailsBySearch",
        data
      );
      const allocationList = response.data.allocationDtlsBySearch;
      setRecords(allocationList);
      console.log(response)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
};


  return (
    <div className='container-allmaster' style={{ backgroundColor: "white" }}>
      <br />
      <div>
        <p className='heading'>Task Allocation</p>
      </div>
      <Form className="label">
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="duedate">
            <Form.Label>Scheduled From Date</Form.Label>
            <Form.Control type="date" name="fromDate" value={tasksearch.fromDate} onChange={handleInput}/>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="duedate">
            <Form.Label>To Date</Form.Label>
            <Form.Control type="date" name="toDate" value={tasksearch.toDate} onChange={handleInput}/>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Status</Form.Label>
            <Form.Select aria-label="Status" name="status" value={tasksearch.status} onChange={handleInput}>
              <option value="0">Select</option>
              <option value="Yet to Start">Yet to Start</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>
          {/* <Form.Group as={Col} md="3">
            <Form.Label>Assigned To</Form.Label>
            <Form.Select aria-label="Employee" name="searchString" value={tasksearch.searchString} onChange={handleInput} placeholder="Employee">
              <option value="0">Employee</option>
              {rec.map((employee) => (
                <option key={employee.employeeId} value={employee.employeeId}>
                  {employee.employeeName}
                </option>
              ))}
            </Form.Select>
          </Form.Group> */}
           <Form.Group as={Col} md="3">
      <Form.Label>Assigned To</Form.Label>
      <Form.Select
        aria-label="Employee"
        name="EmpId"
        value={tasksearch.EmpId}
        onChange={handleInput}
       
      >
        <option value="0">Employee</option>
        {rec.map((employee) => (
          <option key={employee.employeeId} value={employee.employeeId}>
            {employee.employeeName}
          </option>
        ))}
      </Form.Select>
      
    </Form.Group>
          <Form.Group as={Col} md="6">
            <div className="mt-4">
              <Button variant="outline-danger" onClick={handleSearch}>
                <Search />
                Search
              </Button>{" "}
              
                <Button variant="outline-success" onClick={handleAdd}>
                  <Plus /> Add New
                </Button>{" "} &nbsp;&nbsp;             
                <ExcelExport data={exportData} fileName="Taskalloc" />
            </div>
          </Form.Group>
        </Row>
      </Form>
    <Form>
    {/* <Sweetalerttododelete isVisible={isDeleteAlertVisible} toggleVisibility={setDeleteAlertVisibility} /> */}
      <DataTable
        columns={column}
        data={records}
        customStyles={customStyles}
        // pagination
        // selectableRows
        fixedHeader
        selectableRowsHighlight
        highlightOnHover
        // paginationPerPage={5}
        // paginationRowsPerPageOptions={[5, 10, 20]}
        subHeader
        subHeaderAlign="right"      
      >        
      </DataTable>
    
{hasMore && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button variant="info" onClick={handleLoadMore} disabled={loading}>
              {loading ? 'Loading...' : 'Load more'}
            </Button>
          </div>
        )}
    </Form>
  </div>


  );
}

export default TaskAllocation;
