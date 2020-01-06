import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";

// (React.memo) preventing unnecessary renders
// only renders when the props change and not always when the parent component changed.
// only ingredients changed and pass props to ingredient form
const IngredientForm = React.memo(props => {
  // we can use all types of variable in here but. class-based we use only object-type.
  // if we update one of our state, it affects all states.Tha
  /// const [inputState, setInputState] = useState({ title: "", amount: "" });
  // useState() always returns an array with exactly 2 elements.
  // 1st is our current state snapshot. this is for rerender cycle of this component. (inputState[0])
  // 2nd is a function that allows us to update our current state.(inputState[1])
  // accesing the data up that way is not guarantied. because react change sometimes state positions in each other.
  // we pass prevInputState variable in our function.

  // better way add two variable in array for using state. class-based state returns object...
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({ title: enteredTitle, amount: enteredAmount });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={enteredTitle}
              onChange={event => setEnteredTitle(event.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={enteredAmount}
              onChange={event => setEnteredAmount(event.target.value)}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
