import React, { Component } from 'react';

class Form extends Component{

constructor(){
super();

this.state={
  value:null,
  result:null,
currencies:[],
tCurrencies:[],
bCurrency:"Euro",
tCurrency:"",
rate:null,
fetchTarget:false,
fetchRate:false,
}

this.handleBaseCurrSelection=this.handleBaseCurrSelection.bind(this);
this.handleTargetCurrSelection=this.handleTargetCurrSelection.bind(this);
this.getExchangeRate=this.getExchangeRate.bind(this);
this.getTargetCurrency=this.getTargetCurrency.bind(this);
this.inputHandler=this.inputHandler.bind(this);
}

componentDidMount(){
  //After the first render, all the currencies being fetched from the api
  fetch("/api/baseCurrency")
    .then(response => {
      return response.json();
    })
    .then(currencies => {
           console.log("DATA:"+currencies[0]);
            //Fetched currencies are stored in the state
            this.setState({ currencies:currencies,bCurrency:currencies[0].baseCur,fetchTarget:true});
    })
    .catch(error => {
      console.log("Error:"+error);
    });
}

componentDidUpdate(prevState){
this.getExchangeRate();
this.getTargetCurrency();
}

getTargetCurrency(){
  if(this.state.fetchTarget===true){
  fetch("/api/targetCurrency/"+this.state.bCurrency)
   .then(response => {
        return response.json();
          })
          .then(tCurr => {
              this.setState({ tCurrencies:tCurr,tCurrency:tCurr[0].targetCur,fetchTarget:false,fetchRate:true});
          })
          .catch(error => {
         console.log("Error:"+error);
       });
}}
getExchangeRate(){

    if(this.state.fetchRate===true){
      console.log("FIND");
    fetch("/api/exrates/"+this.state.bCurrency+"/"+this.state.tCurrency)
     .then(response => {
       console.log(response);
          return response.json();
        })
      .then(exrate => {
                this.setState({ rate:exrate.rate,fetchRate:false});
        })
      .catch(error => {
           console.log("Error:"+error);
          });
  }

}
handleBaseCurrSelection(e){

this.setState({bCurrency:e.target.value,fetchTarget:true});
console.log(this.state.bCurrency);
console.log(this.state.rate);
}

handleTargetCurrSelection(e){
this.setState({tCurrency:e.target.value,fetchRate:true});
console.log(this.state.tCurrency);
}

inputHandler(e){
let result=this.state.rate*e.target.value
this.setState({result:result,value:e.target.value})
}

render() {
/*Option for every different currency using map*/
var bDropDownCur=this.state.currencies.map((currency)=><option key={currency.baseCur} value={currency.baseCur}>{currency.baseCur}</option>)
var tDropDownCur=this.state.tCurrencies.map((currency)=><option key={currency.id} value={currency.targetCur}>{currency.targetCur}</option>)

return(
  <div>
  <form>
  {/*Input for the amount which will be converted*/}
  <input  onChange={this.inputHandler} type="number" step="0.01"/>
    <output onChange={this.inputHandler}>{this.state.rate}</output>
  {/*Dropdown list for the base currency*/}
  <select onChange={this.handleBaseCurrSelection}>
   {bDropDownCur}
  </select>

  {/*Dropdown list for the target currency*/}
  <select id="target" onChange={this.handleTargetCurrSelection}>
    {tDropDownCur}
  </select>

  <output >{this.state.result}</output>
  </form>
  </div>
);}

}

export default Form;
