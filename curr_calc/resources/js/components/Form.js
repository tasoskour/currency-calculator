import React, { Component } from 'react';

class Form extends Component{

constructor(){
super();

this.state={
currencies:[],
bCurrency:"",
tCurrency:"",
rate:null,
}

this.handleBaseCurrSelection=this.handleBaseCurrSelection.bind(this);
this.handleTargetCurrSelection=this.handleTargetCurrSelection.bind(this);
}

componentDidMount(){
//After the first render, all the currencies being fetched from the api
fetch("/api/baseCurrency")
.then(response => {
      return response.json();
       })
       .then(currencies => {
           //Fetched currencies are stored in the state
           this.setState({ currencies});
       })
       .catch(error => {
      console.log(error);
    });
}

handleBaseCurrSelection(e){
this.setState({bCurrency:e.target.value});
console.log(this.state.bCurrency);
/*if(this.state.bCurrency===this.state.tCurrency){
this.setState(prevState => ({tCurrency:prevState.bCurrency}));
}*/
}

handleTargetCurrSelection(e){
this.setState({tCurrency:e.target.value});
console.log(this.state.tCurrency);
}


render() {
/*Option for every different currency using map*/
var dropDownCur=this.state.currencies.map((currency)=><option key={currency.id} value={currency.name}>{currency.name}</option>)

return(
  <div>
  <form>
  {/*Input for the amount which will be converted*/}
  <input  type="number" step="0.00001"/>

  {/*Dropdown list for the base currency*/}
  <select onChange={this.handleBaseCurrSelection}>
   {dropDownCur}
  </select>

  {/*Dropdown list for the target currency*/}
  <select id="target" onChange={this.handleTargetCurrSelection}>
    {dropDownCur}
  </select>
  </form>
  </div>
);}

}

export default Form;
