import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    // setTimeout waits the enteredFilter to complete in 500ms
    // then checks the values.
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;

        fetch(
          "https://react-my-burger-f01f7.firebaseio.com/hookssss.json" + query
        )
          .then(response => response.json())
          .then(responseBodyData => {
            const loadedIngredients = [];
            for (const key in responseBodyData) {
              loadedIngredients.push({
                id: key,
                title: responseBodyData[key].title,
                amount: responseBodyData[key].amount
              });
            }
            // in the end we should establish a connection between search and ingredients component to update ingredients
            onLoadIngredients(loadedIngredients); // functions are objects and behave like any other value in JS.
            // this line makes infinitive loop when it changes
            // onLoadIngredients sends a request for every keystroke and it makes server unnecessary busy.
          });
      }
    }, 500);

    //the cleanup function runs when the component gets unmounted.
    // first render return function does not execute but then on the first keystroke we clean up the old effect run a new one on the second keystroke.
    // we clean up that previous effect run a new one.
    return ()=>{
      // we makes only one setTimeout() in the memory.
      // it makes our app faster.
      clearTimeout(timer);
    }
  }, [enteredFilter, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef} // established a connection with useRef()
            type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
