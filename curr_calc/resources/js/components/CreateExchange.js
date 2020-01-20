import React, {Component} from "react";
import {fetchCreate} from "./funcs/fetchFuncs";
class CreateExchange extends Component {
constructor(){
    super();
    this.state={
      baseCur:" ",
      targetCur:" ",
      rate:null,
      reverse:true,
      msg:""
    }

    this.fetchCreate=fetchCreate.bind(this);
    this.handleInputFrom=this.handleInputFrom.bind(this);
    this.handleInputTo=this.handleInputTo.bind(this);
    this.handleInputEx=this.handleInputEx.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
}


handleInputFrom(e){
  this.setState({baseCur:e.target.value})
}
handleInputTo(e){
  this.setState({targetCur:e.target.value})
}
handleInputEx(e){
  this.setState({rate:e.target.value})
}
onSubmit(e){
  e.preventDefault();
  this.setState({reverse:true});
  this.fetchCreate();
}

render(){

    return(
  <div>
    <form>
      <label>Base Currency:
        <input onChange={this.handleInputFrom} name="From" type="text"/>
      </label>
      <br/>

      <label>Target Currency:
        <input onChange={this.handleInputTo} name="To" type="text"/>
      </label>
      <br/>

      <label>Exchange Rate:
        <input onChange={this.handleInputEx} name="ExValue" type="number" step="0.00001"/>
      </label>
      <br/>

      <button className="createbtn" type="button" onClick={this.onSubmit}>Submit</button>
       <br/>
      {this.state.msg}
    </form>
  </div> );

  }
}

export default CreateExchange;
