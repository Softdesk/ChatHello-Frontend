import React from 'react';
import {Component} from 'react';
import '../css/bootstrap.min.css';

class Footer extends Component {

render(){
  const style={
    background: "#5DADE2",
    color: "#FDFEFE",
  };

  return (
<div class="row">
  <div class="col-12">
    <div class="card" style={style}>
      <div class="card-body">
        <p class="card-text">Technical test Condor Labs: Gustavo Beltran Carrington</p>
      </div>
    </div>
  </div>
  </div>
  );
}
} 

export default Footer;
