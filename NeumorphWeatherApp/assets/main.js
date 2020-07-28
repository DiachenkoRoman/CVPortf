// 1. Get DOM elements
var humidity = getElement('current-humidity'),
    pressure = getElement('current-pressure'),
    temperature = getElement('current-temperature'),
    windSpeed = getElement('current-wind-speed'),
    weatherSummary = getElement('weather-summary')
    currentCity = getElement("current-city");

// helper function to get DOM elements
function getElement(id) {
    return document.getElementById(id);
}

// 2. Function to find current geo position
function getCurrentGeoPosition() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            fetchWeatherData(position.coords.latitude, position.coords.longitude);
        });
    } else {
        alert('Your browser does not support Geolocation API!');
    }
}

// 3. Function to make HTTP request to 3rd party client
function fetchWeatherData(lat, long) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric&appid=3f73ed56eeac88259931dee6eed66e55")
        .then(function (response) {
            return response.json();
            
        })
        .then(function (result) {
            humidity.innerText= "Humidity: "+result.main.humidity+" %";
            pressure.innerText= "Pressure: "+result.main.pressure+" mm";
            temperature.innerText= "Temperature: "+result.main.temp+" C";
            windSpeed.innerText= "Wind speed: "+result.wind.speed+" m/s";
            weatherSummary.innerText= result.weather[0].main;
            currentCity.innerText= result.name
            console.log(result)
            return result;
        })
        .catch(function (err) {
            return err;
        })
}
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';


var words = document.querySelector('#current-city-text');

recognition.addEventListener('result', function (event) {
    words.value = Array.from(event.results) //Голосовое сообщение будет передаваться просто через value
        .map(function (result) {
            return result[0];
        })
        .map(function (result) {
            return result.transcript;
        })
        .join('');

    if(event.results[0].isFinal) {
        fetchWeatherDataByName()
        function fetchWeatherDataByName() { //Так как, в условии было сделать именно через конкатенацию, пришлось продублировать код
            fetch("https://api.openweathermap.org/data/2.5/weather?q="+words.value+"&appid=3f73ed56eeac88259931dee6eed66e55")
                .then(function (response) {
                    return response.json();
                    
                })
                .then(function (result) {
                    humidity.innerText= "Humidity: "+result.main.humidity+" %";
                    pressure.innerText= "Pressure: "+result.main.pressure+" mm";
                    temperature.innerText= "Temperature: "+result.main.temp+" C";
                    windSpeed.innerText= "Wind speed: "+result.wind.speed+" m/s";
                    weatherSummary.innerText= result.weather[0].main;
                    currentCity.innerText= result.name
                    console.log(result)
                    return result;
                })
                .catch(function (err) {
                    return err;
                })
        }
    }
})


recognition.addEventListener('end', recognition.start);
recognition.start();

// 4. Function to display data
// function displayWeatherData(data) { //Почитал документацию, нашёл как изменить еденицы измерения :D
//     // ...
//     windSpeed.innerText = transformFromKnotsToMeters(data.weather.windSpeed) + 'm/s'
// }

// helpers to transform data
// function transformFromKnotsToMeters(data) {

// }