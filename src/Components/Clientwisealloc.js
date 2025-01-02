import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { Search,Plus,FileExcel, EyeFill } from 'react-bootstrap-icons';
import DataTable from "react-data-table-component";
import {PencilSquare,Trash3} from "react-bootstrap-icons";
import XLSX from 'sheetjs-style';
import * as FileSaver from 'file-saver';

const customStyles = {
  headRow: {
    style: { backgroundColor: "white", color: "black" }
  },
  headCells: {
    style: {  fontSize: "16px", fontWeight: "200", textTransform: "uppercase"}
  },
  Cells: {
    style: { fontSize: "14px" }
  },
};
function Clientwiseallocation() {


    const column = [
        {
          name: "S.No",
          selector: row => row.allocationId,
          sortable: true
        },
        {
          name: "ClientId",
          selector: row => row.clientId,
          sortable: true
        },
        {
          name: "CategoryId",
          selector: row => row.categoryId,
          sortable: true
        },
        {
            name: "EmployeeId",
            selector: row => row.employeeId,
            sortable: true
          },
        
        {
            name: " Category",
            selector: row => row.category,
            sortable: true
          },


          {
            name: " clientName",
            selector: row => row.clientName,
            sortable: true
          },
          
          {
            name: " employeeName",
            selector: row => row.employeeName,
            sortable: true
          },
          
          {
            name: " mobile",
            selector: row => row.mobile,
            sortable: true
          }, 
          {
            name: " description",
            selector: row => row.description,
            sortable: true
          }, 
          {
            name: " scheduledDate",
            selector: row => row.scheduledDate,
            sortable: true
          }, 
          {
            name: " dueDate",
            selector: row => row.dueDate,
            sortable: true
          }, 
          
         
          {
            name: " createdBy",
            selector: row => row.createdBy,
            sortable: true
          }, 
       
      ];

      const [records, setRecords] = useState([]);
      const [recs, setRecs] = useState([]);
      const [clientwise,setClientwise]=useState(
        {
            clientId: 1,
            fromDate: "2023-01-01",
            toDate: "2023-11-01",
            pageNumber: 1,
            pageSize: 10,
            searchString: ""
        }
      );
      const handleInput = (e) => {
        setClientwise({ ...clientwise, [e.target.name]: e.target.value });
      };

      useEffect(() => {
        const data={
            clientId:clientwise.clientId,
            fromDate:clientwise.fromDate,
            toDate:clientwise.toDate,
            pageNumber:clientwise.pageNumber,
            pageSize:clientwise.pageSize,
            searchString:clientwise.searchString,
        }
        const fetchData = async () => {
          axios.post('http://catodotest.elevadosoftwares.com/Allocation/GetClientWiseAllocation',data)
            .then(res => {
              setRecords(res.data.clientWiseAllocation);
            console.log(data);
            console.log(res);
            })
        .catch(err => console.log(err));
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://catodotest.elevadosoftwares.com//Client/GetAllClientDetails"
        );
        const clientList = response.data.clientList;
        setRecs(clientList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const fetchData = async () => {
      const data = {
        clientId:clientwise.clientId,
        fromDate:clientwise.fromDate,
        toDate:clientwise.toDate,
        pageNumber:clientwise.pageNumber,
        pageSize:clientwise.pageSize,
        searchString:clientwise.searchString,
      };
      console.log(data)
      try {
        const response = await axios.post(
          "http://catodotest.elevadosoftwares.com/Allocation/GetClientWiseAllocation",
          data
        );
        console.log(response)
        const allocationList = response.data.clientWiseAllocation;
        setRecords(allocationList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
   
  };
return(
    <div className='container-allmaster' style={{ backgroundColor: "secondary" }}>
           <div>
          <p className='heading'>Getclientwiseallocation</p>
        </div>
      <div style={{ display: 'flex', justifyContent: 'left' }}>
      </div>
      <Form className="label">
            <Row className="mb-3">
      <Form.Group as={Col} md="5">
                <Form.Label>Client</Form.Label>
                <Form.Select
                  aria-label="Client"
                  type="select"
                  name="clientId"
                  onChange={(e) => {
                  
                    handleInput(e);
                  }}
                  value={clientwise.clientId}
                >
                  <option value="">Select</option>
                  {recs.map((c) => (
                    <option key={c.clientId} value={c.clientId}>
                      {c.clientName}
                    </option>
                  ))}
                </Form.Select>
                
              </Form.Group>
              </Row>
              <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="fromdate">
                <Form.Label>Scheduled From Date</Form.Label>
                <Form.Control
                  type="date"
                  name="fromDate"
                  value={clientwise.fromDate} 
                  onChange={(e) => {
                    
                    handleInput(e);
                  }}
                 
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="todate">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  name="toDate"
                  value={clientwise.toDate}
                  onChange={(e) => {
                    
                    handleInput(e);
                  }}
                 
                />
                
              </Form.Group>
              <Form.Group as={Col} md="6">
            <div className="mt-4">
              <Button variant="outline-danger" onClick={handleSearch}>
                <Search />
                Search
              </Button>{" "}
              


              
            </div>
          </Form.Group>
            </Row>
              </Form>


      <DataTable
        columns={column}
        data={records}
        customStyles={customStyles}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 20]}
        selectableRows
        fixedHeader
        selectableRowsHighlight
        highlightOnHover
        
        
          
      >
      </DataTable>
    </div>
);
}
export default Clientwiseallocation;