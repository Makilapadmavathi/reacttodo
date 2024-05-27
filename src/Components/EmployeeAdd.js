import axios from "axios";
import { useEffect,useState } from "react";
import { Form, InputGroup, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { PersonFill,LockFill, TelephoneFill, Check, CaretLeftFill } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import * as yup from "yup";
import { Formik, ErrorMessage } from "formik";
function EmployeeAdd() {
    let employeeeditId = useParams(); 
    function LoadEditClientById()
  {
    const fetchData = async () => {
        axios
          .get(
            "http://catodotest.elevadosoftwares.com/Employee/GetAllEmployeeDetails"
          )
          .then((res) => {
          //  setRecords(res.data.employeeList);
            let result = (res.data.employeeList).filter((item)=> item.employeeId === parseInt(employeeeditId.Id)); 
            // console.log(result);
             result.map(rec => {
               setEmployee({ ...employee, employeeId: rec.employeeId, employeeName: rec.employeeName,
                mobile: rec.mobile, userName: rec.userName,password:rec.password,confirmPassword:rec.confirmPassword,createdBy:rec.createdBy})
              });
             setIsEditing(true);
             setText('Update');
            
          })
          .catch((err) => console.log(err));
      };
      fetchData();
  }
    useEffect(() => {
      
        if(employeeeditId.Id===undefined)
        {
         setText('Save');
        }else{
         setText('Update');
         LoadEditClientById();
        }
     }, []);
    
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('');
   // const [records, setRecords] = useState([]);
    const [employee, setEmployee] = useState({
        employeeId: '',
        employeeName: '',
        mobile: '',
        userName: '',
        password: '',
        confirmPassword: '',
        createdBy: ''

    })
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    const schema = yup.object().shape({
      employeeName: yup.string().required("Name is mandatory"),
      mobile: yup.string()
      .required("required")
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, "too short")
      .max(10, "too long"),
      userName: yup.string().required("Username is mandatory"),
      password: yup
    .string()
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
     
    });
    
    const handleInput = (e) => {
        // e.persist;
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    const handleSubmit = () => {
      // e.preventDefault(); 
      
    
      if (isEditing) {
        updateEmployee();
      } else {
        saveEmployee();
      }
    };
    // save
    const saveEmployee = async () => {
        // e.preventDefault();
        const data = {
            employeeId: 0,
            employeeName: employee.employeeName,
            mobile: employee.mobile,
            userName: employee.userName,
            password: employee.password,
            confirmPassword: employee.confirmPassword,
            createdBy: 1,
        }

        Swal.fire({
          title: "<h1>Are you sure? </h1><br/>want to save?",
          showCancelButton: true,
          confirmButtonText: "Save",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
            .post(
              'http://catodotest.elevadosoftwares.com/Employee/InsertEmployee',
              data
            )
            .then((res) => {
              Swal.fire("Saved!", "", "success");
              navigate('/employee');
              LoadEditClientById()
            
             
            }
            )
            .catch((error) => {
              console.error(" Failed to save", error);
            });
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
    }
    const updateEmployee = async () => {
        // e.preventDefault();
        const data = {
            employeeId: employee.employeeId,
            employeeName: employee.employeeName,
            mobile: employee.mobile,
            userName: employee.userName,
            password: employee.password,
            confirmPassword: employee.confirmPassword,
            createdBy: employee.createdBy,

        }


        setIsEditing(true);
        setText('UPDATE');
    Swal.fire({
      title: "<h1>Are you sure? </h1><br/>want to Update?",
      showCancelButton: true,
      confirmButtonText: "Update",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .post(
          'http://catodotest.elevadosoftwares.com/Employee/InsertEmployee',
          data
        )
        .then((res) => {
          Swal.fire("Updated!", "", "success");
          navigate('/employee');
              LoadEditClientById()
            
         
        })
        .catch((error) => {
          console.error(" Failed to update", error);
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not updated", "", "info");
      }
    });
    }
    return (
        <>
          <div className='container-allmaster' style={{ backgroundColor: "secondary" }}>
                <br />
                <div>
                    <p className='heading'>Employee Master</p>
                </div>
                <Formik
            initialValues={employee}
            validationSchema={schema}
            enableReinitialize
            onSubmit={handleSubmit} 
          >
            {({handleChange, handleSubmit }) => (
              <Form noValidate >
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3">
                            <Form.Label>Employee Name <span className="text-danger">*</span></Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><PersonFill /></i></InputGroup.Text>
                                <Form.Control
                                    required
                                    type="text"
                                    name="employeeName" value={employee.employeeName}
                                    placeholder="Employee Name"
                                    onChange={(e) => {
                                      handleChange(e);
                                       handleInput(e);
                                     }}
                                    style={{ borderLeft: 'none' }}
                                    
                                />
                            </InputGroup>
                            <ErrorMessage
                      name="employeeName"
                      component="div"
                      className="text-danger"
                    />

                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Mobile No <span className="text-danger">*</span></Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><TelephoneFill /></i></InputGroup.Text>
                                <Form.Control
                                    required
                                    type="text"
                                    name="mobile" value={employee.mobile}
                                    placeholder="Mobile No"
                                    onChange={(e) => {
                                      handleChange(e);
                                       handleInput(e);
                                     }}
                                    style={{ borderLeft: 'none' }}
                                />
                            </InputGroup>
                            <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-danger"
                    />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>UserName <span className="text-danger">*</span></Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><PersonFill /> </i></InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    name="userName" value={employee.userName}
                                    placeholder="UserName"
                                    onChange={(e) => {
                                      handleChange(e);
                                       handleInput(e);
                                     }}
                                    style={{ borderLeft: 'none' }}
                                />
                            </InputGroup>
                            <ErrorMessage
                      name="userName"
                      component="div"
                      className="text-danger"
                    />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><LockFill /></i></InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    name="password" value={employee.password}
                                    placeholder="Password"
                                    onChange={(e) => {
                                      handleChange(e);
                                       handleInput(e);
                                     }}
                                    style={{ borderLeft: 'none' }}
                                />
                            </InputGroup>
                            <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3">
                            <Form.Label>Confirm Password <span className="text-danger">*</span></Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><LockFill /></i></InputGroup.Text>
                                <Form.Control type="text" name="confirmPassword" value={employee.confirmPassword} placeholder="Confirm Password"
                                 onChange={(e) => {
                                  handleChange(e);
                                   handleInput(e);
                                 }}
                                 style={{ borderLeft: 'none' }} />

                            </InputGroup>
                            <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-danger"
                    />
                        </Form.Group>
                    </Row>
                    <div style={{ textAlign: 'right', marginRight: '30px' }}>
                    <Button type="button" onClick={(e)=>handleSubmit(e)} variant="outline-success">
           <i>
                      <Check />
                    </i>
                    {text}{" "}
                  </Button>{" "}
                   
          {/* <Button variant="outline-success"
           onClick={isEditing ? updateEmployee : saveEmployee}
           className='btn my-cusomized-button'><i><Check /></i>{text}</Button>{' '} */}
                       
                        <Link to='/employee'>
                            <Button variant="outline-danger" className='btn my-cusomized-button-back'><i><CaretLeftFill /></i> BACK</Button>{' '}</Link>
                    </div>
                    </Form>
       
       )}
        </Formik>
            </div>
            </>
    );
}
export default EmployeeAdd;