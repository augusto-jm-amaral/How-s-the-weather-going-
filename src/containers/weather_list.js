import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../components/chart'
import GoogleMap from '../components/google_map'

class WeatherList extends Component {

  renderWeather(cityData) {

    const name = cityData.city.name;
    const id = cityData.city.id;
    const { lat, lon } = cityData.city.coord;

    const temps = cityData.list.map( weather => weather.main.temp - 273 );
    const pressures = cityData.list.map( weather => weather.main.pressure );
    const humidities = cityData.list.map( weather => weather.main.humidity );


    return (
        <tr key={ id } >
          <td>
            <GoogleMap  lat={lat} lon={lon} />
          </td>
          <td>
            <Chart color="red" data={temps} units="ºC" />
          </td>
          <td>
            <Chart color="green" data={pressures} units="hPa" />
          </td>
          <td>
            <Chart color="blue" data={humidities} units="%" />
          </td>
        </tr>
      );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (ºC)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          { this.props.weather.map(this.renderWeather) }
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }){
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);