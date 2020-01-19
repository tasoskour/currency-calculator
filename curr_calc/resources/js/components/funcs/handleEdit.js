//Edit fields handlers for editing current exchange rate using upCurrency 

export function handleRateEdit(e){
  this.setState({upCurrency: {...this.state.upCurrency,rate:e.target.value}})
}
export function handleBaseCurrencyEdit(e){
  this.setState({upCurrency: {...this.state.upCurrency,baseCur:e.target.value}})
}
export function handleTargetCurrencyEdit(e){
  this.setState({upCurrency: {...this.state.upCurrency,targetCur:e.target.value}})
}
