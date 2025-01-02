import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Form, InputGroup, Row, Col, Button } from "react-bootstrap";
import { Check2, ArrowLeftCircleFill } from "react-bootstrap-icons";


import Swal from "sweetalert2";

function Undo() {
 
  const [recs, setRecs] = useState([]);
  const [recall, setRecall] = useState([]);
  const [updatestatus, setUpdatestatus] = useState({
    allocationId: "",
    employeeId: "",
    status: "",
  });
  const handleInput = (e) => {
    setUpdatestatus({ ...updatestatus, [e.target.name]: e.target.value });
  };
 
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://catodotest.elevadosoftwares.com/Allocation/GetAllAllocationDetails"
        );
        const allocationList = response.data.allocationList;
        console.log("allocationList");
        setRecall(allocationList); 
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  
  
   const Updatestatus = async () => {
   
    const data = {
        allocationId:updatestatus.allocationId,
        employeeId: updatestatus.employeeId,
        status: updatestatus.status,
    };
    
    Swal.fire({
      title: "<h1>Are you sure? </h1><br/>want to Update status?",
      showCancelButton: true,
      confirmButtonText: "Update status",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(data)
        axios
        .post(
          'http://catodotest.elevadosoftwares.com/Allocation/UpdateStatus',
          data
        )
        .then((res) => {
          Swal.fire("Updated!", "", "success");
         
        });
      } else if (result.isDenied) {
        Swal.fire("Status are not updated", "", "info");
      }
    });
  
    }

    const Undo = async () => {
    
        const data = {
            allocationId: updatestatus.allocationId,
            employeeId: updatestatus.employeeId,
            status: updatestatus.status,
        };
       
        Swal.fire({
          title: "<h1>Are you sure? </h1><br/>want to undo status?",
          showCancelButton: true,
          confirmButtonText: "Undo status",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
            .post(
              'http://catodotest.elevadosoftwares.com/Allocation/UndoUpdateStatus',
              data
            )
            .then((res) => {
              Swal.fire("Updated!", "", "success");
             
            });
          } else if (result.isDenied) {
            Swal.fire("Status are not updated", "", "info");
          }
        });
      
        }
    return(
        <div className="container">
      <br />
      <div>
        <p className="heading">Update Status</p>
      </div>
          <Form className="label">
            <Row className="mb-3">
              <Form.Group as={Col} md="5">
                <Form.Label>Allocation</Form.Label>
                <Form.Select
  aria-label="Allocation"
  as="select"
  name="allocationId"
  onChange={(e) => {
    handleInput(e);
  }}
  value={updatestatus.allocationId}
>
  <option value="">Select</option>
  {recall.map((all) => (
    <option key={all.allocationId} value={all.allocationId}>
      {all.allocationId}
    </option>
  ))}
</Form.Select>

              </Form.Group> 
            </Row>
            <Row>
     <Form.Group as={Col} md="4">
  <Form.Label>Assigned To</Form.Label>
  <Form.Select
    aria-label="Employee"
    name="employeeId"
    onChange={(e) => {
      handleInput(e);
    }}
    value={updatestatus.employeeId}
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
</Form.Group>
    <Form.Group as={Col} md="3">
    <Form.Label>Status</Form.Label>
    <Form.Select aria-label="Status" name="status"onChange={(e) => {handleInput(e);}}
  value={updatestatus.status}>
  <option value="">Select</option>
  <option value="Yet to Start">Yet to Start</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</Form.Select>

          </Form.Group>
            </Row>
            <Row className="mb-3">
            </Row>
            <div className={"a"}>
              <Button
                variant="outline-success"
                type="button"
                onClick={Updatestatus}
              >
                <Check2 />
               Update status
              </Button>{" "}
              <Button variant="outline-danger"  type="button" onClick={Undo}>
                <ArrowLeftCircleFill /> Undo status{" "}
              </Button>{" "}
            </div>
          </Form>
        
     
    </div>

    );
}
export default Undo;