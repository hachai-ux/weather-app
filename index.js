const body = document.querySelector('body');
const display = document.createElement('div');
const temperatureDisplay = document.createElement('p');
const weatherDisplay = document.createElement('p');
const weatherIcon = document.createElement('img');
body.appendChild(display);
display.appendChild(temperatureDisplay);
display.appendChild(weatherDisplay);
display.appendChild(weatherIcon);

const getData = (concatUrl) => {
    let temperature;
    let weatherMain;
    let weatherDescription;

    return fetch(concatUrl, { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            temperature = response.main.temp;
            weatherMain = response.weather[0].main;
            weatherDescription = response.weather[0].description;
            weatherIconId = response.weather[0].icon;

            return { temperature, weatherMain, weatherDescription, weatherIconId };
                    
        })
        .catch(function (error) {
            console.log(error);
            temperatureDisplay.textContent = "Error, not found.";
        });
};

/*
getData().then((data) => {
    console.log(data);
})
*/

const fahrenheit = "&units=imperial";
const celsius = "&units=metric";
const apiKey = "&appid=d26785acbf779c05d111c784d36ec748";
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const iconUrl = "https://openweathermap.org/img/wn/";

const form = document.querySelector('form.search');
console.log(form);
form.addEventListener('submit', (e) => {
    const searchTerm = form.elements['search'].value;
    const checkedUnit = document.querySelector('input[name="unit"]:checked').value;
    let temperatureUnit;
    switch (checkedUnit) {
        case 'celsius':
            temperatureUnit = celsius;
            break;
        case 'fahrenheit':
            temperatureUnit = fahrenheit;
            break;
    };

    const concatUrl = url.concat(searchTerm, temperatureUnit, apiKey);
    console.log(concatUrl);

    getData(concatUrl).then((data) => {
        console.log(data);

        switch (checkedUnit) {
        case 'celsius':
            temperatureDisplay.textContent = data.temperature + "°C";
            break;
        case 'fahrenheit':
            temperatureDisplay.textContent = data.temperature + "F";
            break;
        };
        
        weatherDisplay.setAttribute('id', 'weather-display')
        weatherDisplay.textContent = data.weatherDescription;

        weatherIcon.src = iconUrl.concat(data.weatherIconId, "@2x.png");


    })
        .catch(function (error) {
            console.log(error);
            temperatureDisplay.textContent = "Error, not found.";
        });
});



//get celsius
//get images
//search location
//toggle fahrenheit or celsius
//change look of page depending on weather
//async/await branch
//error handling