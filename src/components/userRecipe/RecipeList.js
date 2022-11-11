import React, {useEffect, useState} from "react";
import SingleRecipeList from "./SingleRecipe";


function RecipeList () {

  const [currentView, setCurrentView] = useState("allRecipes");
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);


  useEffect(() => {
    fetch("myrecipe/list").then((result) => result.json()).then((data) => setMyRecipes(data))
  })



  return (
    <div>
      {currentView === "allRecipes" ? (myRecipes.map((recipe, index) => {
      return(<div onClick={() => {
        setCurrentView("singleRecipe")
        setSelectedRecipe(myRecipes[index])
      }}>
        <p >{recipe.name}</p>
        <p>{recipe.description}</p>
      </div>)
      })): <SingleRecipeList
      selectedRecipe={selectedRecipe}
      
      />}
      
   </div>

  )


}

export default RecipeList;