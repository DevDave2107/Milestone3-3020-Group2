"use strict";

import data from './data.json' assert { type: 'json' };



var recipes = [];
for(var i =0; i<data.Recipes.length; i++){
    recipes.push(data.Recipes[i]);
}
    
    
//Create a container element for the list
let listContainer = document.getElementById("recipeCards");
  
    
//Loop through all recipes and generate cards
for (var i = 0; i < recipes.length; i++){
        
    const content =`
    <div class="card">
        <div class='card-header'>
            <h1>${recipes[i].name}</h1>
        </div>
        <div class='card-image' id="card-image">
            <img src="${recipes[i].image}" />
        </div>
        <div class='card-body'>
            <h4>Servings: </h4>
            <p>${recipes[i].servings} </p>
            <h4>Instructions: </h4>
            <p>${recipes[i].instructions} </p>
            <h4>Ingredients: </h4>
            <p>${recipes[i].ingredients} </p>
        </div>
        
    </div>
    `
       
        
    listContainer.innerHTML += content;
}
     
   
    

    


