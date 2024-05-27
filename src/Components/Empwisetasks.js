import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Search} from "react-bootstrap-icons";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ExcelExport from "./Excelfile";
function Empwisetasks() {
  const navigate=useNavigate();
  const [records, setRecords] = useState([]);
  const [filterRecords, setfilterRecords] = useState([]);
  const EmpId1 = useParams();
  console.log(EmpId1);
  let res = EmpId1.EmpId;
  console.log(res);
  let res1 = EmpId1.TaskStatus;
  console.log(res1);
  const [tasksearch, setasksearch] = useState({
    fromDate: "",
    toDate: "",
    status: "",
  });
  const handleInput = (e) => {
    setasksearch({ ...tasksearch, [e.target.name]: e.target.value });
  };

  const LoadEmpWiseData = () => {
    const fetchData = async () => {
      const data = {
        employeeId: res,
        fromDate: "2022-01-01",
        toDate: "2023-11-01",
        pageNumber: 1,
        pageSize: 10,
        searchString: "",
      };

      if(EmpId1.TaskStatus==="Yet to Start")
      {
      axios
        .post(
          "http://catodotest.elevadosoftwares.com/Allocation/GetYetToStartAllocationByEmpId",
          data
        )      
        .then((res) => {
          setRecords(res.data.yetToStartAllocation);
          setfilterRecords(res.data.yetToStartAllocation);
        })
        .catch((err) => console.log(err));
      }
      else if(EmpId1.TaskStatus==="In Progress")
      {
        axios
        .post(
          "http://catodotest.elevadosoftwares.com/Allocation/GetInProgressAllocationByEmpId",
          data
        )
      
        .then((res) => {
          setRecords(res.data.inProgressAllocation);
          setfilterRecords(res.data.inProgressAllocation);
        })
        .catch((err) => console.log(err));
        
      }
      else if(EmpId1.TaskStatus==="Completed")
      {
        axios
        .post(
          "http://catodotest.elevadosoftwares.com/Allocation/GetCompletedAllocationByEmpId",
          data
        )
      
        .then((res) => {
          setRecords(res.data.completedAllocation);
          setfilterRecords(res.data.completedAllocation);
        })
        .catch((err) => console.log(err));
        
      }
      else
      {
        axios
        .post(
          "http://catodotest.elevadosoftwares.com/Allocation/GetInCompletedAllocationByEmpId",
          data
        )
      
        .then((res) => {
          console.log(res);
          setRecords(res.data.incompletedAllocationById);
          setfilterRecords(res.data.incompletedAllocationById);
        })
        .catch((err) => console.log(err));       
      }       
    };
    fetchData();
  };
  useEffect(() => {
    LoadEmpWiseData();
  }, []);

  const [sts,setSts]=useState({
    status: "In Progress",
    fromDate: "2023-01-01",
    toDate: "2023-11-01"
})
const SearchbyStatus = () => {
  const fetchData = async () => {
    const data = {
      fromDate: sts.fromDate,
      toDate: sts.toDate,
      status: sts.status,
    };

    try {
      const response = await axios.post(
        "http://catodotest.elevadosoftwares.com/Allocation/GetAllAllocationDetailsByStatus",data
      );

console.log(data);
      console.log(response);

      if (response.data && response.data.allocationDtlsByStatus) {
        setRecords(response.data.allocationDtlsByStatus);
        setfilterRecords(response.data.allocationDtlsByStatus);
      } else {
        console.error("API response does not contain the expected data.");
      }
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };

  fetchData();
};


  const customStyles = {
    headRow: {
      style: { backgroundColor: "white", color: "black" },
    },
    headCells: {
      style: { fontSize: "16px", fontWeight: "300" },
    },
    Cells: {
      style: { fontSize: "16px" },
    },
  };
  const getColumns = (status) => {
    const columns = [
      {
        name: "S.No",
        cell: (row, index) => index + 1,
        sortable: true,
      },
      {
        name: "Client Name",
        selector: (row) => row.clientName,
        sortable: true,
      },
      {
        name: "Assigned To",
        selector: (row) => row.employeeName,
        sortable: true,
      },
      {
        name: "Category",
        selector: (row) => row.category,
        sortable: true,
      },
      {
        name: "Description",
        selector: (row) => row.description,
        sortable: true,
      },
      {
        name: "scheduled Date",
        selector: (row) => row.scheduledDate,
        sortable: true,
      },
      {
        name: "Duedate",
        selector: (row) => row.dueDate,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
      },
      // {
      //   name: "Action",
      //   cell: row => (
      //     <div >
         
      //     <Button variant="outline-primary" onClick={() =>handleviewEdit(row.allocationId)} ><EyeFill /></Button>{' '}
         
    
      // </div>
          
      //   )
      // }
    ];

    if (status === "In Progress"  ) {
      columns.push({
        name: "Update Status",
        cell: (row) => (
          <Button
            variant="info"
            onClick={() =>
              UpdateStatus(row.allocationId, row.employeeId, row.status)
            }
          >
            Update
          </Button>
        ),
      });
    }
    if (status === "Yet to Start" ) {
      columns.push({
        name: "Update Status",
        cell: (row) => (
          <Button
            variant="info"
            onClick={() =>
              UpdateStatus(row.allocationId, row.employeeId, row.status)
            }
          >
            Update
          </Button>
        ),
      });
    }
    if (status === "In Progress" ) {
      columns.push({
        name: "Undo Status",
        cell: (row) => (
          <Button
            variant="info"
            onClick={() =>
              UndoStatus(row.allocationId, row.employeeId, row.status)
            }
          >
            Undo
          </Button>
        ),
      });
    }
    if (status === "Completed" ) {
      columns.push({
        name: "Undo Status",
        cell: (row) => (
          <Button
            variant="info"
            onClick={() =>
              UndoStatus(row.allocationId, row.employeeId, row.status)
            }
          >
            Undo
          </Button>
        ),
      });
    }
    return columns;
  };
  const column = getColumns(res1); 
  const UpdateStatus = (allocId, EmployeeId,Stat) => {
    const data = {
        allocationId: allocId,
        employeeId: EmployeeId,
        status: Stat,
      };
      Swal.fire({
        title: "<h1>Are you sure? </h1><br/>want to Update Status?",
        showCancelButton: true,
        confirmButtonText: "Update",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
          .post(
            "http://catodotest.elevadosoftwares.com/Allocation/UpdateStatus",
            data
          )
          .then((res) => {
            Swal.fire("Status Updated!", "", "success");
            LoadEmpWiseData();
          });
        } else if (result.isDenied) {
          Swal.fire("Changes Not Updated", "", "info");
        }
      });      
  };
  const UndoStatus = (allocId, EmployeeId,Stat) => {
    const data = {
        allocationId: allocId,
        employeeId: EmployeeId,
        status: Stat,
      };
      Swal.fire({
        title: "<h1>Are you sure? </h1><br/>want to Undo Status?",
        showCancelButton: true,
        confirmButtonText: "Update",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
          .post(
            "http://catodotest.elevadosoftwares.com/Allocation/UndoUpdateStatus",
            data
          )
          .then((res) => {
            Swal.fire("Status reverted!", "", "success");
            LoadEmpWiseData();
          });
        } else if (result.isDenied) {
          Swal.fire("Changes Not Reverted", "", "info");
        }
      });      
  };
  const handlefilter = (e) => {
    const newData = filterRecords.filter((row) => {
      return Object.values(row)
        .join("")
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  };
  const exportData = records.map((re) => ({
    employeeName: re.employeeName,
    clientName:re.clientName,
    category: re.category,
    description: re.description,
    scheduledDate: re.scheduledDate,
    dueDate: re.dueDate,
    status: re.status,
  }));
const handleSearch = () => {
  const fetchData = async () => {
    const data = {
      fromDate: tasksearch.fromDate,
      toDate: tasksearch.toDate,
      status: tasksearch.status,
      employeeId: EmpId1.EmpId,
      pageNumber: 1,
      pageSize: 10,
      searchString: "",
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://catodotest.elevadosoftwares.com/Allocation/GetAllAllocationDetailsBySearch",
        data
      );
      const allocationList = response.data.allocationDtlsBySearch;
      setRecords(allocationList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
};
const handleviewEdit = (val) => {
  let key ="View";
  const Id=val;
  const editt='/taskallocadd/'+Id+'/'+key;
  console.log(editt);
  navigate(editt);  
}
  return (
    <div className='container-allmaster' style={{ backgroundColor: "white" }}>
      <br />
      <div>
        <p className="heading">Employee Wise Tasks</p>
      </div>
    
      <Form className="label">
        <Row className="mb-3">
          <Form.Group as={Col} md="2" controlId="duedate">
            <Form.Label>Scheduled From Date</Form.Label>
            <Form.Control
              type="date"
              name="fromDate"
              placeholder="Due date"
              value={tasksearch.fromDate}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group as={Col} md="2" controlId="duedate">
            <Form.Label>To Date</Form.Label>
            <Form.Control
              type="date"
              name="toDate"
              placeholder="Due date"
              value={tasksearch.toDate}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group as={Col} md="2">
            <Form.Label>Status</Form.Label>
            <Form.Select
              aria-label="Status"
              name="status"
              value={tasksearch.status}
              onChange={handleInput}
            >
              <option>Select</option>
              <option value="Yet to Start">Yet to Start</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="InCompleted">InCompleted</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <div className="mt-4">
              <Button variant="outline-danger" onClick={handleSearch}>
                <Search />
                Search
              </Button>{" "}
              <ExcelExport data={exportData} fileName="Empwisetasks" />
            </div>
          </Form.Group>
        </Row>
      </Form>
      <div>
        <Form>
          <DataTable
          
            columns={column}
            data={records}
            customStyles={customStyles}
            pagination
            // selectableRows
            fixedHeader
            defaultSortAsc={false}
            selectableRowsHighlight
            highlightOnHover
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50]}
            subHeader
            subHeaderComponent={
              <input
                type="text"
                className="w-25 form-control"
                placeholder="Search"
                onChange={handlefilter}
              ></input>
            }
            subHeaderAlign="right"
            scrollX
            scrollY
          ></DataTable>
        </Form>
      </div>
    </div>
  );
}
export default Empwisetasks;
