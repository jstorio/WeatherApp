window.addEventListener('load', ()=> {
  let long;
  let lat;
  let woeid;
  const proxy = "https://cors-anywhere.herokuapp.com/"
  let city = '';
  let weather_state = '';
  let temperature;

  //DOM elements
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let temperatureDescription = document.querySelector('.temperature-description');



  //retrieve woeID for current location
  function retrieveLocationID() {
    const api = `${proxy}https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`;

    return fetch(api)
      .then(data => { return data.json();})
      .then(data => {
        woeid = data[0].woeid;
    
      });
  }

  function retrieveWeatherInfo() {
    const api = `${proxy}https://www.metaweather.com/api/location/${woeid}/`;

    return fetch(api)
      .then(data => { return data.json();})
      .then(data => {

        city = data.title;
        weather_state = data.consolidated_weather[0].weather_state_name;
        temperature = data.consolidated_weather[0].the_temp;


    });
  }

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      //get current location coordinates
      long = position.coords.longitude;
      lat = position.coords.latitude;

      await retrieveLocationID();
      await retrieveWeatherInfo();

      //set DOM Elements from the API

      temperatureDegree.textContent = temperature;
      temperatureDescription.textContent = weather_state;
      locationTimezone.textContent = city;
      

    });

    }else {
    h1.textContent = "Please enable location on this site.";
  }


});
