const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then(response => response.json())
    .then(data => cities.push(...data));

function findMatches(cities, wordToMatch) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    })
}

function displayData() {
    const result = findMatches(cities, this.value);
    if (!this.value){
        defaultState()
    } else{
    suggestions.innerHTML = result.map(place => {
        return `
            <li>
                <span>${place.city}, ${place.state}</span>
            </li>
        `
    }).slice(0, 10).join('');
    suggestions.insertAdjacentHTML("afterbegin", "<li class='clear'><span>Clear results</span></li>");
    const clearBut = document.querySelector('.clear');
    clearBut.addEventListener('click', defaultState);
    }
}

function defaultState(){
    searchInput.value= "";
    suggestions.innerHTML= "<li>Filter for a city</li><li>or a state</li>"
}

searchInput.addEventListener('keyup', displayData);
