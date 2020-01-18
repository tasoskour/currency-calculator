export default function handleTargetCurrSelection(e){

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
