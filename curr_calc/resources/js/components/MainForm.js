import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import HomeForm from "./Forms/HomeForm";
import EditForm from "./Forms/EditForm";

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
    //Changes form to edit mode
    editing:false,
    //Makes it possible to update the reverse exchange rate
    reverseDel:false,
    isLoading:true,
    msg:""
  }

//./funcs/handleSelection
this.handleTargetSelection=handleTargetSelection.bind(this);
this.handleBaseSelection=handleBaseSelection.bind(this);
//./funcs/fetchFuncs
this.fetchBaseCurrencies=fetchBaseCurrencies.bind(this);
this.fetchTargetCurrency=fetchTargetCurrency.bind(this);
this.fetchExchangeRate=fetchExchangeRate.bind(this);
this.fetchUpdate=fetchUpdate.bind(this);
this.fetchDelete=fetchDelete.bind(this);
//./funcs/handleEdit
this.handleBaseCurrencyEdit=handleBaseCurrencyEdit.bind(this);
this.handleTargetCurrencyEdit=handleTargetCurrencyEdit.bind(this);
this.handleRateEdit=handleRateEdit.bind(this);
//./funcs/buttonFuncs
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

    if(this.state.reverseDel){
      this.fetchExchangeRate(this.state.tCurrency,this.state.bCurrency);
    }
    if(this.state.upCurrency.reverse){
        this.fetchExchangeRate(this.state.tCurrency,this.state.bCurrency);
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
    if(this.state.isLoading){
      return <h1>Loading...</h1>
      }
    else{
      return(
      <div>
          {  !this.state.editing
                    ?
          <HomeForm handleTargetSelection={this.handleTargetSelection}
            handleBaseSelection={this.handleBaseSelection}
            handleCurrSelection={this.handleCurrSelection}
            inputHandler={this.inputHandler}
            redirectToCreate={this.redirectToCreate}
            onEdit={this.onEdit}
            result={this.state.result}
            rate={this.state.rate}
            bDropDownCur={bDropDownCur}
            tDropDownCur={tDropDownCur}
          />
          :
          <EditForm handleBaseCurrencyEdit={this.handleBaseCurrencyEdit}
            handleTargetCurrencyEdit={this.handleTargetCurrencyEdit}
            handleRateEdit={this.handleRateEdit}
            onUpdate={this.onUpdate}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
            baseCur={this.state.upCurrency.baseCur}
            targetCur={this.state.upCurrency.targetCur}
            rate={this.state.upCurrency.rate}
            msg={this.state.msg}
          /> }
       </div>)}}
}
export default MainForm;
