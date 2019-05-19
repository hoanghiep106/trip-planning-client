import React from 'react';

const WeatherInfo = ({ weather }) => {
  const temperature = Math.round(weather.temp - 273.15);
  let recommendation = '';
  if (temperature > 30) {
    recommendation = 'It\'s very hot outside. You should go to indoor places to escape the sweltering heat!';
  } else if (temperature <= 30 && temperature > 20) {
    recommendation = 'The weather is so nice. Enjoy your day!';
  } else if (temperature <= 20 && temperature > 10) {
    recommendation = 'It\'s quite cold outside. Remember to bring a light jacket!';
  } else {
    recommendation = 'It\'s very cold outside. Remember to pack up before leaving your place!';
  }

  return (
    <div className="">
      <div className="px-4 py-3">
        <h6>Weather</h6>
        <div className="row">
          <div className="col-md-6" style={{marginLeft: '10px'}}>
            <p>Temperature: {temperature} ˚C</p>
            <p>Humidity: {weather.humidity}%</p>
          </div>
          <div className="col-md-5">
            <img 
              className="pull-right" 
              src={`http://openweathermap.org/img/w/${weather.icon}.png`}
              alt="weather-icon"
            />
          </div>
        </div>
      </div>
      <p style={{marginLeft: '23px'}}>{recommendation}</p>
      <hr />
    </div>
  )
};

export default WeatherInfo;
