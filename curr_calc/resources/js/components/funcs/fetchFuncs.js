
//After the first render, all the currencies being fetched from the api
export  function fetchBaseCurrencies() {
 fetch("/api/baseCurrency")
 .then(response => {
   return response.json();
 })
 .then(currencies => {
        console.log("DATA:"+currencies[0]);
       /*Fetched currencies are stored in the state and fetchTarget becomes true so
       the target currencies will be fetched*/
       this.setState({ currencies:currencies,bCurrency:currencies[0].baseCur,
                        fetchTarget:true,isLoading:false});
 })
 .catch(error => {
   console.log("ErrorBaseCurrency:"+error);
 });
}

/*Method to fetch the target currencies for the current base currency and
save the complete exchange rate objects to tCurrencies, also establishes the first
target currency and exchange rate as current */
export  function fetchTargetCurrency() {
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
        console.log("ErrorTargetCurrency:"+error);
 });
}
/*Method to fetch id for given base and target currcy.
Also calls fetchDelete and fetchUpdate for second time for
the reverse exchange rates.*/
export  function fetchExchangeRate(baseC,targetC){

  fetch("/api/exrate/"+baseC+"/"+targetC)
  .then(response => {
        return response.json();
   })
   .then(data => {
     if(this.state.reverse){
        this.setState({reverse:false})
        this.fetchDelete(data.id)
        document.getElementById("delete").disabled=true;}
     else if(this.state.upCurrency.reverse){  this.fetchUpdate(data.id)
               this.setState({upCurrency:{reverse:false,
                           rate:1/this.state.upCurrency.rate,
                           baseCur:this.state.upCurrency.targetCur,
                           targetCur:this.state.upCurrency.baseCur},
                           tCurrency:this.state.upCurrency.baseCur,
                           bCurrency:this.state.upCurrency.targetCur})
  }})
  .catch(error => {
         console.log("ErrorGetExRate:"+error);
  });
}

//Updates current exchange rate and the reverse one using upCurrency
export  function fetchUpdate(id){

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
     /*When the current exchange rate is updated, reverses the upCurrency,
     fetches the reverse id and updates it through fetchExchangeRate.*/

     if(this.state.upCurrency.reverse){
      this.setState({upCurrency:{...this.state.upCurrency,
                  rate:1/this.state.upCurrency.rate,
                  baseCur:this.state.upCurrency.targetCur,
                  targetCur:this.state.upCurrency.baseCur,
                  }})
      this.fetchExchangeRate(this.state.tCurrency,this.state.bCurrency);}
   })
   .catch(error => {
       console.log("ErrorUpdate:"+error);
   });
}

//Deletes current exchange rate and the reverse through fetchExchangeRate
export function fetchDelete(id){
  fetch( '/api/delete/' +id, { method: 'delete' })
   .then(response => {
     console.log(response.status);
     if(this.state.reverse&&response.status===204){
       this.setState({dltMsg:"Deleted successfully"});
         this.fetchExchangeRate(this.state.tCurrency,this.state.bCurrency);
   }
       return response.json();
   })
   .catch(error => {
       console.log("ErrorDelete:"+error);
     });

}

//Creates new currency exchange rate and the reverse one

export function fetchCreate(){
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
     console.log("CreateResponse"+response.status)
   /*Reverses the state and creates the reverse exchange rate*/
   if(response.status===201){
     if(this.state.reverse){
     this.setState({targetCur:this.state.baseCur,
                    baseCur:this.state.targetCur,
                    rate:1/this.state.rate,
                    reverse:false,
                  msg:"Added successfully"})
    //call fetchCreate again to create the reverse exchange rate
     this.fetchCreate();}}
   else{this.setState({msg:"Error."})}
     return response.json();
 })
 .catch(error => {
  console.log(error);
  });
}
