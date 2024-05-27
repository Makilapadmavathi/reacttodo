import React from 'react';
import { Form, InputGroup, Row, Col, Button } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { PersonFill, GeoAltFill, CurrencyRupee, GlobeAmericas, Envelope, TelephoneFill, Check, CaretLeftFill } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import * as yup from "yup";
import { Formik, ErrorMessage } from "formik";

function ClientAdd() {
  //
  let clienteditId = useParams(); 
  function LoadEditClientById()
  {
    const fetchData = async () => {
      axios
        .get(
          "http://catodotest.elevadosoftwares.com//Client/GetAllClientDetails"
        )
        .then((res) => {
          setRecords(res.data.clientList);
          console.log(res)
          let result = (res.data.clientList).filter((item)=> item.clientId === parseInt(clienteditId.Id)); 
          console.log(result)
           result.map(rec => {
             setClient({ ...client, clientId: rec.clientId, clientName: rec.clientName,
                phone: rec.phone, address: rec.address,gst:rec.gst,website:rec.website,email:rec.email, contactPerson:rec.contactPerson,phoneNumber:rec.phoneNumber,createdBy:rec.createdBy})
            });
          setIsEditing(true);
           
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }
 useEffect(() => {
 if(clienteditId.Id===undefined)
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
  const [records, setRecords] = useState([]);
  const [filterRecords, setfilterRecords] = useState([]);
  const [selectedFile, setSelectedFile] = useState();

  const [client, setClient] = useState({
    clientId: '',
    clientName: '',
    address: '',
    gst: '',
    website: '',
    email: '',
    contactPerson: '',
    phoneNumber: '',
    createdBy: ''
  })
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    clientName: yup.string().required("Name is mandatory"),
    address: yup.string().required(),
    gst: yup.string().required(),
    website: yup.string().required(),
    email: yup.string().email("Invalid email format").required("Email is required"),
    contactPerson: yup.string().required(),
    phoneNumber: yup.string()
    .required("required")
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "too short")
    .max(10, "too long"),
  });
  
  
  const handleInput = (e) => {
    // e.persist;
    setClient({ ...client, [e.target.name]: e.target.value });
  }
  const handleSubmit = () => {
    // e.preventDefault(); 
  
    if (isEditing) {
      updateClient();
    } else {
      saveClient();
    }
  };
      
  
  // save
  const saveClient = async () => {
    // e.preventDefault();
    const createdbyname=sessionStorage.getItem("usernamesess");
    console.log(createdbyname)
    if(createdbyname==='Admin')
    {
       // console.log("success")
        client.createdBy=1;
    }
    const data = {
      clientId: 0,
      clientName: client.clientName,
      phone: client.phone,
      address: client.address,
      gst: client.gst,
      website: client.website,
      email: client.email,
      contactPerson: client.contactPerson,
      phoneNumber: client.phoneNumber,
      createdBy: 1,
    };
    Swal.fire({
      title: "<h1>Are you sure? </h1><br/>want to save?",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .post(
          'http://catodotest.elevadosoftwares.com/Client/InsertClient',
          data
        )
        .then((res) => {
          Swal.fire("Saved!", "", "success");
          navigate('/client');
          LoadEditClientById()
        
         
        })
        .catch((error) => {
          console.error(" Failed to save", error);
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
   
  };
const handleuploadChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const updateClient = async () => {
  
    const data = {
      clientId: client.clientId,
      clientName: client.clientName,
      phone: client.phone,
      address: client.address,
      gst: client.gst,
      website: client.website,
      email: client.email,
      contactPerson: client.contactPerson,
      phoneNumber: client.phoneNumber,
      createdBy: 1,
    };
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
          'http://catodotest.elevadosoftwares.com/Client/InsertClient',
          data
        )
        .then((res) => {
          Swal.fire("Updated!", "", "success");
          navigate('/client');
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
 
const uploadFile = () => {
    if (!selectedFile) {
      alert("Please select a file before uploading.");
      return;
    }
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await axios.post('http://catodotest.elevadosoftwares.com/Client/InsertClient', formData);
        setRecords(response.data.clientList);
      } catch (error) {
        console.error(error);
      }
      fetchData();
    };
  }
  return (
    <>
       <div className='container-allmaster' style={{ backgroundColor: "secondary" }}>
        <br />
        <div>
          <p className='heading'>Client Master</p>
        </div>
         <Formik
            initialValues={client}
            validationSchema={schema}
            enableReinitialize
            onSubmit={handleSubmit} 
          >
            {({handleChange, handleSubmit }) => (
              <Form noValidate >
          <Row className="mb-3">
            <Form.Group as={Col} md="3">
              <Form.Label>Client Name <span className="text-danger">*</span></Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><PersonFill /></i></InputGroup.Text>
                <Form.Control type="text" 
                  name="clientName"  value={client.clientName}
                  placeholder="Client"
                  onChange={(e) => {
                    handleChange(e);
                     handleInput(e);
                   }}
                  style={{ borderLeft: 'none' }}
                />
              </InputGroup>
              <ErrorMessage
                      name="clientName"
                      component="div"
                      className="text-danger"
                    />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Address <span className="text-danger">*</span></Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><GeoAltFill /></i></InputGroup.Text>
                <Form.Control
                  required
                  type="text"
                  name="address"
                  placeholder="Address"
                  style={{ borderLeft: 'none' }} onChange={(e) => {
                    handleChange(e);
                    handleInput(e);
                  }} value={client.address}
                />
              </InputGroup>
              <ErrorMessage
                      name="address"
                      component="div"
                      className="text-danger"
                    />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>GST <span className="text-danger">*</span></Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><CurrencyRupee /></i></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="gst"
                  placeholder="GST"
                  style={{ borderLeft: 'none' }}onChange={(e) => {
                    handleChange(e);
                    handleInput(e);
                  }} value={client.gst}
                />
              </InputGroup>
              <ErrorMessage
                      name="gst"
                      component="div"
                      className="text-danger"
                    />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Website <span className="text-danger">*</span></Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><GlobeAmericas /></i></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="website"
                  placeholder="website"
                  style={{ borderLeft: 'none' }} onChange={(e) => {
                    handleChange(e);
                    handleInput(e);
                  }} value={client.website}
                />
              </InputGroup>
              <ErrorMessage
                      name="website"
                      component="div"
                      className="text-danger"
                    />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="3">
              <Form.Label>Email <span className="text-danger">*</span></Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><Envelope /></i></InputGroup.Text>
                <Form.Control type="text" name="email" placeholder="Email" style={{ borderLeft: 'none' }} onChange={(e) => {
                          handleChange(e);
                          handleInput(e);
                        }} value={client.email} />
              </InputGroup>
              <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Contact Person <span className="text-danger">*</span></Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><PersonFill /></i></InputGroup.Text>
                <Form.Control type="text" name="contactPerson" placeholder="State" style={{ borderLeft: 'none' }} onChange={(e) => {
                          handleChange(e);
                          handleInput(e);
                        }} value={client.contactPerson} />
              </InputGroup>
              <ErrorMessage
                      name="contactPerson"
                      component="div"
                      className="text-danger"
                    />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Phone No <span className="text-danger">*</span></Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><TelephoneFill /></i></InputGroup.Text>
                <Form.Control type="text" name="phoneNumber" placeholder="Phone Number" style={{ borderLeft: 'none' }} onChange={(e) => {
                          handleChange(e);
                          handleInput(e);
                        }} value={client.phoneNumber} />
              </InputGroup>
              <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-danger"
                    />
            </Form.Group>

          </Row>
          <Row className="mb-4">

            <Form.Group as={Col} md="4" controlId="formFile" >
              <Form.Label>Upload (in Excel)</Form.Label>
              <Form.Control type="file" onChange={handleuploadChange} />
            </Form.Group>

            <Form.Group as={Col} className='mt-4 ' md="4">
              <Button onClick={uploadFile}variant="info">Upload</Button>{' '}
            </Form.Group>
          </Row>
          <div style={{ textAlign: 'right', marginRight: '30px' }}>
         
          {/* <Button variant="outline-success" type="submit"
           onClick={isEditing ? updateClient : saveClient} */}
           <Button type="button" onClick={(e)=>handleSubmit(e)} variant="outline-success">
           <i>
                      <Check />
                    </i>
                    {text}{" "}
                  </Button>{" "}
           {/* className='btn my-cusomized-button'><i><Check /></i>{text}</Button>{' '} */}
            <Link to='/client'>
            <Button variant="outline-danger" className='btn my-cusomized-button-back'><i><CaretLeftFill /></i> BACK</Button>{' '}</Link>
          </div>
</Form>
       
         )}
          </Formik>
      </div>
    </>
  );

}
export default ClientAdd;



