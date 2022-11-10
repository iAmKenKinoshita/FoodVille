import React, {useEffect, useState} from "react";


function SingleRecipeList(props) {

  const {selectedRecipe} = props;
  const [ingredients, setIngredients] = useState([])

  const ID = selectedRecipe.id;

  useEffect(() => {
    fetch(`myrecipe/list/${ID}`).then((result) => result.json()).then((data) => setIngredients(data))
  })

  return (
    <div>
      
     
    <div>
        <p >{selectedRecipe.name}</p>
        <p>{selectedRecipe.description}</p>
        {ingredients.map((ingredient) => {
          return(
            <>
              <p>{ingredient.ingredient_name}</p>
              <p>{ingredient.amount}</p>
            </>
          )
        })}
        <p>{selectedRecipe.instruction}</p>
      </div>
      
   </div>

  )



}

export default SingleRecipeList;