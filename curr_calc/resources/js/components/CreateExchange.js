import React, {Component} from "react";

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

    this.create=this.create.bind(this);
    this.handleInputFrom=this.handleInputFrom.bind(this);
    this.handleInputTo=this.handleInputTo.bind(this);
    this.handleInputEx=this.handleInputEx.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
}

create(){
  /*Convert currency object into a string*/
  var currString=JSON.stringify(this.state);
  console.log(currString)
  /*Fetch API for post request */
  fetch( '/api/create/', {
     method:'post',
     /* headers*/
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     /*Body headers*/
     body: currString

   })
  .then(response => {
   /*Reverse the state and create the reverse exchange rate*/
   if(this.state.reverse){
   this.setState({targetCur:this.state.baseCur,
                  baseCur:this.state.targetCur,
                  rate:1/this.state.rate,
                  reverse:false})
  //call create again to create the reverse exchange rate
   this.create();
 }
     if(response.status===201){
       this.setState({msg:"Added successfully"})
       console.log("Added successfully")}
     return response.json();
 })
 .catch(error => {
  console.log(error);
  });
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
  this.create();
}

render(){

    return(
  <div>
    <form>
      <input onChange={this.handleInputFrom} name="From" type="text"/>
      <input onChange={this.handleInputTo} name="To" type="text"/>
      <input onChange={this.handleInputEx} name="ExValue" type="number" step="0.00001"/>
      <br/>
      <button type="button" onClick={this.onSubmit}>Submit</button>
      {this.state.msg}
    </form>
  </div> );

  }
}

export default CreateExchange;
