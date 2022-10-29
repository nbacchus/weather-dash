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

// search function
let searchSubmitHandler = function (event) {
  // prevent refresh default
  event.preventDefault();

  // get value from input
  let cityName = $("#cityname").val().trim();
  if (cityName) {
    getCityWeather(cityName);

    // clear the search
    $("#cityname").val("");
  } else {
    // if nothing was entered alert the user
    alert("Please enter a city name");
  }
};