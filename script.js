import API_KEY from "./config.js";

// Assume result.sunrise and result.sunset are Unix timestamps
// Function to convert Unix timestamp to HH:MM:SS format
function convertUnixTimestampToTime(timestamp) {
    // Create a new Date object with the Unix timestamp in milliseconds
    const date = new Date(timestamp * 1000);
    // Get the hours, minutes, and seconds from the Date object
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    // Format the time as HH:MM:SS
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

// Function to convert Unix timestamp to a date string
function convertUnixTimestampToDate(timestamp) {
    // Create a new Date object with the Unix timestamp in milliseconds
    const date = new Date(timestamp * 1000);
    // Get the date, month, and year from the Date object
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const year = date.getFullYear();
    // Format the date as DD/MM/YYYY
    return day + '/' + month + '/' + year;
}

// Convert Unix timestamps to human-readable formats



async function getWeather(city) {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key':API_KEY,
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        loader.style.display = 'block';
        main.classList.add('filter')
        const response = await fetch(url, options);
        const result = await response.json();
        loader.style.display = 'none';
        main.classList.remove('filter')
        cityName.innerHTML = city
        Temperature.innerHTML = result.temp +"°C"
        Feels_like.innerHTML = result.feels_like +"°C"
        Humidity.innerHTML = result.humidity +"%"
        Max_temp.innerHTML = result.max_temp +"°C" 
        Min_temp.innerHTML = result.min_temp +"°C"
        Sunrise.innerHTML = convertUnixTimestampToTime(result.sunrise) +" AM"
        Sunset.innerHTML = convertUnixTimestampToTime(result.sunset) +" PM"
        Wind_degree.innerHTML = result.wind_degrees +"°"
        Wind_speed.innerHTML = result.wind_speed +" km/h"
    } catch (error) {
        console.error(error);
    }
}

city.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        getWeather(city.value); 
        city.value = '';
    }
});

submit.addEventListener("click", (e) => {
    e.preventDefault()
    getWeather(city.value)
    city.value = '';
})
getWeather("mumbai")