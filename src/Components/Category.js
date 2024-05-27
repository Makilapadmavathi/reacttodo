import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
// import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  InputGroup,
  Row,
  Col,
  Button,
  CloseButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Plus, 
  PencilSquare,
  Trash3,
  CardList,
  StickyFill,
  Check2,
  X,
} from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useContext } from "react";
import { CountContext } from "../App";

const customStyles = {
  headRow: {
    style: { backgroundColor: "white", color: "black" },
  },
  headCells: {
    style: { fontSize: "16px", fontWeight: "300" },
  },
  Cells: {
    style: {fontSize: "16px"}
  }
};

function Category() {
   
  const {count,dispatch}=useContext(CountContext)
  const LoadCategoryData = () => {
    const fetchData = async () => {
      axios
        .get(
          "http://catodotest.elevadosoftwares.com//Category/GetAllCategories"
        )
        .then((res) => {
          setRecords(res.data.categoryList);
          setfilterRecords(res.data.categoryList);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  };
  useEffect(() => {
    LoadCategoryData();
  }, []);

  const column = [
    {
      name: "S.No",
      selector: (row) => row.categoryId,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },

    {
      name: " Created By",
      selector: (row) => row.createdBy,
      sortable: true,
    },
  
    {
      name: "Action",
      cell: (row) => (
        <div>
         
            <PencilSquare onClick={() => handleEdit(row.categoryId)}   style={{ color: "green" }}/> &nbsp; &nbsp;
            <Trash3 onClick={() => handleModelFirst(row.categoryId)}style={{ color: "red" }}/>
        
        </div>
      ),
    },
  ];
  //DAtatable
  //Variabl Declaration
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("SAVE");
  const [records, setRecords] = useState([]);
  const [filterRecords, setfilterRecords] = useState([]);
  const [search, setSearch] = useState([]);
  const [categoryname, setCategory] = useState({
    id: "",
    category: "",
    description: "",
    createdby: "",
  });
  // const schema = yup.object().shape({
  //   category: yup.string().required("Category is mandatory"),
  //   description: yup.string().required(),
  //   //user_email: yup.string().email("Invalid email format").required("Email is required"),
  // });
  const [categoryDel, setCategoryDel] = useState({
    id: "",
    remarks: "",
    createdby: "",
  });
  const navigate = useNavigate();
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const handleCloseSecondModal = () => setShowSecondModal(false);
  const handleShowSecondModal = () => setShowSecondModal(true);
  const handleCloseFirstModal = () => setShowFirstModal(false);
  const handleShowFirstModal = () => setShowFirstModal(true);
  const schema = yup.object().shape({
    category: yup.string().required("Category is mandatory"),
    description: yup.string().required(),
    //user_email: yup.string().email("Invalid email format").required("Email is required"),
  });
  
  const handleInput = (e) => {
    setCategory({ ...categoryname, [e.target.name]: e.target.value });
  };
  const handleInputDel = (e) => {
    setCategoryDel({ ...categoryDel, [e.target.name]: e.target.value });
  };
  const handleDeleteConfirm = () => {
    handleCloseFirstModal();
    handleShowSecondModal();
  };
  const handleModelFirst = (val) => {
    setCategoryDel({ ...categoryDel, id: val });
    handleShowFirstModal();
  };

  const saveCategory = () => {
    // alert("hi")
    //  e.preventDefault();
   
    const createdbyname=sessionStorage.getItem("usernamesess");
    console.log(createdbyname)
    if(createdbyname==='Admin')
    {
       // console.log("success")
        categoryname.createdby=1;
    }
    const data = {
      categoryId: 0,
      category: categoryname.category,
      description: categoryname.description,
      createdBy:  categoryname.createdby,
    };
    Swal.fire({
      title: "<h1>Are you sure? </h1><br/>want to save?",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .post(
          "http://catodotest.elevadosoftwares.com/Category/InsertCategory",
          data
        )
        .then((res) => {
          Swal.fire("Saved!", "", "success");
          handleCancel();
          LoadCategoryData();
        })
        .catch((error) => {
          console.error(" Failed to save", error);
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
 
  }
   
  

  const editCategory = () => {
    // e.preventDefault();
    const data = {
      categoryId: categoryname.id,
      category: categoryname.category,
      description: categoryname.description,
      createdBy: categoryname.createdby,
    };
    Swal.fire({
      title: "<h1>Are you sure? </h1><br/>want to Update?",
      showCancelButton: true,
      confirmButtonText: "Update",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .post(
          "http://catodotest.elevadosoftwares.com/Category/InsertCategory",
          data
        )
        .then((res) => {
          Swal.fire("Updated!", "", "success");
          handleCancel();
          LoadCategoryData();
        })
        .catch((error) => {
          console.error(" Failed to update", error);
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not updated", "", "info");
      }
    });
   
  };



  const handleDelete = () => {
    //  categoryDel.id=val;
    const data = {
      categoryId: categoryDel.id,
      removedRemarks: categoryDel.remarks,
      createdBy: 1,
    };
    console.log(data);
    axios
      .post(
        "http://catodotest.elevadosoftwares.com/Category/RemoveCategory",
        data
      )
      .then((res) => {
        Swal.fire("Deleted!", "", "success");
        handleCloseSecondModal();
        navigate("/category");
        LoadCategoryData();
      })
      .catch((error) => {
        console.error("API request failed", error);
      });
  };

  const handlefilter = (e) => {
    const newData = filterRecords.filter((row) => {
      return Object.values(row)
        .join("")
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  const handleEdit = (val) => {
    // var index= (records).findIndex(obj => obj.categoryId === val);
    console.log(records);
    let result = records.filter((item) => item.categoryId === val);
    console.log(result);
    result.map((rec) => {
      setCategory({
        ...categoryname,
        id: rec.categoryId,
        category: rec.category,
        description: rec.description,
        createdby: rec.createdBy,
      });
    });
    setIsEditing(true);
    setText("Update");
  };

  const handleCancel = () => {
    setCategory({
      id: "",
      category: "",
      description: "",
      createdby: "",
    });
    setIsEditing(false);
    setText("SAVE");
  };

  const handleSubmit = () => {
   // console.log(isEditing);
    if (isEditing) {
      editCategory();
    } else {
      // console.log(categoryname)
      saveCategory();
    }
  
  };


  return (
    <div className='container-allmaster' style={{ backgroundColor: "secondary" }}>
      <div className="d">
        <div>
          <p className="heading">Category Master</p>
          <Modal
            style={{ textAlign: "center" }}
            show={showFirstModal}
            onHide={handleCloseFirstModal}
          >
            <Modal.Body style={{ textAlign: "center" }}>
              <h1>
                <b>Are you sure?</b>
              </h1>{" "}
              <br /> <h4>Want to Delete?</h4>
            </Modal.Body>
            <div>
              <Button variant="primary" onClick={handleDeleteConfirm}>
                Yes
              </Button>
              &nbsp;
              <Button variant="secondary" onClick={handleCloseFirstModal}>
                Cancel
              </Button>
              <br />
              <br />
            </div>
          </Modal>

          {/* Second Modal */}
          <Modal
            style={{ textAlign: "center" }}
            show={showSecondModal}
            onHide={handleCloseSecondModal}
          >
            <div>
              <Button variant="outline-secondary" style={{ float: "right" }}>
                <CloseButton />
              </Button>
            </div>
            <Modal.Body style={{ textAlign: "center" }}>
              <Form className="label pl-4">
                <Form.Label>Remarks</Form.Label>
                <Form.Control
                  type="text"
                  name="remarks"
                  onChange={handleInputDel}
                  value={categoryDel.remarks}
                  placeholder="Category"
                  required
                  style={{ borderLeft: "none" }}
                />
              </Form>
            </Modal.Body>
            <div>
              <Button variant="outline-success" onClick={() => handleDelete()}>
                Add
              </Button>
              <Button variant="outline-danger" onClick={handleCloseSecondModal}>
                Cancel
              </Button>
              <br />
              <br />
            </div>
          </Modal>
        </div>
        <div style={{ backgroundColor: "white", padding: "20px 5%" }}>
          <Formik 
            initialValues={categoryname}
            validationSchema={ schema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ handleSubmit,handleChange }) => (
              <Form noValidate>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4">
                    <Form.Label>
                      Category Name <span className="text-danger">*</span>
                    </Form.Label>
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
                        type="text"
                        name="category"
                        value={categoryname.category}
                        placeholder="Category"
                        onChange={(e) => {
                         handleChange(e);
                          handleInput(e);
                        }}
                        //  isInvalid={!!errors.category}
                        style={{ borderLeft: "none" }}
                      />

                    </InputGroup>

                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="5">
                    <Form.Label>
                      Description <span className="text-danger">*</span>
                    </Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text
                        id="basic-addon1"
                        style={{ backgroundColor: "white", color: "#f79d9c" }}
                      >
                        <i>
                          <StickyFill />
                        </i>
                      </InputGroup.Text>
                      <Form.Control
                        as="textarea"
                        type="text"
                        name="description"
                        value={categoryname.description}
                        onChange={(e) => {
                          handleChange(e);
                          handleInput(e);
                        }}
                        placeholder="description"
                        style={{ borderLeft: "none" }}
                        // isInvalid={!!errors.description}
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </Row>

                <div style={{ textAlign: "right" }}>
                  {/* <Button variant="outline-success" onClick={isEditing ? editCategory : saveCategory}><i><Check2/></i>{text} </Button>{' '} */}
                  <Button type="submit" onClick={(e)=>handleSubmit(e)} variant="outline-success">
                    <i>
                      <Check2 />
                    </i>
                    {text}{" "}
                  </Button>{" "}
                  <Link to="/dashboard">
                    <Button variant="outline-danger" onClick={handleCancel}>
                      <i>
                        <X />
                      </i>
                      BACK{" "}
                    </Button>{" "}
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <Form>
            <DataTable
              columns={column}
              data={records}
              customStyles={customStyles}
              pagination
              // selectableRows
              fixedHeader
              selectableRowsHighlight
              highlightOnHover
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 20]}
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  className="w-25 form-control"
                  placeholder="Search"
                  onChange={handlefilter}
                ></input>
              }
              subHeaderAlign="right"
             
            ></DataTable>
          </Form>
          

  
<Button variant="outline-success"onClick={(e)=>dispatch("increment")}><i><Plus/></i>  Add to Cart</Button> &nbsp;&nbsp;
<Button variant="outline-danger"onClick={(e)=>dispatch("decrement")}><i><Trash3/></i> Remove from Cart</Button> &nbsp;&nbsp;
<Button variant="outline-info"onClick={(e)=>dispatch("reset")}> Reset</Button>
           
    
        </div>
      </div>
    </div>
  );
}

export default Category;
