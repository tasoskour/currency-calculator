import React, {Component} from "react";


class CreateButton extends Component {
constructor(){
super();
this.state={
  currency:{name:"Marko"},
}

this.create=this.create.bind(this)
}

create(){
  /*Convert currency object into a string*/
var currString=JSON.stringify(this.state.currency);

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
     return response.json();
 })
 .catch(error => {
  console.log(error);
  });

}

render(){

    return(

      <button onClick={this.create}>Add new currency</button>);
  }
}

export default CreateButton;
