import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { PencilSquare, Trash3,Plus,ArrowLeftCircleFill} from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import ExcelExport from './Excelfile';
import Sweetalerttododelete from './Sweetalerttododelete';
const customStyles = {
  headRow: {
    style: { backgroundColor: "white", color: "black" }
  },
  headCells: {
    style: {  fontSize: "16px", fontWeight: "300", textTransform: "uppercase"}
  },
  Cells: {
    style: { fontSize: "16px" }
  },
};

function Client() {
  
  const column = [
    {
      name: "S.No",
      selector: row => row.clientId,
      sortable: true
    },
    {
      name: "ClientName",
      selector: row => row.clientName,
      sortable: true
    },
    {
      name: "Phone",
      selector: row => row.phone,
      sortable: true
    },

    
    {
        name: " Address",
        selector: row => row.address,
        sortable: true
      },
      {
        name: " Gst",
        selector: row => row.gst,
        sortable: true
      },
      {
        name: " Website",
        selector: row => row.website,
        sortable: true
      },
      
      {
        name: " ContactPerson",
        selector: row => row.contactPerson,
        sortable: true
      },
      
     
    {
      name: "Action",
      cell: row => (
        <div >
        
        <PencilSquare  onClick={() => handleEdit(row.clientId)} style={{ color: "green" }}/> &nbsp;&nbsp;
        <Trash3 onClick={() => handledeleteclient(row.clientId)} style={{ color: "red" }}/>

    </div>
        
      )
    }
  ];
  const [clientDel, setClientDel] = useState({
    id: '',
    remarks: '',
    createdby: ''
})
// const [isDeleteAlertVisible, setDeleteAlertVisibility] = useState(false);
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [filterRecords, setfilterRecords] = useState([]);
  const [search, setSearch] = useState([]);
  const [client, setClient] = useState({
    clientId:'',
    clientName:'',
    phone:'',
    address:'',
    gst:'',
    website:'',
    email: '',
    contactPerson:'',
    phoneNumber:'',
    createdBy:''


})



  useEffect(() => {
        const fetchData = async () => {
          axios.get('http://catodotest.elevadosoftwares.com//Client/GetAllClientDetails')
            .then(res => {
              setRecords(res.data.clientList);
              setfilterRecords(res.data.clientList);
            })
        .catch(err => console.log(err));
    }
    fetchData();
  }, []);

  const handlefilter = (e) => {
    const newData = filterRecords.filter((row) => {
      return Object.values(row).join('').toLowerCase().includes(e.target.value.toLowerCase())
    });
    setRecords(newData);
  }

  const handledeleteclient=(val)=>
  {
  
    setClientDel({ ...clientDel, id:val });
  //    handleDelete();
    
  // }

  // const handleDelete = () => {
    //  clientDel.id=val;
      const data = {
          clientId: clientDel.id,
          removedRemarks: clientDel.remarks,
          createdBy: 1,
      };
  console.log(data);
      axios
          .post('http://catodotest.elevadosoftwares.com//Client/RemoveClient', data )
          .then((res) => {
            Swal.fire({
              title: '<h1>Are you sure? </h1><br/>want to Delete?',
              showCancelButton: true,
              confirmButtonText: 'Delete',
              
            }).then((result) => 
            {
              if (result.isConfirmed) {
              Swal.fire({
                title: 'Remarks',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'yes',               
              })}
              else if (result.isDenied) {
                  Swal.fire('Datas are not Deleted', '', 'info')
                }
            }
            )
            console.log(data);
            // <Sweetalerttododelete isVisible={isDeleteAlertVisible} toggleVisibility={setDeleteAlertVisibility} />
             navigate('/client');                        
          })         
          .catch((error) => {
              console.error("API request failed", error);
          }); 
  }
  const handleEdit = (val) => {
  
    const Id=val;
    const edit='/clientadd/'+Id;
    console.log(edit);
    navigate(edit);
    
}

  const exportData = records.map((record) => ({
    ClientId: record.clientId,
    ClientName: record.clientName,
    Phone: record.phone,
    Address: record.address,
    Gst: record.gst,
    Website: record.website,
    ContactPerson: record.contactPerson,
  }));

  return (
    <div className='container-allmaster' style={{ backgroundColor: "white" }}>
      <div>
          <p className='heading'>Client Master</p>
        </div>
      <div style={{ display: 'flex', justifyContent: 'left' }}>
      </div>
      {/* <Sweetalerttododelete isVisible={isDeleteAlertVisible} toggleVisibility={setDeleteAlertVisibility} /> */}
      <DataTable
        columns={column}
        data={records}
        customStyles={customStyles}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 20]}

        fixedHeader
        selectableRowsHighlight
        highlightOnHover
        actions={
        <div>
          <Link to='/clientadd'>
          <Button variant="outline-success"><Plus/>Add New</Button>{' '}</Link>
          <ExcelExport data={exportData} fileName="Client" /> &nbsp;
          <Link to='/dashboard'>
          <Button variant="outline-danger"><ArrowLeftCircleFill/>Back</Button>{' '}</Link>        
            </div>          
        }        
        subHeader
        subHeaderComponent={
          <input type='text' className='w-25 form-control' placeholder='Search' onChange={handlefilter}></input>
        }
        subHeaderAlign='right'
      >
      </DataTable>

    </div>
  );
}

export default Client;
