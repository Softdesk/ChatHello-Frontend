import React from 'react';
import {Component} from 'react';
import { Button,Modal,Row,Col,Badge,Nav} from 'react-bootstrap';
import {ListItem,ListItemText} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import {connect} from 'react-redux'
import {login_user,logout_user,list_user,list_chat} from '../actions/action'
import '../css/bootstrap.min.css';

class Header extends Component {
  constructor(props,context){
      super(props,context);

      const {socket} = this.props;
      const {dispatch} = this.props;

      this.newClose =this.newClose.bind(this);
      this.newShow =this.newShow.bind(this);
      this.loginClose =this.loginClose.bind(this);
      this.loginShow =this.loginShow.bind(this);
      this.logoutClose =this.logoutClose.bind(this);
      this.logoutShow =this.logoutShow.bind(this);
      this.newUser=this.newUser.bind(this);
      this.validLogin=this.validLogin.bind(this);
      this.validLogout=this.validLogout.bind(this);
      this.listusers=this.listusers.bind(this);

      this.newChat =this.newChat.bind(this);
      this.newChatClose =this.newChatClose.bind(this);
      this.newChatShow =this.newChatShow.bind(this);
      this.toggleCheckbox=this.toggleCheckbox.bind(this);
      

      this.selectedCheck = new Set();
      
      this.state={
        logoutshow:false,
        newshow:false,
        newchatshow:false,
        loginshow:false,
      };

      socket.on('ok_newchat',(res)=>{
        this.newChatClose();
      });

      socket.on('error_newuser',(res)=>{
        alert(res);
      });

      socket.on('ok_newuser',(res)=>{
        alert(res);
        this.newClose();
      });

      socket.on('error_login',(res)=>{
        alert(res);
      });

      socket.on('ok_login',(res)=>{
        dispatch(login_user(res));
        this.loginClose();
      });

      socket.on('ok_listuser',(res)=>{
        dispatch(list_user(res));
      });

      socket.on('updatlistuser',(res)=>{
        if(this.props.user !== undefined ){
          let userid=this.props.user.userid;
          this.props.socket.emit('listuser',{userid});
        }
      });

      socket.on('ok_listchat',(res)=>{
        dispatch(list_chat(res));
      });

      socket.on('updatlistchat',(res)=>{
        if(this.props.user !== undefined ){
          let userid=this.props.user.userid;
          this.props.socket.emit('listchat',{userid});
        }
      });
      
}

toggleCheckbox(value){
  if (this.selectedCheck.has(value)) {
    this.selectedCheck.delete(value);
  } else {
    this.selectedCheck.add(value);
  }
}

listusers(){
  if(typeof this.props.users !== 'undefined' ){
    return this.props.users.map((data,j)=>{
        return( 
          <ListItem dense button >
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                onClick={()=>this.toggleCheckbox(data.userid)}
              />
            </ListItemIcon>
            <ListItemText id={data.user} primary={data.name} />
            </ListItem>
          );
        })          
  }
}

newChat(e){
  let name=this.name.value;
  let userid=this.props.user.userid;
  let users=[];
  
  for(let userid of this.selectedCheck){
    users.push({userid});
  }         

  if(name===''|| users.lentgh===0){
    alert('Required fields: Name chat,User')
  }
  else{
    users.push({userid});
    this.props.socket.emit('newchat',{name,users,userid});
  }

}

newUser(e){
  const user=this.user.value;
  const name=this.name.value;
  const password=this.password.value;
  
  if(user===''|| name==='' || password===''){
    alert('Required fields: User,Name,Password')
  }
  else{
      this.props.socket.emit('newuser',{ user,name,password});
  }  
}

validLogin(e){
  let user=this.user.value;
  let password=this.password.value;
  
  if(user==='' || password===''){
    alert('Required fields: User,Password')
  }
  else{
      this.props.socket.emit('login',{ user,password});
  }  
}

validLogout(){
  this.props.dispatch(logout_user());
  this.logoutClose();
}

newChatClose(){
  this.setState({newchatshow:false});
}

newChatShow(){
  this.setState({newchatshow:true});
}

newClose(){
  this.setState({newshow:false});
}

newShow(){
  this.setState({newshow:true});
}

loginClose(){
  this.setState({loginshow:false});
}

loginShow(){
  this.setState({loginshow:true});
}

logoutClose(){
  this.setState({logoutshow:false});
}

logoutShow(){
  this.setState({logoutshow:true});
}

style(){
   return {
      background: "#5DADE2",
      width:"100%", 
      height:"50px",
   }
};

styleCheck(){
  return { overflow: "scroll", height:"350px"}
}

styleNavLink(){
  return {
      color: "#FDFEFE"
  }
};

link(){
  if(this.props.user===undefined){
     return (
      <Nav as="ul"> 
        <Nav.Link style={this.styleNavLink()} onClick={this.loginShow} >Login</Nav.Link>
        <Nav.Link style={this.styleNavLink()} onClick={this.newShow} >New User</Nav.Link>
      </Nav>      
      )
  }
  else{
    return(
      <Nav as="ul">
        <Nav.Link style={this.styleNavLink()}>{this.props.user.name}</Nav.Link>
        <Nav.Link style={this.styleNavLink()} onClick={this.newChatShow} >New Chat</Nav.Link>
        <Nav.Link style={this.styleNavLink()} onClick={this.logoutShow} >Logout</Nav.Link>
      </Nav>
    )
  }
}

render(){

  return (
  <div style={this.style()}>
    <Row>
        <Col xs={2}> <h2> <Badge style={this.styleNavLink()}> CHATHELLO </Badge></h2></Col>
        <Col xs={10}>  {this.link()} </Col>
    </Row>

    <Modal show={this.state.logoutshow} onHide={this.logoutClose} animation={true} enforceFocus={false}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.logoutClose}>
            Close
          </Button>
          <Button variant="danger" onClick={this.validLogout}>
           Logout
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={this.state.loginshow} onHide={this.loginClose} animation={true}>
      <form  autoComplete="off" >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <Col> 
            <label>User</label>
            <input type="text" required className="form-control" ref={(c) => this.user = c} name="user" />
          </Col>
          <Col>
            <label>Password</label>
            <input type="Password" required  className="form-control" ref={(c) => this.password = c} name="password" />
          </Col>
        </Row>
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.loginClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.validLogin} >
             Login
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    
      <Modal show={this.state.newshow} onHide={this.newClose} animation={true}>
      <form  autoComplete="off" >
        <Modal.Header closeButton>
          <Modal.Title>New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <Col> 
            <label>User</label>
            <input type="text" required className="form-control" ref={(c) => this.user = c} name="user" />
          </Col>
          <Col>
            <label>Name</label>
            <input type="text" required className="form-control" ref={(c) => this.name = c} name="name" />
          </Col>
          <Col>
            <label>Password</label>
            <input type="Password" required  className="form-control" ref={(c) => this.password = c} name="password" />
          </Col>
        </Row>
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.newClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.newUser} >
             New
          </Button>
        </Modal.Footer>
        </form>
      </Modal>

      <Modal show={this.state.newchatshow} onHide={this.newChatClose} animation={true}>
      <form  autoComplete="off" >
        <Modal.Header closeButton>
          <Modal.Title>New Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <Col xs={4}> 
            <label>Name chat</label>
          </Col>
          <Col xs={8} > 
            <input type="text" required className="form-control" ref={(c) => this.name = c} name="name" />
          </Col>
        </Row>
        
        <div class="row">
          <div class="col"> 
              <List style={this.styleCheck()}>
                {this.listusers()}
              </List>
          </div>
        </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.newChatClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.newChat} >
             Save
          </Button>
        </Modal.Footer>
        </form>
      </Modal>

    </div>
  );
}
} 

const mapStateToProps = state =>({
  user: state.user,
  users: state.users,
  socket: state.socket
});

export default connect(mapStateToProps)(Header);