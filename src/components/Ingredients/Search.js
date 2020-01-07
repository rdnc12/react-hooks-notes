import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");

  useEffect(() => {
    const query =
      enteredFilter.length === 0
        ? ""
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch("https://react-my-burger-f01f7.firebaseio.com/hookssss.json"+query)
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
      });
  }, [enteredFilter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
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
