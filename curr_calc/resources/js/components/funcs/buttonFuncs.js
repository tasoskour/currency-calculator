//Activates and deactivates editing, used by "Edit" button and "Done" button
export function onEdit(){
  let edit=this.state.editing
  //If editing is done reloads page
  if(edit){
    return window.location.reload();}
  edit=!edit
  this.setState({editing:edit});
  /*If editing becomes true passes the current values to upCurrency
   and to editing form*/
  if(edit){
    var update={rate:this.state.rate,
                baseCur:this.state.bCurrency,
                targetCur:this.state.tCurrency}
    this.setState({upCurrency: update});
   }
}

//When clicked updates the current exchange rate and the reverse one
export function onUpdate(e){
  e.preventDefault();
  this.setState({upCurrency:{...this.state.upCurrency,reverse:true}});
  this.fetchUpdate(this.state.tCurrencies[this.state.index].id);
  console.log("create")
}
//When clicked deletes the current exchange rate and the reverse one
export function onDelete(e){
  e.preventDefault();
  this.setState({reverse:true});
  this.fetchDelete(this.state.tCurrencies[this.state.index].id);
  console.log("create")
}
