import React, { Component , useState } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Dropdown,Badge,Modal} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import { Button } from 'react-bootstrap';


class ShowTickets extends Component {
  constructor() {
    super()
    this.state = {
     data:[],
     show:false,
     message:'',
     id:'',
     search:'',

    }
    this.handleChange = this.handleChange.bind(this)
  }

  getTicket = test => {
    return axios
      .get('tickets/getTicketAll', {
        
      })
      .then(response => {
     
        this.setState({
            data:response.data,
            
        })

        let names=[]
      
        response.data.map((item)=>{
          names.push(item.name)
          
        })
        this.setState({
            namesData:names
        })
        console.log(response.data)
        return response.data
        
      })
      .catch(err => {
        console.log(err)
      })
  }

 
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }


  handleClose (id,messages){

    this.setState({
      show:false,

    }
  
    );

  } 
  
  editSearchTerm= (e)=>{

    if(e.target.value){
      this.setState({search:e.target.value})
    
      const newData = this.state.data.filter((item) => {
        const itemData = `${item.name.toUpperCase()} ${item.name.toUpperCase()} ${item.name.toUpperCase()}`;
        const textData = e.target.value.toUpperCase();
    
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        data: newData,
      });
    }
    else{
      this.setState({
        search:'',
      });
      this.getTicket()
    }
  
   
    
    
    
    
 
  }

  handleAddMessage (id,messages){

    this.addMessage(id,messages)

    this.setState({
      show:false,

    }
    
    );
    this.getTicket()

  } 
  handleShow = (id) => this.setState({show:true,id:id});


  componentDidMount() {


    const token = localStorage.usertoken
    const decoded = jwt_decode(token)

    this.getTicket()

    this.setState({
        role: decoded.role,
      })



    
  
 
    
  }

  changeStatus (id,status) {
    return axios
      .put('tickets/changeStatus', {
        id,
        status
        
      })
      .then(response => {
   
        this.getTicket()
        return response.data
        
      })
      .catch(err => {
   
        console.log(err)
      })
  } 
  statusFilter (status) {
    return axios
      .post('tickets/filterStatus', {
        status
      })
      .then(response => {
      
        this.setState({
            data:response.data,
            
        })
   

        return response.data
        
      })
      .catch(err => {
        console.log(err)
      })
  }

  addMessage (id,messages) {
    return axios
      .post('tickets/addMessages', {
        id,messages
      })
      .then(response => {
        
  
        this.setState({
            data:response.data,
            
        })
 
        return response.data
        
      })
      .catch(err => {
        console.log(err)
      })
  }

  


  statusName(status) {
    switch(status) {
      case 0:
        return <h5><Badge pill variant="primary">Opening</Badge></h5>
        case 1:
          return <h5><Badge pill variant="danger">Waiting</Badge></h5>
          case 2:
            return <h5><Badge pill variant="success">Closed</Badge></h5>
      default:
        return <h5><Badge pill variant="primary">Opening</Badge></h5>
    }
  }

  MakeItem = function(X) {
    console.log(X)
    return <option>{X}</option>;
};








 


  render() {

    return (
      <div className="container">
          {this.state.role === 1 ?
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">ADMIN PAGE<br></br>TICKETS</h1>
          </div>
          
          <Button variant="primary" className="mx-1" onClick={()=>this.statusFilter(0)}>Opening</Button>
          <Button variant="danger" className="mx-1" onClick={()=>this.statusFilter(1)}>Waiting</Button>
          <Button variant="success" className="mx-1" onClick={()=>this.statusFilter(2)}>Closed</Button>
          <Button variant="dark" className="mx-1" onClick={()=>this.getTicket()}>ALL</Button>
          <input style={{float:"right"}} value={this.state.search} placeholder="Search TicketName" type="text" onChange={this.editSearchTerm}/>
          <TableContainer component={Paper}>
      
      <Table size="small" aria-label="a dense table">

        <TableHead>
          <TableRow>
            
            <TableCell>TicketName</TableCell>
            <TableCell align="right">Content</TableCell>
            <TableCell align="right">İmage</TableCell>
            <TableCell align="right">Message</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Change Status</TableCell>
            <TableCell align="right" >Add Message</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody> 
              
      {this.state.data.length>0 && this.state.data.map((row,index)=>
         <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.content}</TableCell>
              <TableCell align="right"><a target="_parent" href={`http://localhost:5000/public/${row.img}`}><img width="100px" src={`http://localhost:5000/public/${row.img}`}></img></a></TableCell>
          
              {row.messages.map((message)=>
              <>
              <span>{message.text}</span>
                <br/>
                </>
              )}
              <TableCell align="right">{this.statusName(row.status)}</TableCell>
              
              <TableCell align="right"><Dropdown>
<Dropdown.Toggle    size="sm" variant="success" id="dropdown-basic">
    Change Status
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item  onClick={()=>this.changeStatus(row._id,0)}>Opening</Dropdown.Item>
    <Dropdown.Item onClick={()=>this.changeStatus(row._id,1)}>Waiting</Dropdown.Item>
    <Dropdown.Item onClick={()=>this.changeStatus(row._id,2)}>Closed</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown></TableCell>
<TableCell align="right">   <>
      <Button    name="addButton" size="sm" variant="primary" onClick={()=>this.handleShow(row._id)}>

        Add Message
      </Button> 

      

      <Modal show={this.state.show} onHide={()=>this.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Add Message </Modal.Title>
        </Modal.Header>
        <Modal.Body><form>
  <label>
    Message : 
    <input type="text" name="message" value={this.state.message} onChange={this.handleChange} />
  </label>
</form>
</Modal.Body> 
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>this.handleClose()}>
            Close
          </Button>

          <Button variant="primary"  onClick={()=>this.handleAddMessage(this.state.id,this.state.message)}>
            Add Message
          </Button>
        </Modal.Footer>
      </Modal>
    </>
</TableCell>

            </TableRow>
      )} </TableBody>
      </Table>
    </TableContainer>
  </div>:
        <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">USER PAGE<br></br>TICKETS</h1>
        </div>
       
        <TableContainer component={Paper}>
    <Table size="small" aria-label="a dense table">

      <TableHead>
        <TableRow>
          
          <TableCell>TicketName</TableCell>
          <TableCell align="right">Content</TableCell>
          <TableCell align="right">İmage</TableCell>
          <TableCell align="right">Message</TableCell>
          <TableCell align="right">Status</TableCell>
          <TableCell align="right" >Add Message</TableCell>
          
        </TableRow>
      </TableHead>
      <TableBody> 
            
    {this.state.data.length>0 && this.state.data.map((row,index)=>
       <TableRow key={index}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.content}</TableCell>
            <TableCell align="right"><a target="_parent" href={`http://localhost:5000/public/${row.img}`}><img width="100px" src={`http://localhost:5000/public/${row.img}`}></img></a></TableCell>
            {row.messages.map((message)=>
              <>
              <span>{message.text}</span>
              
                <br/>
                </>
              )}
            <TableCell align="right">{this.statusName(row.status)}</TableCell>
            
<TableCell align="right">   <>
    <Button    name="addButton" size="sm" variant="primary" onClick={()=>this.handleShow(row._id)}>

      Add Message
    </Button> 

    

    <Modal show={this.state.show} onHide={()=>this.handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Message</Modal.Title>
      </Modal.Header>
      <Modal.Body><form>
<label>
  Message : 
  <input type="text" name="message" value={this.state.message} onChange={this.handleChange} />
</label>
</form>
</Modal.Body> 
      <Modal.Footer>
        <Button variant="secondary" onClick={()=>this.handleClose()}>
          Close
        </Button>
   
        <Button variant="primary"  onClick={()=>this.handleAddMessage(this.state.id,this.state.message)}>
          Add Message
        </Button>
      </Modal.Footer>
    </Modal>
  </>
</TableCell>

          </TableRow>
    )} </TableBody>
    </Table>
  </TableContainer>
</div>
        }
      </div>
    )
  }
}

export default ShowTickets