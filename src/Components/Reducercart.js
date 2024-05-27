import { useContext } from "react";
import { CountContext } from "../App";
import { Button } from "react-bootstrap";
import {
    Plus, 
    PencilSquare,
    Trash3,
    CardList,
    StickyFill,
    Check2,
    X,
  } from "react-bootstrap-icons";
function Cartreducer(){
    const {count,dispatch}=useContext(CountContext)
    return(
        <div className='container-allmaster'>
           
            <p className="heading">Cart</p>
            <br/>
        
            <Button variant="outline-success"onClick={(e)=>dispatch("increment")}><i><Plus/></i>  Add to Cart</Button> &nbsp;
<Button variant="outline-danger"onClick={(e)=>dispatch("decrement")}><i><Trash3/></i> Remove from Cart</Button>  &nbsp;
<Button variant="outline-info"onClick={(e)=>dispatch("reset")}> Reset</Button>
        </div>
    );
}
export default Cartreducer;