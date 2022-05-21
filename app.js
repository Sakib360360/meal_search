const search = () => {
    const inputField = document.getElementById('input-field')
    const getValue = inputField.value
    
    // clear input field
    inputField.value = ''
    searchResult.innerHTML = ''
    mealDetails.innerHTML = ''
    // api url
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${getValue}`
    // data fetching
    fetch(url)
        .then(res => res.json())
        .then(data => displaSearchResult(data.meals))
}

const displaSearchResult = meals => {
    const searchResult = document.getElementById('searchResult')
    searchResult.innerHTML = ''
    meals.forEach(meal => {
        // console.log(meal)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card width-imp">
            <img onclick="mealDetail(${meal.idMeal})" src="${meal.strMealThumb}" class="card-img-top" alt="">
            <div class="card-body bg">
                <h5 class="card-title bg">${meal.strMeal}</h5>
                <hr>
                <p class="card-text bg">${meal.strInstructions.slice(0,300)}</p>
            </div>
        </div>
        `
        searchResult.appendChild(div)
    })
}

const mealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
    const mealDetails = document.getElementById('mealDetails')
    mealDetails.innerHTML = ''
    const div = document.createElement('div')
    div.classList.add('card')
    
    mealDetails.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,300)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    `
    mealDetails.appendChild(div)
}