import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Form, InputGroup, Row, Col, Button } from "react-bootstrap";
import { CardList, Check, ArrowLeftCircleFill } from "react-bootstrap-icons";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { Link, useNavigate, useLocation } from 'react-router-dom';
function TaskAllocationAdd() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const Id = queryParams.get('Id');
  const key = queryParams.get('key');
  console.log('Id:', Id);
  console.log('key:', key);
  function LoadEdittaskallocById()
  {
    const fetchDataalloc = async () => {
      const dataid={
        allocationId: parseInt(Id)}
      axios
        .post(
          'http://catodotest.elevadosoftwares.com/Allocation/GetAllocationById',dataid)
        .then((res) => {       
           setRecor(res.data.allocationByIdList);
          let result =  (res.data.allocationByIdList);
           result.map(r => {
            settaskalloc({ ...taskalloc, allocationId: r.allocationId, clientId: r.clientId,
              categoryId: r.categoryId,employeeId:r.employeeId, description: r.description,scheduledDate:r.scheduledDate,dueDate:r.dueDate,
              status:r.status,startedDate:r.startedDate,completedDate:r.completedDate,uploadsPath:r.uploadsPath,
              createdBy:r.createdBy})
            });          
          setIsEditing(true);   
        })
        .catch((err) => console.log(err));
    };
    fetchDataalloc();
  }
 useEffect(() => {
if(key==="Add")
 {
  setText('Save');
 }else if(key==="Edit")
 {
  setText('Update');
  LoadEdittaskallocById();
 }else if (key==="View"){
  setText('')
  LoadEdittaskallocById();
}
  }, []);
  const [selectedFile, setSelectedFile] = useState();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');
  const [taskalloc, settaskalloc] = useState({
    allocationId: 0,
    clientId: "",
    categoryId: "",
    employeeId: "",
    description: "",
    scheduledDate:new Date().toISOString().substr(0, 10),
    dueDate: "",
    status: "",
    startedDate: "",
    completedDate: "",
    uploadsPath: "",
    createdBy: "",
  });
  const handleInput = (e) => {
    settaskalloc({ ...taskalloc, [e.target.name]: e.target.value });
  };
  const schema = yup.object().shape({
    clientId: yup.string().required("Client is Required"),
    categoryId: yup.string().required("Category is Required"),
    employeeId: yup.string().required("Employee is Required"),
    description: yup.string().required("Description is Required"),
    dueDate: yup.string().required("Date is Required"),
  });
  const [records, setRecords] = useState([]);
  const [rec, setRec] = useState([]);
  const [recs, setRecs] = useState([]);
   const [recor, setRecor] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://catodotest.elevadosoftwares.com//Client/GetAllClientDetails"
        );
        const clientList = response.data.clientList;
        setRecords(clientList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://catodotest.elevadosoftwares.com//Category/GetAllCategories"
        );
        const categoryList = res.data.categoryList;
        setRec(categoryList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://catodotest.elevadosoftwares.com/Employee/GetAllEmployeeDetails"
        );
        const employeeList = response.data.employeeList;
        setRecs(employeeList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleSubmit = () => {
    if (isEditing) {
      updateTask();
    } else {
      saveTask();
   }
  };     
  const saveTask = async () => {
    const createdbyname=sessionStorage.getItem("usernamesess");
    console.log(createdbyname)
    if(createdbyname==='Admin')
    {
       taskalloc.allocationId= 0;
    }
    const data = {
      allocationId : 0,
      clientId: taskalloc.clientId,
    categoryId: taskalloc.categoryId,
    employeeId: taskalloc.employeeId,
    description: taskalloc.description,
    scheduledDate:taskalloc.scheduledDate,
    dueDate: taskalloc.dueDate,
    status:"Yet To Start",
    startedDate: "",
  completedDate: "",
  uploadsPath: "",
  createdBy: 1
    };    
    Swal.fire({
      title: "<h1>Are you sure? </h1><br/>want to save?",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {    
      if (result.isConfirmed) {
      console.log(data);
        axios
        .post(
          'http://catodotest.elevadosoftwares.com/Allocation/InsertAllocation',
          data
        )     
        .then((res) => {
          Swal.fire("Saved!", "", "success");
          navigate('/taskalloc');
         
        })
        .catch((error) => {
          console.error(" Failed to save", error);
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });   
  };
  const updateTask= async () => {
    // e.preventDefault();
    const data = {
      allocationId : taskalloc.allocationId,
      clientId: taskalloc.clientId,
    categoryId: taskalloc.categoryId,
    employeeId: taskalloc.employeeId,
    description: taskalloc.description,
    scheduledDate:taskalloc.scheduledDate,
    dueDate: taskalloc.dueDate,
    status:"Yet To Start",
    startedDate: "",
  completedDate: "",
  uploadsPath: "",
  createdBy: 1
    };
    setIsEditing(true);
        setText('UPDATE');
        // setKey("Edit");
    Swal.fire({
      title: "<h1>Are you sure? </h1><br/>want to Update?",
      showCancelButton: true,
      confirmButtonText: "Update",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("updated");
        axios
        .post(
          'http://catodotest.elevadosoftwares.com/Allocation/InsertAllocation',
          data
        )
        .then((res) => {
          Swal.fire("Updated!", "", "success");
          navigate('/taskalloc');
        })
        .catch((error) => {
          console.error(" Failed to update", error);
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not updated", "", "info");
      }
    }); 
    }
    function getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); 
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  return (
    <div className='container-allmaster' style={{ backgroundColor: "white" }}>
      <br />
      <div>
        <p className="heading">Task Allocation</p>
      </div>
      <Formik
        initialValues={taskalloc}
        validationSchema={schema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange }) => (
          <Form className="label">
            <Row className="mb-3">
              <Form.Group as={Col} md="5">
                <Form.Label>Client Name</Form.Label>
                <Form.Select
                  aria-label="Client"
                  type="select"
                  name="clientId"
                  onChange={(e) => {
                    handleChange(e);
                    handleInput(e);
                  }}
                  value={taskalloc.clientId}
                >
                  <option value="">Select</option>
                  {records.map((c) => (
                    <option key={c.clientId} value={c.clientId}>
                      {c.clientName}
                    </option>
                  ))}
                </Form.Select>
                <ErrorMessage
                  name="clientId"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
              <Form.Group as={Col} md="5">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  aria-label="Category"
                  type="select"
                  name="categoryId"
                  onChange={(e) => {
                    handleChange(e);
                    handleInput(e);
                  }}
                  value={taskalloc.categoryId}
                >
                  <option value="">Select</option>
                  {rec.map((c) => (
                    <option key={c.categoryId} value={c.categoryId}>
                      {c.category}
                    </option>
                  ))}
                </Form.Select>
                <ErrorMessage
                  name="categoryId"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="5">
                <Form.Label>Description</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="basic-addon1"
                    style={{ backgroundColor: "white", color: "#f79d9c" }}
                  >
                    <i>
                      <CardList />
                    </i>
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    type="text"
                    name="description"
                    placeholder="(Maximum 300 Chars)"
                    style={{ borderLeft: "none" }}
                    onChange={(e) => {
                      handleChange(e);
                      handleInput(e);
                    }}
                    value={taskalloc.description}
                  />
                </InputGroup>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Assigned To</Form.Label>
                <Form.Select
                  aria-label="Employee"
                  type="select"
                  name="employeeId"
                  onChange={(e) => {
                    handleChange(e);
                    handleInput(e);
                  }}
                  value={taskalloc.employeeId}
                >
                  <option value="">Select</option>
                  {recs.map((employee) => (
                    <option
                      key={employee.employeeId}
                      value={employee.employeeId}
                    >
                      {employee.employeeName}
                    </option>
                  ))}
                </Form.Select>
                <ErrorMessage
                  name="employeeId"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="duedate">
                <Form.Label>Scheduled From Date</Form.Label>
                <Form.Control
                  type="date"
                  name="scheduledDate"
                  value={taskalloc.scheduledDate}  min={getCurrentDate()}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="duedate">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={taskalloc.dueDate}
                  onChange={(e) => {
                    handleChange(e);
                    handleInput(e);
                  }}
                  // value={todate}
                  // onChange={(e) => setToDate(e.target.value)}
                />
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
            </Row>
            <div className={"a"}>              
            {(key !== "View"  )&& (
  <Button type="button" onClick={(e) => handleSubmit(e)} variant="outline-success">
    <i>
      <Check />
    </i>
    {text}{" "}
  </Button>
)}
             <Link to ='/taskalloc'> <Button variant="outline-danger">
                <ArrowLeftCircleFill /> Back{" "}
              </Button>{" "}</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default TaskAllocationAdd;
