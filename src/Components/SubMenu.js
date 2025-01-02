import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Nav ,NavDropdown,FormLabel} from 'react-bootstrap';
import MenuBarData from "./MenuBarData";
 
    const SubMenu = ({ item }) => {
        const [subnav, setSubnav] = useState(false);
        
        const showSubnav = () => setSubnav(!subnav);
    return(
        
            <>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            	<Nav.Link 
	onClick={item.subNav && showSubnav}><Link to={item.path}>
		<div className="navmenulabel">
		{item.icon}
		<FormLabel style={{padding:'8px'}}>{item.title}</FormLabel>
        {item.subNav && subnav
			? item.iconOpened
			: item.subNav
			? item.iconClosed
			: null}
		</div>
        </Link>
		
	</Nav.Link>
    {subnav &&
		item.subNav.map((item, index) => {
		return (

			<Nav key={index} style={{padding:'8px',marginLeft:'20px'}}><Link to={item.path}>
                <div className="navmenulabel">
                {item.icon}
			<FormLabel>{item.title}</FormLabel>
                </div>
			
            </Link>
			</Nav>
		);
		})}
        </Nav>
          
        
            </>
    );
    
 }
 export default SubMenu;
