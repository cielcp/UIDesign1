function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");
  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "277e38acc52ab5acfa722a76558e01b3";
  let time = document.getElementById("time");
  let fit = document.getElementById("fitcast");
  let air = document.getElementById("air");
  

  location.innerHTML = "Locating...";
  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    console.log(position);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    let url =
      api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=imperial";

    let url2 = "https://api.openweathermap.org/data/2.5/air_pollution?lat=" +
      latitude + "&lon=" + longitude + "&appid=" + apiKey;

    var mask = false;
    fetch(url2)
      .then(response => response.json())
      .then(data => {
        let quality = data.list[0].main.aqi;
        console.log(quality);
        if (quality > 2) {
          mask = true;
        }
        let l = [0, "good", "fair", "moderate", "poor", "very poor"];
        let qualityDesc = l[quality];
        air.innerHTML = qualityDesc + " air quality";
      });

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(mask);
        let date = new Date(data.dt * 1000);
        let tempTime = date.toLocaleTimeString();
        let len = tempTime.length;
        time.innerHTML = tempTime.substring(0, len - 6) + tempTime.substring(len - 3);

        location.innerHTML = data.name;

        let iconID = data.weather[0].icon;
        iconURL = "weathers/" + iconID.substring(0, 2) + ".png";
        document.getElementById("icon").src = iconURL;

        /*else {
          iconURL = "https://openweathermap.org/img/wn/" + iconID + "@2x.png";
        }*/

        let temp = data.main.feels_like;
        temperature.innerHTML = "feels like " + temp + "° F";

        let weatherType = data.weather[0].main;
        let weather = "idk"
        if (weatherType == "Clear") { /* clear */
          weather = "clear";
        } else if (weatherType in ["Rain", "Thunderstorm", "Drizzle",]) { /* rain/thunder */
          weather = "rainy";
        } else if (weatherType == "Snow") { /* snow */
          weather = "snowy";
        } else if (weatherType == "Clouds") { /* clouds */
          weather = "cloudy";
          /*} else if (700 < weatherID < 800) { polluted 
            weather = "hazy";*/
        } else { /* bruh */
          weather = "hazy"
        }
        let desc = data.weather[0].description;
        /* weather description to display = temperature segment + description */
        let feels = "good";
        let outfitDesc = "cute";
        if (temp > 80) { /* hot */
          feels = "hot+" + desc;
          if (weather == "clear") {
            outfitDesc = "sunnies+shorts"; /* sunnies+short+tshirt */
          } else if (mask == true) {
            outfitDesc = "mask+shorts"; /* mask+short+tshirt */
          } else if (weather == "rainy") {
            outfitDesc = "umbrella+shorts"; /* umbrella+short+tshirt */
          } else {
            outfitDesc = "tshirt+shorts"; /* short+tshirt */
          }
        } else if (temp > 65) { /* warm */
          feels = "warm+" + desc;
          if (weather == "clear") {
            outfitDesc = "sunnies+tshirt"; /* sunnies+pants+tshirt */
          } else if (mask == true) {
            outfitDesc = "mask+tshirt"; /* mask+pants+tshirt */
          } else if (weather == "rainy") {
            outfitDesc = "umbrella+tshirt"; /* umbrella+pants+tshirt */
          } else {
            outfitDesc = "pants+tshirt"; /* pants+tshirt */
          }
        } else if (temp > 45) { /* cool */
          feels = "cool+" + desc;
          if (mask == true) {
            outfitDesc = "mask+hoodie"; /* mask+pants+hoodie */
          } else if (weather == "rainy") {
            outfitDesc = "umbrella+hoodie"; /* umbrella+pants+hoodie */
          } else {
            outfitDesc = "hoodie+pants"; /* pants+hoodie */
          }
        } else { /* cold */
          feels = "cold+" + desc;
          if (weather == "snowy") {
            outfitDesc = "knits+jacket"; /* hat+puffer+boots */
          } else if (mask == true) {
            outfitDesc = "mask+jacket"; /* mask+pants+jacket */
          } else if (weather == "rainy") {
            outfitDesc = "umbrella+jacket"; /* umbrella+pants+jacket */
          } else {
            outfitDesc = "jacket+pants"; /* pants+jacket */
          }
        }
        description.innerHTML = feels;
        fit.innerHTML = outfitDesc + " weather today";
        document.getElementById("outfit").src = "fits/" + outfitDesc + ".png";
      });
  }

  function error() {
    console.log("error");
    location.innerHTML = "Unable to retrieve your location";
  }
}

getWeather();