const body = document.querySelector('body');
const display = document.createElement('div');
const temperatureDisplay = document.createElement('p');
const weatherDisplay = document.createElement('p');
const weatherIcon = document.createElement('img');
body.appendChild(display);
display.appendChild(temperatureDisplay);
display.appendChild(weatherDisplay);
display.appendChild(weatherIcon);


const getData = async (concatUrl) => {

    try{
    let temperature;
    let weatherMain;
    let weatherDescription;

    const response = await fetch(concatUrl, { mode: 'cors' });
    const data = await response.json();
        
    temperature = data.main.temp;
    weatherMain = data.weather[0].main;
    weatherDescription = data.weather[0].description;
    weatherIconId = data.weather[0].icon;

    return { temperature, weatherMain, weatherDescription, weatherIconId };
    }
    catch (error) {
        console.log(error);
        temperatureDisplay.textContent = "Error, not found.";
        weatherDisplay.textContent = "";
        weatherIcon.src = "";
    }
      
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

    async function assignData() {
        try {
            const data = await getData(concatUrl);

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

        }
        catch (error) {
        console.log(error);
            temperatureDisplay.textContent = "Error, not found.";
            weatherDisplay.textContent = "";
            weatherIcon.src = "";
        }
    };
    assignData();
   
});



//get celsius
//get images
//search location
//toggle fahrenheit or celsius
//change look of page depending on weather
//async/await branch
//error handling