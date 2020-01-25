import React from 'react';

function EditForm(props) {

  return(
    <div>
      <form>
        <h3 >Edit</h3>
      <br/>
        {/*Base Currency input*/}
        <label>Base Currency
          <input onChange={props.handleBaseCurrencyEdit} type="text"
          value={props.baseCur} />
        </label>

      {/*Target Currency input*/}
        <label>To:
          <input onChange={props.handleTargetCurrencyEdit} type="text"
          value={props.targetCur} />
        </label>

        {/*Exchange rate input*/}
        <label>Exchange rate:
          <input onChange={props.handleRateEdit} type="number" step="0.00001"
          value={props.rate} />
        </label>
      <br/>

      {/*Buttons*/}
        <div>
          <button id="delete" type="button" name="Update" onClick={props.onUpdate}>
          Update
          </button>
        <br/>
          <button type="button" name="Done" onClick={props.onEdit}>Done</button>
          <button type="button" name="Delete" onClick={props.onDelete}>Delete</button>
          <p>{props.msg}</p>
        </div>
      </form>

    </div>

  )
}
export default EditForm;
