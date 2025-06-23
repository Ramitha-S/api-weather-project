function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "5442bd9ba7104f95afe143021251506"; // Replace with your real WeatherAPI key

    if (!city) {
        document.getElementById("weatherData").innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherData = document.getElementById("weatherData");

            if (data && data.location) {
                const weatherHTML = `
                    <h3>${data.location.name}, ${data.location.country}</h3>
                    <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
                    <p><strong>Condition:</strong> ${data.current.condition.text}</p>
                    <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
                `;
                weatherData.innerHTML = weatherHTML;
            } else {
                weatherData.innerHTML = "<p>City not found. Please try again.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("weatherData").innerHTML = "<p>Error fetching data. Check console for details.</p>";
        });
}
