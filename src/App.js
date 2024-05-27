import Navi from './Components/navbar';
import {Route,Routes,useLocation} from 'react-router-dom';
import './App.css';
import Client from './Components/Client';
import TaskAllocation from './Components/TaskAllocation';
import EmployeeAdd from './Components/EmployeeAdd';
import ClientAdd from './Components/ClientAdd';
import TaskAllocationAdd from './Components/TaskAllocationAdd';
import Dashboard from './Components/Dashboard';
import Category from './Components/Category';
import Employee from './Components/Employee';
import Empwisetasks from './Components/Empwisetasks';
import Userdetails from './Components/Userdetails';
import Login from './Components/Login';
import { useState } from "react";
import EmpwisetaskCount from "./Components/EmpwisetaskCount";
import TaskDetails from './Components/TaskDetails';
import Getcategorywiseallocation from './Components/Categorywisealloc';
import Getclientwiseallocation from './Components/Clientwisealloc';
import Cartreducer from './Components/Reducercart';
import { useReducer } from 'react';
import { createContext } from 'react';
import Excelfile from './Components/Excelfile';


export const CountContext= createContext();
const initialstate=0;
const reducer=(state,action)=>{
  switch(action)
  {
    case "increment" :
    return state + 1;
    case "decrement":
    return state - 1;
    case "reset":
      return 0;
      default:
        return state;
  }

}
function App() {
  const [count,dispatch]=useReducer(reducer,initialstate);
  const location=useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('username'));

  const username = localStorage.getItem('username') || ''; 
 
  return (


   
// <>
// <Reducercart/>
//        {/* {location.pathname !== '/' && <Navi />}  */}
//        {location.pathname !== '/' && (
//         <Navi isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} />

// )}

  <CountContext.Provider value={{ count, dispatch }}>
    <div>

      {/* {location.pathname !== '/' && <Navi />}  */}
      {location.pathname !== '/' && (
        <Navi isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} />
      )}
   
    {/* <Cartreducer/> */}
    <Routes>
    <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
  
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/category' element={<Category/>}></Route>
      <Route path='/client' element={<Client/>}></Route>
      <Route path='/clientadd' element={<ClientAdd/>}></Route>
      <Route path='/clientadd/:Id' element={<ClientAdd/>}></Route>
      <Route path='/employee' element={<Employee/>}></Route>
      <Route path='/employeeadd' element={<EmployeeAdd/>}></Route>
      <Route path='/employeeadd/:Id' element={<EmployeeAdd/>}></Route>
      <Route path='/taskalloc' element={<TaskAllocation/>}></Route>
      {/* <Route path='/taskallocadd/:key' element={<TaskAllocationAdd/>}></Route> 
     <Route path='/taskallocadd/:Id/:key' element={<TaskAllocationAdd/>}></Route> */}
      <Route path='/taskallocadd' element={<TaskAllocationAdd/>}></Route>
      <Route path='/empwisetaskcount' element={<EmpwisetaskCount/>}></Route>  
        <Route path='/taskallocaddstatus/:EmpId/:TaskStatus' element={<Empwisetasks/>}></Route>
         <Route path='/taskdetails/:TaskStatus' element ={<TaskDetails/>}></Route>
         <Route path='/taskdetails' element ={<TaskDetails/>}></Route>
      <Route path='/userdetails' element={<Userdetails/>}></Route>      
      <Route path='/categorywisealloc' element={<Getcategorywiseallocation/>}></Route>
      <Route path='/clientwisealloc' element={<Getclientwiseallocation/>}></Route>
      <Route path='/cartreducer' element={<Cartreducer/>}></Route>
      <Route path="/excelfile" element={<Excelfile/>} ></Route>
    </Routes> 
   
    </div>
    </CountContext.Provider>

  );
}

export default App;
