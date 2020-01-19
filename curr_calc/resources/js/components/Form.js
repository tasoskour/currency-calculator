import React from 'react';

function Form(props) {

  return(
    <div>
      <form>
          {/*Input for the amount which will be converted */}
          <label>Amount:
           <input id="Value"  onChange={props.inputHandler} type="number" />
          </label>
        <br/>

          {/*Result  */}
          <label>Result:
            <output >{props.result}</output>
          </label>
        <br/>

          {/*Dropdown list for the base currency*/}
          <label>From:
            <select onChange={props.handleBaseSelection}>
              {props.bDropDownCur}
            </select>
          </label>

          {/*Dropdown list for the target currency*/}
          <label>To:
            <select id="target" onChange={props.handleCurrSelection}>
              {props.tDropDownCur}
            </select>
          </label>
        <br/>

          {/*Value of the current exchange rate*/}
          <label>Exchange rate:
            <output onChange={props.inputHandler}>{props.rate}</output>
          </label>
        <br/>

          {/*Buttons*/}
          <div>
            <button type="button"  name="Add" onClick={props.redirectToCreate}>Add new currency</button>
            <button type="button"  name="Edit" onClick={props.onEdit}>Edit current</button>
          </div>
      </form>
    </div>

  )
}
export default Form;
