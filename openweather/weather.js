document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const apiKey = 'b0dfc9e8bb1b7d07259bd9d5542ce3ff'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                const forecast = data.list;
                let forecastHTML = '';

                forecast.forEach((item) => {
                    const dateTime = new Date(item.dt * 1000);
                    const temperature = item.main.temp;
                    const humidity = item.main.humidity;
                    const windSpeed = item.wind.speed;

                    forecastHTML += `
                        <div>
                            <h3>${dateTime.toLocaleString()}</h3>
                            <p>Temperature: ${temperature}°C</p>
                            <p>Humidity: ${humidity}%</p>
                            <p>Wind Speed: ${windSpeed} m/s</p>
                        </div>
                    `;
                });

                document.getElementById('forecast').innerHTML = forecastHTML;
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data');
        });
});
