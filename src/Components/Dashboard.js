import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { CardList, PersonFillAdd, PeopleFill, GraphUpArrow, ExclamationTriangle, CheckLg, CardHeading, TrashFill } from 'react-bootstrap-icons';
import { Link ,useNavigate} from 'react-router-dom';
function Dashboard() {
    const navigate = useNavigate();
    const [records, setRecords] = useState(null);
    const [dashboardDetails, setDashboardDetails] = useState({
        totalClients: '',
        totalEmployees: '',
        totalCategories: '',
        totalTasks: '',
        yetToStartTasks: '',
        inProgressTasks: '',
        completedTasks: '',
        inCompletedTasks: '',
        inActiveTasks: '',
        totalUsers: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://catodotest.elevadosoftwares.com/Dashboard/GetAdminDashboardDtls');
                setRecords(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        // When records change, update the dashboardDetails state with the data
        if (records) {
            setDashboardDetails({
                totalClients: records.totalClients,
                totalEmployees: records.totalEmployees,
                totalCategories: records.totalCategories,
                totalTasks: records.totalTasks,
                yetToStartTasks: records.yetToStartTasks,
                inProgressTasks: records.inProgressTasks,
                completedTasks: records.completedTasks,
                inCompletedTasks: records.inCompletedTasks,
                inActiveTasks: records.inActiveTasks,
                totalUsers: records.totalUsers
            });
        }
    }, [records]);

    const handleInput = (e) => {
        setDashboardDetails({ ...dashboardDetails, [e.target.name]: e.target.value });
    }
    const handleYetToStart = () => {
  
        const TaskStatus="Yet to Start";
     const edit='/taskdetails/'+TaskStatus;
        navigate(edit);
        
    }
    const handleInProgress = () => {
     const TaskStatus="In Progress";
     const edit='/taskdetails/'+TaskStatus;
        navigate(edit);
    }
    const handleCompleted = () => {
        const TaskStatus="Completed";
        const edit='/taskdetails/'+TaskStatus;
           navigate(edit);
       }
       const handleDueTasks = () => {
        const DueTasks=["In Progress" && "Yet to Start" ]
        const TaskStatus=DueTasks;
        const edit='/taskdetails/'+TaskStatus;
           navigate(edit);
       }
  
      
    

       const handleInactive = () => {
        const TaskStatus="InActive";
        const edit='/taskdetails/'+TaskStatus;
           navigate(edit);
       }
    return (
        <div className='container-allmaster'>
            <div>
          <p className='heading'>DASHBOARD </p>
        </div>
            <div >
                <Container>
                    <Form >
                        <Row>
                            <Col md="6"><b>MASTERS</b>
                                <hr />
                                <Row>
                                    <Col><Link to='/category'>
                                        <Button className='b' variant="outline-info"><CardList /></Button>{' '}</Link>
                                    </Col>
                                    <Col>Category</Col>

                                    <Col><Link to='/category'>
                                        <Button className="rounded-circle" variant="info">
                                            {dashboardDetails.totalCategories}
                                        </Button>{' '}</Link>
                                    </Col>


                                </Row>
                                <hr />
                                <Row>
                                    <Col><Link to='/client'>
                                        <Button className='b ' variant="outline-info"><PersonFillAdd /></Button>{' '}
                                    </Link>
                                    </Col>
                                    <Col>Client
                                    </Col>
                                    <Col>
                                        <Link to='/client'><Button className="rounded-circle" variant="info">
                                            {dashboardDetails.totalClients}
                                        </Button>{' '}</Link>
                                    </Col>

                                </Row>
                                <hr />
                                <Row>
                                    <Col>
                                        <Link to='/employee'><Button className='b' variant="outline-info"><PeopleFill /></Button>{' '}
                                        </Link>
                                    </Col>
                                    <Col>Employee
                                    </Col>
                                    <Col><Link to='/employee'><Button className="rounded-circle" variant="info">
                                        {dashboardDetails.totalEmployees}
                                    </Button>{' '}</Link>
                                    </Col>

                                </Row>

                            </Col>
                            <Col md="6"><b>TASK STATUS</b>
                                <hr />
                                <Row>
                                    <Col><Button className='b' variant="outline-primary"><GraphUpArrow /></Button>{' '}
                                    </Col>
                                    <Col>Yet to Start
                                    </Col>
                                    <Col><Button className="rounded-circle" variant="primary" onClick={handleYetToStart}>
                                        {dashboardDetails.yetToStartTasks}</Button>{' '}
                                    </Col>

                                </Row> <hr />
                                <Row>
                                    <Col><Button className='b' variant="outline-danger"><ExclamationTriangle /></Button>{' '}
                                    </Col>
                                    <Col>In Progress
                                    </Col>
                                    <Col><Button className="rounded-circle" variant="danger" onClick={handleInProgress}>
                                        {dashboardDetails.inProgressTasks}</Button>{' '}
                                    </Col>

                                </Row> <hr />
                                <Row>
                                    <Col><Button className='b' variant="outline-success"><CheckLg /></Button>{' '}
                                    </Col>
                                    <Col>Completed
                                    </Col>
                                    <Col><Button className="rounded-circle" variant="success" onClick={handleCompleted}>
                                        {dashboardDetails.completedTasks}</Button>{' '}
                                    </Col>

                                </Row> <hr />
                                <Row>
                                    <Col ><Button className='b' variant="outline-info" ><CardHeading /></Button>{' '}
                                    </Col>
                                    <Col>Due Tasks
                                    </Col>
                                    <Col><Button className="rounded-circle" onClick={handleDueTasks}variant="info">
                                        {dashboardDetails.inCompletedTasks}</Button>{' '}
                                    </Col>

                                </Row> <hr />
                                <Row>
                                    <Col ><Button className='b' variant="outline-warning"><TrashFill /></Button>{' '}
                                    </Col>
                                    <Col >In Active Tasks
                                    </Col>
                                    <Col><Button className="rounded-circle" variant="warning" onClick={handleInactive}>
                                        {dashboardDetails.inActiveTasks}</Button>{' '}
                                    </Col>
                                    
                                </Row>

                            </Col>

                        </Row>
                        <br />
                        <br />

                        <Row>
                            <Col md="6"><b>ALLOCATION</b>
                                <hr />
                                <Row>
                                    <Col><Link to='/taskalloc'>
                                        <Button className='b' variant="info"><CardList /></Button>{' '}
                                    </Link>
                                    </Col>
                                    <Col>Allocation
                                    </Col>
                                    <Col><Link to='/taskalloc'><Button className="rounded-circle" variant="info">
                                        {dashboardDetails.totalTasks}</Button>{' '}</Link>
                                    </Col>

                                </Row>

                            </Col>



                            <Col md="6"><b>USERS</b>
                                <hr />
                                <Row>
                                    <Col><Link to='/userdetails'>
                                        <Button className='b' variant="outline-warning"><PeopleFill /></Button>{' '}
                                        </Link>
                                    </Col>
                                    <Col>Users
                                    </Col>
                                    <Col><Link to='/userdetails'><Button className="rounded-circle" variant="warning">
                                        {dashboardDetails.totalUsers}</Button>{' '}</Link>
                                    </Col>

                                </Row>

                            </Col>
                        </Row>

                    </Form>
                </Container>
            </div>
        </div>
    );
}
export default Dashboard;