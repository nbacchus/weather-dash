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

//function to append forecast
let displayWeather = function(weatherData) {
  //weather info requested
  $("#main-city-name").text(weatherData.name + " (" + dayjs(weatherData.dt * 1000).format("MM/DD/YYYY") + ") ").append(`<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>`);
  $("#city-temp").text("Temperature: " + weatherData.main.temp.toFixed(1) + "°F");
  $("#city-humid").text("Humidity: " + weatherData.main.humidity + "%");
  $("#city-wind").text("Wind Speed: " + weatherData.wind.speed.toFixed(1) + " mph");

//5-day weather
fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" + weatherData.name + "&appid=c107fd0ee983a34881f3573465d57ca5&units=imperial")
    .then(function (response) {
    response.json().then(function (data) {
      $("#five-day").empty();

        for (i = 7; i <= data.list.length; i += 8) {
            let fiveDayCard =`
                <div class="col-md-2 m-2 py-3 card text-white bg-primary">
                    <div class="card-body p-1">
                        <h5 class="card-title">` + dayjs(data.list[i].dt * 1000).format("MM/DD/YYYY") + `</h5>
                        <img src="https://openweathermap.org/img/wn/` + data.list[i].weather[0].icon + `.png" alt="rain">
                            <p class="card-text">Temp: ` + data.list[i].main.temp +`</p>
                            <p class="card-text">Humidity: ` + data.list[i].main.humidity + `</p>
                            <p class="card-text">Wind: ` +data.list[i].main.wind + `</p>
                    </div>
                </div>`;

            $("#five-day").append(fiveDayCard);
        }
    });
})};

