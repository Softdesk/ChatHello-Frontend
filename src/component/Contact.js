import React from 'react';
import {Component} from 'react';
import {InputBase,List,ListItem,ListItemText} from '@material-ui/core';
import {connect} from 'react-redux'
import {selected_chat} from '../actions/action'
import '../css/bootstrap.min.css';

class Contact extends Component {
  
  constructor(props){
    super(props);

    this.chatSelected=this.chatSelected.bind(this);
  }
  
  chatSelected(data){
    this.props.dispatch(selected_chat(data))
    this.props.socket.emit('chatselected',data);
  }

  listchat(){
    if(typeof this.props.chats !== 'undefined' ){
       return this.props.chats.map((data,j)=>{
          return( 
            <ListItem button>
                <ListItemText key={j} primary={data.name} onClick={()=>this.chatSelected(data)}/>
            </ListItem>
            );
          })   
    }
  }

  style(){
    return { overflow: "scroll", height:"460px"}
  }

  render(){
  
    return (
      <>

        <div class="row" >  
            <div class="col-12"> 
                <h5>
                  Chats
                </h5>
            </div>
        </div>

        <div class="row border">
          <div class="col border"> 
              <List style={this.style()}  aria-label="mailbox folders">
                {this.listchat()}
              </List>
          </div>
        </div>
        <div class="row border" >
            <div class="col border"> 
              <InputBase fullWidth
              disabled= {typeof this.props.chat !== 'undefined'?false:true}
              placeholder="Search contact or groups"/>
            </div>
        </div>      
    </>
    );
    }
} 

const mapStateToProps = state =>({
  chats:state.chats,
  user:state.user,
  socket: state.socket
});

export default connect(mapStateToProps)(Contact);