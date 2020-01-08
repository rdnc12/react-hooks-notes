import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  // we can manage side effects(typical HTTP Request)
  // this function runs when this component renders and for every render cycle.
  // useEffect(() => {
  //   fetch("https://react-my-burger-f01f7.firebaseio.com/hookssss.json")
  //     .then(response => response.json())
  //     .then(responseBodyData => {
  //       const loadedIngredients = [];
  //       for (const key in responseBodyData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseBodyData[key].title,
  //           amount: responseBodyData[key].amount
  //         });
  //       }
  //       setIngredients(loadedIngredients); // this line make infinitive loops. because it updates like componentDidUpdate without []
  //       // thats why useEffect takes second argument(array). only changes dependencies.
  //       // default is for every render cycle
  //       // [] acts like componentDidMount:it runs only once(after the first render)
  //     });
  // }, []);

  useEffect(() => {
    console.log("rendering ingredients", ingredients);
  }, [ingredients]);

  // useCallback will never rerun. It keeps in cache
  const filterIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, []);

  // we have to keep previous ingredients for using in the future.
  // we add new one to existing ingredients list.
  const addIngredientHandler = ingredient => {
    //  this is a function the browser understands. This will send behind the scenes HTTP request (fetch takes a URL)
    fetch("https://react-my-burger-f01f7.firebaseio.com/hookssss.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        return response.json();
      })
      .then(responseBodyData => {
        setIngredients(prevIngredients => [
          ...prevIngredients,
          { id: responseBodyData.name, ...ingredient }
        ]);
      });
  };

  const removeIngredientHandler = ingId => {
    // we knows the id of our ingredients and uses it in the url.
    fetch(
      `https://react-my-burger-f01f7.firebaseio.com/hookssss/${ingId}.json`,
      {
        method: "DELETE"
      }
    ).then(response => {
      const ingredientAll = [...ingredients];
      ingredientAll.splice(ingId, 1);
      setIngredients(ingredientAll);
    });

    // this is another way to delete it
    // setIngredients(prevIngredients =>
    //   prevIngredients.filter(ingredient => ingredient.id !== ingId)
    // );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filterIngredientsHandler} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={() => removeIngredientHandler()}
        />
      </section>
    </div>
  );
};

export default Ingredients;
