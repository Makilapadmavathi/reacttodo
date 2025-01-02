import React,{useState} from 'react';
import {Button, Container,Form,Nav,Navbar,NavDropdown,Offcanvas,FormLabel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/GT logo.jpg';
import "bootstrap-icons/font/bootstrap-icons.css";
import  MenuBarData  from './MenuBarData';
import {Link,useNavigate} from 'react-router-dom';
import SubMenu from './SubMenu';
import {Power,Cart} from 'react-bootstrap-icons';
import { useContext } from "react";
import { CountContext } from "../App";
function Navi(){
  const {count}=useContext(CountContext)
    const [sidebar, setSidebar] = useState(MenuBarData);
     const usernamesess=sessionStorage.getItem('usernamesess');
  //  const showSidebar = () => setSidebar(!sidebar);
    return(
        <>
       
             {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-secondary mb-3">
          <Container fluid>
            <Navbar.Brand style={{color:'white'}}><img src={logo} className="logo"/> GT ToDo</Navbar.Brand>
           
          {/* <div>{usernamesess}</div> */}
         
          <Form style={{fontSize:'20px',color:'white',marginLeft:'auto' }}>
            <div>Welcome {usernamesess} 
           
           
        </div>
            {/* <Label>{usernamesess}</Label> */}
           
          </Form>
          <Form style={{fontSize:'30px',marginLeft:'auto'}}>
          <Link to='/cartreducer'>  <Button variant="outline-secondary"><i style={{color:'white',paddingRight:'8px', fontSize: '24px' }}> <Cart/> {count}</i></Button></Link>
            <Link to='/'>  <i style={{color:'white',paddingRight:'8px'}}><Power/></i></Link>
           
          </Form>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end" style={{width:"220px",backgroundColor:'white'}}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <FormLabel style={{color:'#767373'}}>  GT ToDo-React</FormLabel>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
             
                    {sidebar.map((item, index) => {
			return <SubMenu item={item} key={index} />;
 })} 
      
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

        </>
    );

  }

export default Navi;


