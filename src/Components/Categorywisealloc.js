import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button,CloseButton  } from 'react-bootstrap';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { Search,Plus,X } from 'react-bootstrap-icons';
import DataTable from "react-data-table-component";
import {PencilSquare,Trash3} from "react-bootstrap-icons";


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
function Categorywiseallocation() {


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
          
          {
            name: " totalCount",
            selector: row => row.totalCount,
            sortable: true
          }, 
           
      ];  
      
      const [searchText, setSearchText] = useState(''); // Search input value
      const [selectedCategory, setSelectedCategory] = useState(null);
     
      const [records,setRecords]=useState();
      const [rec, setRec] = useState([]);
      const [categorywise,setCategorywise]=useState(
        {
            categoryId: 1,
            fromDate: "2023-01-01",
            toDate: "2023-11-01",
            pageNumber: 1,
            pageSize: 10,
            searchString: ""
        }
      );
      const [selectedCategoryId, setSelectedCategoryId] = useState(categorywise.categoryId);
      const handleInput = (e) => {
        setCategorywise({ ...categorywise, [e.target.name]: e.target.value });
      };
      const clearSelectedCategory = () => {
        setSelectedCategoryId(""); 
        setCategorywise({ ...categorywise, categoryId: "" });
     
      };

      useEffect(() => {
        const data={
            categoryId:categorywise.categoryId,
            fromDate:categorywise.fromDate,
            toDate:categorywise.toDate,
            pageNumber:categorywise.pageNumber,
            pageSize:categorywise.pageSize,
            searchString:categorywise.searchString,
        }
        const fetchData = async () => {
          axios.post('http://catodotest.elevadosoftwares.com/Allocation/GetCategoryWiseAllocation',data)
            .then(res => {
              setRecords(res.data.categoryWiseAllocation);
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

  const handleSearch = () => {
    const fetchData = async () => {
      const data = {
        categoryId:categorywise.categoryId,
        fromDate:categorywise.fromDate,
        toDate:categorywise.toDate,
        pageNumber:categorywise.pageNumber,
        pageSize:categorywise.pageSize,
        searchString:categorywise.searchString,
      };
      console.log(data)
      try {
        const response = await axios.post(
          "http://catodotest.elevadosoftwares.com/Allocation/GetCategoryWiseAllocation",
          data);
        const allocationcategory = response.data.categoryWiseAllocation;
        setRecords(allocationcategory);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
   
  };
return(
    <div className='container-allmaster' style={{ backgroundColor: "secondary" }}>
           <div>
          <p className='heading'>Getcategorywiseallocation</p>
        </div>
      <div style={{ display: 'flex', justifyContent: 'left' }}>
      </div>
      <Form className="label">
            <Row className="mb-3">
      <Form.Group as={Col} md="5">
                <Form.Label>Category</Form.Label>
                {/* <Form.Select
                  aria-label="Category"
                  type="select"
                  name="categoryId"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  value={categorywise.categoryId}
                >
                  <option value="">Select</option>
                  {rec.map((c) => (
                    <option key={c.categoryId} value={c.categoryId}>
                      {c.category}
                    </option>
                  ))}
                </Form.Select> */}

                <Form.Select 
                  aria-label="Category"
                  name="categoryId"
                  onChange={(e) => {
                    handleInput(e);
                    setSelectedCategoryId(e.target.value);
                  }} 
                  value={selectedCategoryId}
               
                >
                  <option value="" >Select <CloseButton style={{ float: "right", 
                  marginLeft: "5px", 
                  fontWeight: "bold", 
                  cursor: "pointer"}} 
         onClick={clearSelectedCategory} /></option>
                  
                  {rec.map((c) => (
                    <option key={c.categoryId} value={c.categoryId}>
                      {c.category}
                    </option>
                  ))}
                </Form.Select>  
                </Form.Group>

                <Form.Group as={Col} md="1">
                <i><CloseButton style={{ float: "right", 
                  // marginLeft: "5px", 
                  paddingLeft: "10px",
                  fontWeight: "bold", 
                  cursor: "pointer"}} 
         onClick={clearSelectedCategory} /></i>
          
           
            
                
             
              </Form.Group>
              </Row>
              <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="fromDate">
                <Form.Label>Scheduled From Date</Form.Label>
                <Form.Control
                  type="date"
                  name="fromDate"
                  value={categorywise.fromDate} 
                  onChange={(e) => {
                    
                    handleInput(e);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="toDate">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  name="toDate"
                  value={categorywise.toDate}
                  onChange={(e) => {
                    
                    handleInput(e);
                  }}
                 
                />
                
              </Form.Group>
              <Form.Group as={Col} md="6">
            <div className="mt-4">
              <Button variant="outline-danger" onClick={handleSearch} >
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
export default Categorywiseallocation;