import React from 'react';

function Form() {




  return(
    <form>
      {/*Input for the amount which will be converted*/}
      <input  onChange={props.inputHandler} type="number" />
      <output onChange={props.inputHandler}>{props.rate}</output>
      {/*Dropdown list for the base currency*/}
      <select onChange={props.handleBaseCurrSelection}>
       {props.bDropDownCur}
      </select>

      {/*Dropdown list for the target currency*/}
      <select id="target" onChange={props.handleTargetCurrSelection}>
        {props.tDropDownCur}
      </select>

      <output >{props.result}</output>
      <br/>
      <button type="button" onClick={props.redirectToCreate}>Add new currency</button>
      <button type="button" onClick={props.update}>Edit current</button>
    </form>

  )
}
export default Form;
