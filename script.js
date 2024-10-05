let weather = {
    "apikey": "807fe0b7af891df4a4cf53f6c78ce9ab",  // Your actual API key
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apikey
        )
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");  // Handle invalid city name or issues with API
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);  // Log the data for debugging
            this.displayWeather(data);
        })
        .catch((error) => {
            console.error("Error:", error);  // Log the error
            alert("Error: " + error.message);  // Display the error message
        });
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");

        // Change background based on the weather description
        this.changeBackground(description);
    },

    changeBackground: function(description) {
        // Make the description lowercase for consistent comparison
        const weatherCondition = description.toLowerCase();

        if (weatherCondition.includes("clear")) {
            document.body.style.backgroundImage = "url(clearsky.webp)";
        } else if (weatherCondition.includes("clouds")) {
            document.body.style.backgroundImage = "url(cloudy.webp)";
        } else if (weatherCondition.includes("rain")) {
            document.body.style.backgroundImage = "url(rainy.webp)";
        } else if (weatherCondition.includes("snow")) {
            document.body.style.backgroundImage = "url(snowy.webp)";
        } else if (weatherCondition.includes("thunderstorm")) {
            document.body.style.backgroundImage = "url('thunderstorms.webp')";
        } else if (weatherCondition.includes("mist") || weatherCondition.includes("haze") || weatherCondition.includes("fog")) {
            document.body.style.backgroundImage = "url('mist.webp')";
        } else {
            // Default background if no specific weather condition is matched
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?weather')";
        }
    },

    search: function() {
        const city = document.querySelector(".searchbar").value.trim();
        if (city) {
            this.fetchWeather(city);
        } else {
            alert("Please enter a city name!");
        }
    }
};

// Event listener for search button click
document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

// Event listener for pressing "Enter" in search input
document.querySelector(".searchbar").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        weather.search();
    }
});

// Initial fetch for a default city (e.g., "Durgapur")
weather.fetchWeather("Chittoor");
