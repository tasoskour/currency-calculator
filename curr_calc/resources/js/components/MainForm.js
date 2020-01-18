import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Form from "./Form"

class MainForm extends Component{

constructor(){
  super();

  this.state={
    value:null,
    result:null,
    currencies:[],
    tCurrencies:[],
    bCurrency:"",
    tCurrency:"",
    rate:null,
    index:0,
    upCurrency:{baseCur:"",
                targetCur:"",
                rate:null,
                reverse:false},
    fetchTarget:false,
    rateChanged:false,
    editing:false,
    msg:""
  }

this.handleBaseCurrSelection=this.handleBaseCurrSelection.bind(this);
this.handleTargetCurrSelection=this.handleTargetCurrSelection.bind(this);
this.getTargetCurrency=this.getTargetCurrency.bind(this);
this.inputHandler=this.inputHandler.bind(this);
this.redirectToCreate=this.redirectToCreate.bind(this);
this.update=this.update.bind(this);
this.handleRateEdit=this.handleRateEdit.bind(this);
this.editButton=this.editButton.bind(this);
this.handleBaseCurrencyEdit=this.handleBaseCurrencyEdit.bind(this);
this.handleTargetCurrencyEdit=this.handleTargetCurrencyEdit.bind(this);
this.getExchangeRate=  this.getExchangeRate.bind(this)
this.onCreate=this.onCreate.bind(this)
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
      console.log("Error1:"+error);
    });
}

componentDidUpdate(){

//When state changes and fetchTarget===true the target currency is being fetched
    if(this.state.fetchTarget===true){
    this.getTargetCurrency();}

//When exchange rate changes the result is being changed
    if(this.state.rateChanged){
      let result=this.state.rate*this.state.value
      this.setState({result:result,rateChanged:false})
    }
}

/*Method to fetch the target currencies for the current base currency and
save the complete exchange rate objects to tCurrencies, also establishes the first
target currency and exchange rate as current */

getTargetCurrency(){
  fetch("/api/targetCurrency/"+this.state.bCurrency)
   .then(response => {
        return response.json();
          })
   .then(tCurr => {
              this.setState({ tCurrencies:tCurr,
                              tCurrency:tCurr[0].targetCur,
                              rate:tCurr[0].rate,
                              fetchTarget:false,
                              rateChanged:true});
          })
          .catch(error => {
         console.log("Error2:"+error);});
}

getExchangeRate(baseC,targetC){
  fetch("/api/exrate/"+baseC+"/"+targetC)
   .then(response => {
        return response.json();
          })
   .then(data => {
      this.update(data.id)
              console.log(data.id)
          })
          .catch(error => {
         console.log("Error2:"+error);});

}

handleBaseCurrSelection(e){
  e.preventDefault();
  this.setState({bCurrency:e.target.value,fetchTarget:true});
  console.log(this.state.bCurrency);
  console.log(this.state.rate);
  }

handleTargetCurrSelection(e){
  var opts = document.getElementById("target").options;
  var index=null;
  for(var i = 0; i < opts.length; i++) {
    if(opts[i].innerText === e.target.value) {
      index=i;
        break;}
  }
  this.setState({tCurrency:e.target.value,
                rate:this.state.tCurrencies[index].rate,
                rateChanged:true,
                index:index,
                });
  console.log(this.state.tCurrency);
  }

inputHandler(e){
  e.preventDefault();
  let result=this.state.rate*e.target.value
  this.setState({result:result,value:e.target.value})
  }

redirectToCreate(e){
e.preventDefault();
  this.props.history.push('/create/');
}

update(id){
  console.log("Index"+this.state.index);
  var updatedCurrency=JSON.stringify(this.state.upCurrency)
  console.log(updatedCurrency);
  console.log(this.state.upCurrency)
  fetch( '/api/edit/' +id, {
       method:'put',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: updatedCurrency
   })
   .then(response => {
       return response.json();
   })
   .then( data => {
     if(this.state.upCurrency.reverse){
      this.setState({upCurrency:{...this.state.upCurrency,
                  rate:1/this.state.upCurrency.rate,
                  baseCur:this.state.upCurrency.targetCur,
                  targetCur:this.state.upCurrency.baseCur,
                  reverse:false}})
                  this.getExchangeRate(this.state.tCurrency,this.state.bCurrency);
                }
      console.log(data);
   })
}

handleRateEdit(e){
  this.setState({upCurrency: {...this.state.upCurrency,rate:e.target.value}})
}
handleBaseCurrencyEdit(e){
  this.setState({upCurrency: {...this.state.upCurrency,baseCur:e.target.value}})
}
handleTargetCurrencyEdit(e){
  this.setState({upCurrency: {...this.state.upCurrency,targetCur:e.target.value}})
}
editButton(){
  let edit=this.state.editing
  if(edit){
    return window.location.reload();}
  edit=!edit
  this.setState({editing:edit});
  if(edit){
  var update={rate:this.state.rate,
              baseCur:this.state.bCurrency,
              targetCur:this.state.tCurrency}
              this.setState({upCurrency: update});
            }

}
onCreate(e){
  e.preventDefault();
  this.setState({upCurrency:{...this.state.upCurrency,reverse:true}});
  this.update(this.state.tCurrencies[this.state.index].id);
  console.log("create")
}

render() {
    /*Option for every base  currency using map*/
    var bDropDownCur=this.state.currencies.map((currency)=>
      <option key={currency.baseCur} value={currency.baseCur}>{currency.baseCur}</option>)
    /*Option for every target currency using map*/
    var tDropDownCur=this.state.tCurrencies.map((currency)=>
      <option key={currency.id} value={currency.targetCur}>{currency.targetCur}</option>)

  return(
  <div>
    <form>

      {/*Input for the amount which will be converted or h2 while editing*/
      this.state.editing ? <h2>Edit</h2>:
      <label>
          Value:
        <input id="Value"  onChange={this.inputHandler} type="number" />
      </label>}
      <br/>
      {/*Output of the result or error msg while editing*/
          this.state.editing ? <h3 >{this.state.msg}</h3>
          :
          <label>
            Result:
          <output >{this.state.result}</output>
        </label>}

      <br/>

      {/*Dropdown list for the base currency, editable as input while editing===true*/
      this.state.editing ?
      <input onChange={this.handleBaseCurrencyEdit} type="text"
       value={this.state.upCurrency.baseCur} />
      :
      <label>
          From:
      <select onChange={this.handleBaseCurrSelection}>
       {bDropDownCur}
      </select>
      </label>}

      {/*Dropdown list for the target currency, editable as input while editing===true*/
        this.state.editing ?
        <input onChange={this.handleTargetCurrencyEdit} type="text"
         value={this.state.upCurrency.targetCur} />
        :
        <label>
            To:
        <select id="target" onChange={this.handleTargetCurrSelection}>
          {tDropDownCur}
        </select>
      </label>
      }
        <br/>
      {/*Value of the current exchange rate or input to edit it*/
        this.state.editing ?

            <input onChange={this.handleRateEdit} type="number" step="0.00001"
            value={this.state.upCurrency.rate} />
              :
      <label>
        Exchange rate:
        <output onChange={this.inputHandler}>{this.state.rate}</output>
      </label>
      }




      <br/>

    {/*Buttons*/
      this.state.editing ?
      <div>
        <button type="button" name="Update" onClick={this.onCreate}>Update</button>
        <br/>
        <button type="button" name="Done" onClick={this.editButton}>Done</button>
        <button type="button" name="Delete" onClick={this.editButton}>Delete</button>
      </div>
      :
      <div>

        <button type="button"  name="Add" onClick={this.redirectToCreate}>Add new currency</button>
        <button type="button"  name="Edit" onClick={this.editButton}>Edit current</button>
      </div>}
    </form>

  </div>
);}

}

export default MainForm;
