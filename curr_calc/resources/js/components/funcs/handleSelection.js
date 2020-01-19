//Handles the click on the dropdown menu of the target currency
export function handleTargetSelection(e){
  //When an option is clicked find its index
  var opts = document.getElementById("target").options;
  var index=null;
  for(var i = 0; i < opts.length; i++) {
    if(opts[i].innerText === e.target.value) {
      index=i;
        break;}
  }
  /*Updates state with the clicked target currency as the active one and
  also changes the rate and saves the index*/
  this.setState({tCurrency:e.target.value,
                rate:this.state.tCurrencies[index].rate,
                rateChanged:true,
                index:index,
                });
  console.log(this.state.tCurrency);

}

//Handles the click on the dropdown menu of the base currency
export function handleBaseSelection(e){
  e.preventDefault();
  /*Updates state with the clicked base currency as the active one and
  enables fetching for the target currency */
  this.setState({bCurrency:e.target.value,fetchTarget:true});
  console.log(this.state.bCurrency);
  console.log(this.state.rate);
}
