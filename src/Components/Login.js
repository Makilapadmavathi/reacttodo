import React, { useState,useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Form, InputGroup,CloseButton } from 'react-bootstrap';
import { Person, Key } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function Login() {
    const navigate = useNavigate();
    const [records, setRecords] = useState({
        UserName: "",
        Password: "",
        Type: "User",
        deviceId: '',
    });
    const handleInput = (e) => {
        setRecords({ ...records, [e.target.name]: e.target.value });
      };
    const Loginsubmit = () => {
        const datas = {
            UserName: records.UserName,
            Password: records.Password,
            Type: records.Type,
            deviceId: records.deviceId,
        };
        sessionStorage.setItem("usernamesess", datas.UserName);
        //    const usernamesess=sessionStorage.getItem('usernamesess');
        axios.get("http://catodotest.elevadosoftwares.com/Login/GetLoginUserDetails",datas)
            .then((response) => {
                //console.log(datas)
                navigate('/dashboard', { replace: true });
                   
                  }
                  
                  )
                  .catch((err) => { "invalid "});
    };
    

   
//
//     const loginsubmit = () => {

       
//         //
//         if (username === predefinedUsername && password === predefinedPassword) {
//          //////Save in session

//           //local
//           localStorage.setItem("usernamelo", username);
//           //session
//           sessionStorage.setItem("usernamesess", username);
//           //session key value
//           const data = { key: username };
// localStorage.setItem('usernamesessk', JSON.stringify(data));

// ///Retrieve that session

// // const username=localStorage.getItem('usernamelo');
// //    const usernamesess=sessionStorage.getItem('usernamesess');
// //    const sessionValue = JSON.parse(localStorage.getItem('usernamesessk'));
//             ///
// navigate('/dashboard', { replace: true });
//         } else {
           
//             alert("Invalid username or password");
//         }
//     }

    return (
        <div className="background-image">
            <Container className="container-center">
                <Form className="form-container px-4">
                    <h3>Log in</h3><br /><br />
                    <Form.Group className="mb-3 input" controlId="formBasicEmail">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><Person /></i></InputGroup.Text>
                            <Form.Control
                                type="text"
                                required
                                name="UserName"
                                value={records.UserName}
                                onChange={handleInput}
                                placeholder="Username"
                                style={{
                                    borderLeft: 'none',
                                    '&:hover': {
                                        border: '1px solid black',
                                        boxShadow: 'none',
                                    },
                                    '&:focus': {
                                        border: '1px solid black',
                                        outline: 'none',
                                        borderShadow: 'none',
                                        boxShadow: 'none',
                                    },
                                }}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" style={{ backgroundColor: 'white', color: '#f79d9c' }}><i><Key /></i></InputGroup.Text>
                            <Form.Control
                                type="password"
                                required
                                name="Password"
                                placeholder="Password"
                                style={{ borderLeft: 'none' }}
                                onChange={handleInput}
                                value={records.Password}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Button variant="warning" type="button" onClick={Loginsubmit}>
                        Get Started
                    </Button>
                </Form>
              
    {/* Model */}
      
            </Container>
        </div>
    );
}

export default Login;
