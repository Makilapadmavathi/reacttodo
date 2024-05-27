import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Search} from 'react-bootstrap-icons';
import DataTable from "react-data-table-component";
import ExcelExport from './Excelfile';
function EmpwisetaskCount(){
    const [records, setRecords] = useState([]);
    const [filterRecords, setfilterRecords] = useState([]);
    const navigate = useNavigate();
    const [tasksearch, setasksearch] = useState({
      fromDate: "",
      toDate: "",
      
    });
    const handleInput = (e) => {
      setasksearch({ ...tasksearch, [e.target.name]: e.target.value });
    };


    const LoadEmpWiseData = () => {
        const fetchData = async () => {
            const data={
                 fromDate:"",
                toDate:"",

            }
          axios
            .post(
              "http://catodotest.elevadosoftwares.com/Allocation/GetEmpWiseTaskCounts",data
            )
            .then((res) => {
              setRecords(res.data.empWiseTaskCounts);
              setfilterRecords(res.data.empWiseTaskCounts);
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
          name: "Assigned To",
          selector: (row) =>row.employeeName,
       
          sortable: true,
        },
        {
          name: "Yet To Start",
          selector: (row) => 
          <Button className="rounded-circle" variant="info" onClick={() => handleYetToStart(row.employeeId)}>
          {row.yetToStartTasks}
      </Button> ,
          sortable: true,
        },
        {
            name: " In Progress",
            selector: (row) =>
            <Button className="rounded-circle" variant="warning" onClick={() => handleInProgress(row.employeeId)}>
            {row.inProgressTasks}
        </Button> ,
            sortable: true,
          },
    
        {
          name: " Completed",
          selector: (row) => 
          <Button className="rounded-circle" variant="success" onClick={() => handleCompleted(row.employeeId)}>
          {row.completedTasks}
      </Button> ,
          sortable: true,
        },
        {
            name: "In Completed",
            selector: (row) => 
            <Button className="rounded-circle" variant="danger" onClick={() => handleIncompleted(row.employeeId)}>
            {row.inCompletedTasks}
        </Button> ,
            sortable: true,
          },
         
    
        // {
        //   name: "Action",
        //   cell: (row) => (
        //     <div>
        //       <Button
        //         variant="outline-success"
        //         onClick={() => handleEdit(row.categoryId)}
        //       >
        //         <PencilSquare />
        //       </Button>{" "}
        //       &nbsp;
        //       <Button
        //         variant="outline-danger"
        //         onClick={() => handleModelFirst(row.categoryId)}
        //       >
        //         <Trash3 />
        //       </Button>{" "}
        //     </div>
        //   ),
        // },
      ];
      const handleYetToStart = (val) => {
  
        const EmpId=val;
        const TaskStatus="Yet to Start";
     const edit='/taskallocaddstatus/'+EmpId+'/'+TaskStatus;
        navigate(edit);
    // const url = `/taskallocaddstatus?EmployeeId=${EmpId}&TaskStatus=${encodeURIComponent(TaskStatus)}`;
    // navigate(url);
        
    }
    const handleInProgress = (val) => {
  
      const EmpId=val;
      const TaskStatus="In Progress";
   const edit='/taskallocaddstatus/'+EmpId+'/'+TaskStatus;
      navigate(edit);
  // const url = `/taskallocaddstatus?EmployeeId=${EmpId}&TaskStatus=${encodeURIComponent(TaskStatus)}`;
  // navigate(url);
      
  }
  const handleCompleted = (val) => {
  
    const EmpId=val;
    const TaskStatus="Completed";
 const edit='/taskallocaddstatus/'+EmpId+'/'+TaskStatus;
    navigate(edit);
// const url = `/taskallocaddstatus?EmployeeId=${EmpId}&TaskStatus=${encodeURIComponent(TaskStatus)}`;
//   navigate(url);
    
}
const handleIncompleted = (val) => {
  
    const EmpId=val;
    const TaskStatus="In Completed";
 const edit='/taskallocaddstatus/'+EmpId+'/'+TaskStatus;
    navigate(edit);
    // const url = `/taskallocaddstatus?EmployeeId=${EmpId}&TaskStatus=${encodeURIComponent(TaskStatus)}`;
    // navigate(url);
}
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
          yetToStartTasks:re.yetToStartTasks,
          inProgressTasks: re.inProgressTasks,
          completedTasks: re.completedTasks,
          inCompletedTasks: re.inCompletedTasks,
         
        }));
          
      const handleSearch = () => {
        const fetchData = async () => {
          const data = {
            fromDate: tasksearch.fromDate,
            toDate: tasksearch.toDate,
            // status: tasksearch.status,
            // employeeId: EmpId1.EmpId,
            // pageNumber: 1,
            // pageSize: 10,
            // searchString: "",
          };
          console.log(data);
          try {
            const response = await axios.post(
              "http://catodotest.elevadosoftwares.com/Allocation/GetEmpWiseTaskCounts",
              data
            );
            console.log(response);
            const allocationList = response.data.empWiseTaskCounts;
            setRecords(allocationList);
            console.log(allocationList)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      };
    return(
      <div className='container-allmaster' style={{ backgroundColor: "secondary" }}>
      <br />
      <div>
        <p className='heading'>Employee Wise Task Count</p>
      </div>
      <Form className='label'>
        <Row className="mb-2">
          <Form.Group as={Col} md="2" controlId="duedate">
            <Form.Label>Scheduled From Date</Form.Label>
            <Form.Control
              type="date"
              name="fromDate"
              value={tasksearch.fromDate}
              placeholder="Due date"
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group as={Col} md="2" controlId="duedate">
            <Form.Label>To Date</Form.Label>
            <Form.Control
              type="date"
              name="toDate"
              value={tasksearch.toDate}
              placeholder="Due date"
              onChange={handleInput}
            />
          </Form.Group>
      
          <Form.Group as={Col} md="6" >
            <div className='mt-4'>
            <Button  variant="outline-danger" onClick={handleSearch} ><Search/>Search</Button>{' '}
            <ExcelExport data={exportData} fileName="Empwisetaskcount" />
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
                  ></DataTable>
                </Form>
              </div>
        </div>
                

    );
}
export default EmpwisetaskCount;