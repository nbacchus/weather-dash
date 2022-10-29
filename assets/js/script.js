let searchHistory = [];
let lastCitySearched = "";

//API call
let getCityWeather = function (city) {
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=c107fd0ee983a34881f3573465d57ca5&units=imperial";
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data);
        });
        // request fails
      } else {
        alert("Error: " + response.statusText);
      }
    });
};