import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Form from "./Form";
import {handleTargetSelection,handleBaseSelection} from "./funcs/handleSelection";
import {fetchBaseCurrencies,fetchTargetCurrency,fetchExchangeRate,
        fetchUpdate,fetchDelete} from "./funcs/fetchFuncs";
import {handleRateEdit,handleBaseCurrencyEdit,
        handleTargetCurrencyEdit} from "./funcs/handleEdit";
import {onEdit,onDelete,onUpdate} from "./funcs/buttonFuncs";


class MainForm extends Component{

constructor(){
  super();

  this.state={
    //Input value
    value:null,
    //Output result
    result:null,
    //All base currencies for the dropdown list
    currencies:[],
    //All target currencies for the currenct base currency
    tCurrencies:[],
    //Current base currency,target currency and exchange rate
    bCurrency:"",
    tCurrency:"",
    rate:null,
    //Index of option for the currenct target currency
    index:0,
    /*The updated currency, reverse makes it possible
    to update the reverse exchange rate*/
    upCurrency:{baseCur:"",
                targetCur:"",
                rate:null,
                reverse:false},
  //Booleans
    //Makes it possible to fetch target currencies
    fetchTarget:false,
    //Makes it possible to change the result when rate changes
    rateChanged:false,
    editing:false,
    //Makes it possible to update the reverse exchange rate
    reverse:false,
    isLoading:true,
    msg:"",

  }

this.handleTargetSelection=handleTargetSelection.bind(this);
this.handleBaseSelection=handleBaseSelection.bind(this);

this.fetchBaseCurrencies=fetchBaseCurrencies.bind(this);
this.fetchTargetCurrency=fetchTargetCurrency.bind(this);
this.fetchExchangeRate=fetchExchangeRate.bind(this);
this.fetchUpdate=fetchUpdate.bind(this);
this.fetchDelete=fetchDelete.bind(this);

this.handleBaseCurrencyEdit=handleBaseCurrencyEdit.bind(this);
this.handleTargetCurrencyEdit=handleTargetCurrencyEdit.bind(this);
this.handleRateEdit=handleRateEdit.bind(this);

this.onEdit=onEdit.bind(this);
this.onUpdate=onUpdate.bind(this);
this.onDelete=onDelete.bind(this);

this.inputHandler=this.inputHandler.bind(this);
this.redirectToCreate=this.redirectToCreate.bind(this);
}

componentDidMount(){
  //After the first render, all the currencies being fetched from the api
  this.fetchBaseCurrencies();
}

componentDidUpdate(){
    //When state changes and fetchTarget===true the target currency is being fetched
    if(this.state.fetchTarget===true){
      this.fetchTargetCurrency();}
    //When exchange rate changes the result is being changed
    if(this.state.rateChanged){
      let result=this.state.rate*this.state.value
      this.setState({result:result,rateChanged:false})
    }
}

//Takes input from user and calculates the output
inputHandler(e){
  e.preventDefault();
  let result=this.state.rate*e.target.value
  this.setState({result:result,value:e.target.value})
  }

//When create button is pressed redirects to /create
redirectToCreate(e){
e.preventDefault();
  this.props.history.push('/create/');
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
        <label>
        Base Currency
      <input onChange={this.handleBaseCurrencyEdit} type="text"
       value={this.state.upCurrency.baseCur} />
         </label>
      :
      <label>
          From:
      <select onChange={this.handleBaseSelection}>
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
        <select id="target" onChange={this.handleCurrSelection}>
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
        <button id="delete" type="button" name="Update" onClick={this.onUpdate}>Update</button>
        <br/>
        <button type="button" name="Done" onClick={this.onEdit}>Done</button>
        <button type="button" name="Delete" onClick={this.onDelete}>Delete</button>
      </div>
      :
      <div>

        <button type="button"  name="Add" onClick={this.redirectToCreate}>Add new currency</button>
        <button type="button"  name="Edit" onClick={this.onEdit}>Edit current</button>
      </div>}
    </form>

  </div>
);}

}

export default MainForm;
