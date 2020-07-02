let searchInput = document.querySelector('.search-input');
let searchButton = document.querySelector('.search-button');
let randomButton = document.querySelector('.random-button');

let searchResultsContainer = document.querySelector('.search-results-container')
let searchResultsPicsContainer = document.querySelector('.search-results-pics-container')

let mealDetailsContainer = document.querySelector('.meal-details-container')
let mealNameH1 = document.querySelector('h1.meal-name')
let mealPic = document.querySelector('img.meal-pic')
let mealArea = document.querySelector('div.meal-area')
let mealRecipe = document.querySelector('p.meal-recipe')
let mealIngredientUl = document.querySelector('ul.ingredients-ul')

let searchMealResult = null

function clearScreen() {
  searchResultsContainer.classList.add('hidden')
  mealDetailsContainer.classList.add('hidden')
}

async function searchMeal(keyword){
  if(keyword.trim()){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
    ({meals:searchMealResult} = await response.json());
    if(!searchMealResult || searchMealResult.length == 0){
      searchResultsContainer.firstElementChild.innerText = 'There are no search results. Try again'
      searchResultsPicsContainer.innerHTML = ''
    }else{
      searchResultsContainer.firstElementChild.innerText = 'Search results for: ' + keyword
      searchResultsPicsContainer.innerHTML = ''
      for(let meal of searchMealResult){
        searchResultsPicsContainer.appendChild(getMeal(meal))
      }
    }
    searchResultsContainer.classList.remove('hidden')
  }

  function getMeal(meal){
    let mealElem = document.createElement('div')
    mealElem.classList.add('result')
    
    let mealImg = document.createElement('img')
    mealImg.src = meal.strMealThumb
    mealImg.alt = meal.strMeal

    let mealNameModal = document.createElement('div')
    mealNameModal.classList.add('meal-name-modal')
    mealNameModal.dataset.mealid = meal.idMeal
    mealNameModal.innerHTML = `<h3>${meal.strMeal}</h3>`

    mealElem.appendChild(mealImg)
    mealElem.appendChild(mealNameModal)
    return mealElem
  }
}

function displayMeal(meal){
  mealNameH1.innerText = meal.strMeal 
  mealPic.src = meal.strMealThumb
  mealPic.alt = meal.strMeal 
  mealArea.innerHTML = `<p>${meal.strCategory}</p>
                        <p>${meal.strArea}</p>`
  mealRecipe.innerText = meal.strInstructions

  mealIngredientUl.innerHTML = ''
  let i = 1;
  while(meal[`strIngredient${i}`]){
    mealIngredientUl.insertAdjacentHTML('beforeend',
      `<li class='ingredient-li'>${meal['strIngredient' + i]} - ${meal['strMeasure' + i]}</li>`)
    i += 1;
  }
  mealDetailsContainer.classList.remove('hidden')
  mealNameH1.scrollIntoView({behavior:'smooth'})
}

async function displayRandomMeal(){
  clearScreen()
  let respones = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  let data = await respones.json()
  let meal = data.meals[0]
  displayMeal(meal)
}

searchButton.onclick = (e) => {
  clearScreen()
  let keyword = searchInput.value
  if(keyword.trim()){
    setTimeout(searchMeal(keyword), 0)
  }
}

searchResultsPicsContainer.onclick = (e) => {
  let target = e.target.closest('.meal-name-modal')
  if(target){
    let mealid = target.dataset.mealid
    for(let meal of searchMealResult){
      if(meal.idMeal == mealid){
        displayMeal(meal)
        break
      }
    }
  }
}

randomButton.onclick = displayRandomMeal


// searchMeal('dafdfsd')