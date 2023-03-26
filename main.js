"use strict";



import data from './data.json' assert { type: 'json' };


console.log(window.location.pathname);


//Carousel Logic 
function setUpCarousel(carousel){

    const buttonNext = carousel.querySelector('[data-carousel-button-next]'); //Fetch right button
    const buttonPrev = carousel.querySelector('[data-carousel-button-prev]'); //Fetch Left button
    const slidesContainer = carousel.querySelector('[data-carousel-slides-container]'); //fetch slides container 
    
    buttonNext.addEventListener('click',handleNext);
    buttonPrev.addEventListener('click',handlePrev);
    
    let currentSlide = 0;
    const numSlides = slidesContainer.children.length;
    
    function handleNext(){
        currentSlide = (currentSlide+1)%numSlides;
        carousel.style.setProperty('--currentslide',currentSlide);
    }
    
    function handlePrev(){
        currentSlide= (numSlides+ (currentSlide-1))%numSlides;
        carousel.style.setProperty('--currentslide',currentSlide);
    }

    setInterval(handleNext,6000)
}

const carousels = document.querySelectorAll('[data-carousel]'); //Fetch slides container
carousels.forEach(setUpCarousel);


//End Of Carousel Logic

//Scroll Section Logic
function setUpSlider(scrollable){
    const btnNext = scrollable.querySelector('[data-scroll-button-next]');
    const btnPrev = scrollable.querySelector('[data-scroll-button-prev]');
    var currScroll =0;
    btnNext.addEventListener('click',scrollRight);
    btnPrev.addEventListener('click',scrollLeft);
    function scrollRight(){
        currScroll+=500;
        scrollable.scroll(currScroll,0);
    }
    function scrollLeft(){
        currScroll -=500;
        scrollable.scroll(currScroll,0);
    }
}


const scrollableContainer = document.querySelectorAll('[data-scrollable]');
scrollableContainer.forEach(setUpSlider);


//End Of Scroll Section Logic 



//Populating Logic

var PorkRecipes = [];
for(var i =0; i<data.Pork.length; i++){
    PorkRecipes.push(data.Pork[i]);
}

var ChickenRecipes = [];
for(var i =0; i<data.Chicken.length; i++){
    ChickenRecipes.push(data.Chicken[i]);

}

var BeefRecipes = [];
for(var i =0; i<data.Beef.length; i++){
    BeefRecipes.push(data.Beef[i]);
}

var VeggieRecipes = [];
for(var i =0; i<data.Veggie.length; i++){
    VeggieRecipes.push(data.Veggie[i]);
}
    
    
//Create a container element for the list
let porkContainer = document.getElementById("porkRecipeCards");

//Create a container element for the list
let chickenContainer = document.getElementById("chickenRecipeCards");


//Create a container element for the list
let beefContainer = document.getElementById("beefRecipeCards");

//Create a container element for the list
let veggieContainer = document.getElementById("veggieRecipeCards");
  
 function populate(category,recipes){
    //Loop through all recipes and generate cards
    if(category != null)
    for (var i = 0; i < recipes.length; i++){
        
        const content =`
        <button class="card-button" id=${recipes[i].name.replace(/\s+/g, '')}>
        <div class="card">
            <div class='card-header'>
                <h1>${recipes[i].name}</h1>
            </div>
            <div class='card-image' id="card-image">
                <img src="${recipes[i].image}" />
            </div>
            
            
        </div>
        </button>
        `
       
        
    category.innerHTML += content;
    }
 }   


populate(porkContainer,PorkRecipes);
populate(beefContainer,BeefRecipes);
populate(veggieContainer,VeggieRecipes);
populate(chickenContainer,ChickenRecipes);

let card = document.querySelectorAll('[class=card-button]');

card.forEach(openCard);

function openCard(target){
    target.onclick = function(){
        let clickedRecipe = findRecipe(target.id);
        document.cookie = 'recipe=' + JSON.stringify(clickedRecipe);
        setTimeout(function(){
            location.href ="Recipe.html";
        },0)
        
        
    }
}

populateRecipePage();

//Searches through recipes and returns class object of recipe matching id
function findRecipe(id){
    const result = PorkRecipes.find(({name}) => name.replace(/\s+/g, '') === id);
    if(result !== undefined)
        return result;
    
    result = ChickenRecipes.find(({name}) => name.replace(/\s+/g, '') === id);
    if(result !== undefined)
        return result;

    result = BeefRecipes.find(({name}) => name.replace(/\s+/g, '') === id);
    if(result !== undefined)
        return result;

    result = VeggieRecipes.find(({name}) => name.replace(/\s+/g, '') === id);
    if(result !== undefined)
        return result;
        
}

function populateRecipePage(){
    
    let selectedRecipe = JSON.parse(getCookie("recipe"));
    
    

    //Give the recipe an id so it can be found again later
    let target = document.getElementById("Recipe");
    target.id = selectedRecipe.name.replace(/\s+/g, '');

    //Recipe name
    target = document.getElementById("RecipeName");
    var content =`<h1 class="recipe-left-name_container">${selectedRecipe.name}</h1>`
    target.innerHTML += content;
    
    //Recipe Image
    target = document.getElementById("RecipeImage");
    content = `<img src=${selectedRecipe.image} >`
    target.innerHTML += content;

    //Recipe Description 
    target = document.getElementById("RecipeDescription");
    content = `<p>${selectedRecipe.description}</p>`
    target.innerHTML += content;

     //Recipe Servings 
     target = document.getElementById("RecipeServings");
     content = `<p>${selectedRecipe.servings}</p>`
     target.innerHTML += content;

     //Recipe Ingredients  
     content = ``
     target = document.getElementById("RecipeIngredients");
     for(var i=0; i<selectedRecipe.ingredients.length; i++){
        content += `<li>${selectedRecipe.ingredients[i]}</li>`
     }
     
     target.innerHTML += content;

     //Recipe Directions  
     content = ``
     target = document.getElementById("RecipeDirections");
     for(var i=0; i<selectedRecipe.instructions.length; i++){
        content += `<li>${selectedRecipe.instructions[i]}</li> `
     }
     
     target.innerHTML += content;


}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

 //End Populating Logic

 //Cart Logic
 var Cart = []; //This is where all the added items are stored
 let cartBtn = document.getElementById('AddToCart');
 

 cartBtn.onclick = function (){
    let recipeId = document.getElementsByClassName('recipe');
    let selectedRecipe = findRecipe(recipeId[0].id);
    for(var i =0; i<selectedRecipe.ingredients.length; i++){
        Cart.push(selectedRecipe.ingredients[i]);
    }

    document.cookie = 'cart=' + JSON.stringify(Cart);
    location.reload();
 }

 renderCart();
 console.log(Cart);
function renderCart(){
    Cart = JSON.parse(getCookie("cart"));
    let cartList = document.getElementById('cart');
    
    if(Cart.length === 0){
        const content = `
        <h3> Your Cart Is Empty </h3>
        `
        cartList.innerHTML += content;
    }else{
        for(var i =0; i<Cart.length; i++){
            const content = `
            <li class="cart-item" data-cart-item>${Cart[i]}
            <button class="cart-item-remove" id=${i} data-remove-btn> Remove </button>
            </li>
            `
            cartList.innerHTML += content;
        }
    }
    
    
    

 }
 const cartItems = document.querySelectorAll('[data-cart-item]');
    cartItems.forEach(remove);

 function deleteCartItem(id){
    console.log(id);
    Cart.splice(id,1);
    document.cookie = 'cart=' + JSON.stringify(Cart);
    location.reload();
 
}

function remove(item){
    const removeItem = item.querySelector('[data-remove-btn]');
    //removeItem.addEventListener('click',deleteCartItem);
   removeItem.onclick = function(){
    deleteCartItem(removeItem.getAttribute("id"));
   }
   
}

 



 


 //End Cart Logic 

     
   
    

    


