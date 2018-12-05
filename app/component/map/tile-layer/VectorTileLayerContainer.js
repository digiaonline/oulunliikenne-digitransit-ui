import PropTypes from 'prop-types';
import React from 'react';

import TileLayerContainer from './TileLayerContainer';
import CityBikes from './CityBikes';
import Stops from './Stops';
import ParkAndRide from './ParkAndRide';
import TicketSales from './TicketSales';
import ParkingStations from './ParkingStations';
import CameraStations from './CameraStations';
import Roadworks from './Roadworks';
import Disorders from './Disorders';
import WeatherStations from './WeatherStations';
import TmsStations from './TmsStations';
import RoadConditions from './RoadConditions';

class VectorTileLayerContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const { showStops, hilightedStops, disableMapTracking } = this.props;
    const { config } = this.context;
    const layers = [];

    if (showStops) {
      if (config.roadConditions && config.roadConditions.showRoadConditions) {
        layers.push(RoadConditions);
      }

      if (config.roadworks && config.roadworks.showRoadworks) {
        layers.push(Roadworks);
      }

      layers.push(Stops);

      if (config.cityBike && config.cityBike.showCityBikes) {
        layers.push(CityBikes);
      }

      if (config.parkAndRide && config.parkAndRide.showParkAndRide) {
        layers.push(ParkAndRide);
      }

      if (config.ticketSales && config.ticketSales.showTicketSales) {
        layers.push(TicketSales);
      }

      if (
        config.parkingStations &&
        config.parkingStations.showParkingStations
      ) {
        layers.push(ParkingStations);
      }

      if (config.cameraStations && config.cameraStations.showCameraStations) {
        layers.push(CameraStations);
      }

      if (config.disorders && config.disorders.showDisorders) {
        layers.push(Disorders);
      }

      if (
        config.weatherStations &&
        config.weatherStations.showWeatherStations
      ) {
        layers.push(WeatherStations);
      }

      if (config.tmsStations && config.tmsStations.showTmsStations) {
        layers.push(TmsStations);
      }
    }

    return (
      <TileLayerContainer
        key="tileLayer"
        layers={layers}
        hilightedStops={hilightedStops}
        tileSize={config.map.tileSize || 256}
        zoomOffset={config.map.zoomOffset || 0}
        disableMapTracking={disableMapTracking}
      />
    );
  }
}

VectorTileLayerContainer.propTypes = {
  hilightedStops: PropTypes.arrayOf(PropTypes.string.isRequired),
  disableMapTracking: PropTypes.func,
  showStops: PropTypes.bool,
};

VectorTileLayerContainer.contextTypes = {
  config: PropTypes.object.isRequired,
};

export default VectorTileLayerContainer;
