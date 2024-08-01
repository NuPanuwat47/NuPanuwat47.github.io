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
                const todayDate = new Date().toISOString().split('T')[0];
                
                const todayForecast = forecast.filter(item => {
                    const itemDate = new Date(item.dt * 1000).toISOString().split('T')[0];
                    return itemDate === todayDate;
                });

                if (todayForecast.length === 0) {
                    document.getElementById('forecast').innerHTML = '<p>No weather data available for today.</p>';
                    return;
                }

                let temperatureSum = 0;
                let humiditySum = 0;
                let windSpeedSum = 0;
                let count = 0;

                todayForecast.forEach(item => {
                    temperatureSum += item.main.temp;
                    humiditySum += item.main.humidity;
                    windSpeedSum += item.wind.speed;
                    count++;
                });

                const averageTemperature = (temperatureSum / count).toFixed(1);
                const averageHumidity = (humiditySum / count).toFixed(1);
                const averageWindSpeed = (windSpeedSum / count).toFixed(1);

                const forecastHTML = `
                    <div>
                        <h3>Today's Weather in ${city}</h3>
                        <p>Temperature: ${averageTemperature}°C</p>
                        <p>Humidity: ${averageHumidity}%</p>
                        <p>Wind Speed: ${averageWindSpeed} m/s</p>
                    </div>
                `;

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
