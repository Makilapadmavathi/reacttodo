import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Search,EyeFill } from "react-bootstrap-icons";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ExcelExport from "./Excelfile";
function TaskDetails() {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);

  // const TaskStatus = queryParams.get('TaskStatus');
  
  const [records, setRecords] = useState([]);
  const [filterRecords, setfilterRecords] = useState([]);
  const EmpId1 = useParams();
  const [Taskdata,setData]=useState({
    fromDate:"",
    toDate:"",
  })  
  const handleInput = (e) => {
    setData({ ...Taskdata, [e.target.name]: e.target.value });
  };
  // console.log(editid.TaskStatus)
// console.log(TaskStatus);
  const LoadEmpWiseData = () => {
    const fetchData = async () => {
      const data = {
        fromDate:"",
        toDate:"",
        status: EmpId1.TaskStatus,
      };
      axios
        .post(
          "http://catodotest.elevadosoftwares.com/Allocation/GetAllAllocationDetailsByStatus",
          data
        )

        .then((res) => {
          setRecords(res.data.allocationDtlsByStatus);
          setfilterRecords(res.data.allocationDtlsByStatus);
          console.log(res);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  };
  useEffect(() => {
    LoadEmpWiseData();
  }, []);
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
  const column = [
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
    {
      name: "Action",
      cell: row => (
        <div >      
        <EyeFill  onClick={() =>handleviewEdit(row.allocationId)} style={{color:"blue"}}/>     
    </div>       
      )
    }
  ];
  const navigate = useNavigate();
  const handleSearch = () => {
    const fetchData = async () => {
      const data = {
        fromDate: Taskdata.fromDate,
        toDate: Taskdata.toDate,
        status: EmpId1.TaskStatus,     
      };
      console.log(data)
      try {
        const response = await axios.post(
          "http://catodotest.elevadosoftwares.com/Allocation/GetAllAllocationDetailsByStatus",
          data
        );
        const allocationList = response.data.allocationDtlsByStatus;
        setRecords(allocationList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();  
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
  const handleviewEdit = (val) => {
    let key ="View";
    const Id=val;
    const editt='/taskallocadd/'+Id+'/'+key;
    console.log(editt);
    navigate(editt);   
  }
 
    const exportData = records.map((re) => ({
      employeeName: re.employeeName,
      yetToStartTasks: re.yetToStartTasks,
      inProgressTasks: re.inProgressTasks,
      completedTasks: re.completedTasks,
      inCompletedTasks: re.inCompletedTasks,
    }));

  return (
    <div className='container-allmaster'>
      <br />
      <div>
        <p className="heading">Task Details </p>
      </div>
      <Form className="label">
        <Row className="mb-3">
          <Form.Group as={Col} md="2" controlId="duedate">
            <Form.Label>Scheduled From Date</Form.Label>
            <Form.Control type="date" name="fromDate"  value={Taskdata.fromDate} onChange={handleInput} />
          </Form.Group>
          <Form.Group as={Col} md="2" controlId="duedate">
            <Form.Label>To Date</Form.Label>
            <Form.Control type="date" name="toDate" value={Taskdata.toDate} onChange={handleInput}  />
          </Form.Group>

          <Form.Group as={Col} md="6">
            <div className="mt-4">
              <Button variant="outline-danger" onClick={handleSearch}>
                <Search />
                Search
              </Button>{" "}
              <ExcelExport data={exportData} fileName="Taskdetails" />&nbsp;&nbsp;
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
export default TaskDetails;
