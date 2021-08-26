const getData = (concatUrl) => {
    let temperature;
    let weatherMain;
    let weatherDescription;

    return fetch(concatUrl, { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            temperature = response.main.temp;
            weatherMain = response.weather[0].main;
            weatherDescription = response.weather[0].description;

            return { temperature, weatherMain, weatherDescription };
                    
        })
        .catch(function (error) {
            console.log(error);
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

const form = document.querySelector('form.search');
console.log(form);
form.addEventListener('submit', (e) => {
    const searchTerm = form.elements['search'].value;
    const temperatureUnit = document.querySelector('input[name="unit"]:checked').value;
    const concatUrl = url.concat(searchTerm,'&', temperatureUnit,'&', apiKey);
    console.log(searchTerm);

    getData(concatUrl).then((data) => {
    console.log(data);
})
    
})

//get celsius
//get images
//search location
//toggle fahrenheit or celsius
//change look of page depending on weather
//async/await
//error handling