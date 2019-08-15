import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {InputBase} from '@material-ui/core';
import {chat_message } from '../actions/action';
import '../css/bootstrap.min.css';
    
class Message extends Component {
  constructor(props) {
    super(props);

    const {socket} = this.props;
    const {dispatch} = this.props;

    this.keyPress = this.keyPress.bind(this);

    socket.on('listchatmessage',(res)=>{
      dispatch(chat_message(res));
    });

    socket.on('updatemessage',(res)=>{
      if(this.props.chat !== undefined){
        this.props.socket.emit('chatselected',this.props.chat);
      }
    });
  }

  style(){
    return { overflow: "scroll", height:"465px"}
  }

  keyPress(e){
    if(e.keyCode === 13 && e.target.value!==null){
      this.props.socket.emit('new_message',{userid:this.props.user.userid,
                                 chatid:this.props.chat.chatid,
                                 message:e.target.value});
      e.target.value='';
    }
  }

  listMessage(){
    if(typeof this.props.message !== 'undefined' ){
      let messages=this.props.message;
       return messages.map((data,j)=>{
          return( <h6 class="card-title" key={j}>{data.user}: {data.message}</h6>);
          })   
    }
    else{
      return(<h6 class="card-title">{''}</h6>);
    }
  }

  render(){
    return (
      <>
        <div class="row" >  
            <div class="col-12"> 
                <h5>
                  {typeof this.props.chat !== 'undefined'?('Message: '+this.props.chat.name):'Message'}
                </h5>
            </div>
        </div>

        <div class="row border" style={this.style()}>
          <div class="col border">
            {this.listMessage()}
          </div>
        </div>
      
        <div class="row border" >
          <div class="col border"> 
              <InputBase 
                fullWidth 
                placeholder="New Messag"
                disabled= {typeof this.props.chat !== 'undefined'?false:true}
                onKeyDown={this.keyPress}
                />
          </div>
        </div>
       </>
    );
  }
} 

const mapStateToProps = state =>({
  chat: state.chat,
  user: state.user,
  message: state.message,
  socket: state.socket
});

export default connect(mapStateToProps)(Message);
