import connectToStores from 'fluxible-addons-react/connectToStores';
import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import get from 'lodash/get';
import Toggle from 'material-ui/Toggle';
import BubbleDialog from './BubbleDialog';
import Checkbox from './Checkbox';
import { updateMapLayers } from '../action/MapLayerActions';
import MapLayerStore, { mapLayerShape } from '../store/MapLayerStore';

import ComponentUsageExample from './ComponentUsageExample';

function InputField(props, { config, intl }) {
  if (config.mapTrackingButtons && config.mapTrackingButtons.altPosition) {
    return (
      <Toggle
        label={intl.formatMessage({
          id: props.labelId,
          defaultMessage: props.defaultMessage,
        })}
        toggled={props.checked}
        className="toggle-item"
        onClick={props.onChange}
      />
    );
  }

  return (
    <Checkbox
      checked={props.checked}
      labelId={props.labelId}
      defaultMessage={props.defaultMessage}
      onChange={props.onChange}
    />
  );
}

InputField.propTypes = {
  checked: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputField.contextTypes = {
  config: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

class SelectMapLayersDialog extends React.Component {
  updateSetting = newSetting => {
    this.props.updateMapLayers({
      ...this.props.mapLayers,
      ...newSetting,
    });
  };

  updateStopAndTerminalSetting = newSetting => {
    const { mapLayers } = this.props;
    const stop = {
      ...mapLayers.stop,
      ...newSetting,
    };
    const terminal = {
      ...mapLayers.terminal,
      ...newSetting,
    };
    this.updateSetting({ stop, terminal });
  };

  updateStopSetting = newSetting => {
    const stop = {
      ...this.props.mapLayers.stop,
      ...newSetting,
    };
    this.updateSetting({ stop });
  };

  updateTerminalSetting = newSetting => {
    const terminal = {
      ...this.props.mapLayers.terminal,
      ...newSetting,
    };
    this.updateSetting({ terminal });
  };

  updateTicketSalesSetting = newSetting => {
    const ticketSales = {
      ...this.props.mapLayers.ticketSales,
      ...newSetting,
    };
    this.updateSetting({ ticketSales });
  };

  renderContents = (
    {
      citybike,
      parkAndRide,
      stop,
      terminal,
      ticketSales,
      parkingStations,
      disorders,
      roadworks,
      cameraStations,
      weatherStations,
      tmsStations,
      roadConditions,
    },
    config,
  ) => {
    const isTransportModeEnabled = transportMode =>
      transportMode && transportMode.availableForSelection;
    const transportModes = config.transportModes || {};
    return (
      <React.Fragment>
        <div className="checkbox-grouping">
          {isTransportModeEnabled(transportModes.bus) && (
            <React.Fragment>
              <InputField
                checked={stop.bus}
                labelId="map-layer-stop-bus"
                defaultMessage="Bus stop"
                onChange={e =>
                  this.updateStopSetting({ bus: e.target.checked })
                }
              />
              <InputField
                checked={terminal.bus}
                labelId="map-layer-terminal-bus"
                defaultMessage="Bus terminal"
                onChange={e =>
                  this.updateTerminalSetting({ bus: e.target.checked })
                }
              />
            </React.Fragment>
          )}
          {isTransportModeEnabled(transportModes.tram) && (
            <InputField
              checked={stop.tram}
              labelId="map-layer-stop-tram"
              defaultMessage="Tram stop"
              onChange={e => this.updateStopSetting({ tram: e.target.checked })}
            />
          )}
          {isTransportModeEnabled(transportModes.rail) && (
            <InputField
              checked={terminal.rail}
              labelId="map-layer-terminal-rail"
              defaultMessage="Railway station"
              onChange={e =>
                this.updateStopAndTerminalSetting({ rail: e.target.checked })
              }
            />
          )}
          {isTransportModeEnabled(transportModes.subway) && (
            <InputField
              checked={terminal.subway}
              labelId="map-layer-terminal-subway"
              defaultMessage="Subway station"
              onChange={e =>
                this.updateStopAndTerminalSetting({ subway: e.target.checked })
              }
            />
          )}
          {isTransportModeEnabled(transportModes.ferry) && (
            <InputField
              checked={cameraStations}
              labelId="cameras"
              defaultMessage="Cameras"
              onChange={e =>
                this.updateSetting({ cameraStations: e.target.checked })
              }
            />
          )}
          {config.cityBike &&
            config.cityBike.showCityBikes && (
              <InputField
                checked={citybike}
                labelId="map-layer-citybike"
                defaultMessage="Citybike station"
                onChange={e =>
                  this.updateSetting({ citybike: e.target.checked })
                }
              />
            )}
          {config.parkAndRide &&
            config.parkAndRide.showParkAndRide && (
              <InputField
                checked={parkAndRide}
                labelId="map-layer-park-and-ride"
                defaultMessage="Park &amp; ride"
                onChange={e =>
                  this.updateSetting({ parkAndRide: e.target.checked })
                }
              />
            )}
          {config.parkingStations &&
            config.parkingStations.showParkingStations && (
              <InputField
                checked={parkingStations}
                labelId="parking"
                defaultMessage="Parking"
                onChange={e =>
                  this.updateSetting({ parkingStations: e.target.checked })
                }
              />
            )}
          {config.disorders &&
            config.disorders.showDisorders && (
              <InputField
                checked={disorders}
                labelId="disruptions"
                defaultMessage="Disruptions"
                onChange={e =>
                  this.updateSetting({ disorders: e.target.checked })
                }
              />
            )}
          {config.roadworks &&
            config.roadworks.showRoadworks && (
              <InputField
                checked={roadworks}
                labelId="roadworks"
                defaultMessage="Roadworks"
                onChange={e =>
                  this.updateSetting({ roadworks: e.target.checked })
                }
              />
            )}
          {config.cameraStations &&
            config.cameraStations.showCameraStations && (
              <InputField
                checked={cameraStations}
                labelId="cameras"
                defaultMessage="Cameras"
                onChange={e =>
                  this.updateSetting({ cameraStations: e.target.checked })
                }
              />
            )}
          {config.weatherStations &&
            config.weatherStations.showWeatherStations && (
              <InputField
                checked={weatherStations}
                labelId="weather-stations"
                defaultMessage="Weather stations"
                onChange={e =>
                  this.updateSetting({ weatherStations: e.target.checked })
                }
              />
            )}
          {config.tmsStations &&
            config.tmsStations.showTmsStations && (
              <InputField
                checked={tmsStations}
                labelId="traffic-monitoring"
                defaultMessage="Traffic monitoring"
                onChange={e =>
                  this.updateSetting({ tmsStations: e.target.checked })
                }
              />
            )}
          {config.roadConditions &&
            config.roadConditions.showRoadConditions && (
              <InputField
                checked={roadConditions}
                labelId="traffic-monitoring"
                defaultMessage="Traffic monitoring"
                onChange={e =>
                  this.updateSetting({ roadConditions: e.target.checked })
                }
              />
            )}
        </div>
        {config.ticketSales &&
          config.ticketSales.showTicketSales && (
            <div className="checkbox-grouping">
              <InputField
                checked={ticketSales.ticketMachine}
                labelId="map-layer-ticket-sales-machine"
                defaultMessage="Ticket machine"
                onChange={e =>
                  this.updateTicketSalesSetting({
                    ticketMachine: e.target.checked,
                  })
                }
              />
              <InputField
                checked={ticketSales.salesPoint}
                labelId="map-layer-ticket-sales-point"
                defaultMessage="Travel Card top up"
                onChange={e =>
                  this.updateTicketSalesSetting({
                    salesPoint: e.target.checked,
                    servicePoint: e.target.checked,
                  })
                }
              />
            </div>
          )}
      </React.Fragment>
    );
  };

  render() {
    const { config } = this.props;
    return (
      <BubbleDialog
        containerClassName={get(
          config,
          'mapTrackingButtons.layers.containerClassName',
          undefined,
        )}
        contentClassName="select-map-layers-dialog-content"
        header={get(
          config,
          'mapTrackingButtons.layers.headerId',
          'select-map-layers-header',
        )}
        id="mapLayerSelector"
        icon={get(config, 'mapTrackingButtons.layers.icon', 'map-layers')}
        buttonText={get(
          config,
          'mapTrackingButtons.layers.buttonText',
          undefined,
        )}
        isOpen={this.props.isOpen}
        isFullscreenOnMobile
      >
        {this.renderContents(this.props.mapLayers, this.props.config)}
      </BubbleDialog>
    );
  }
}

const transportModeConfigShape = PropTypes.shape({
  availableForSelection: PropTypes.bool,
});

const mapLayersConfigShape = PropTypes.shape({
  cityBike: PropTypes.shape({
    showCityBikes: PropTypes.bool,
  }),
  parkAndRide: PropTypes.shape({
    showParkAndRide: PropTypes.bool,
  }),
  tmsStations: PropTypes.shape({
    showTmsStations: PropTypes.bool,
  }),
  weatherStations: PropTypes.shape({
    showWeatherStations: PropTypes.bool,
  }),
  parkingStations: PropTypes.shape({
    showParkingStations: PropTypes.bool,
  }),
  cameraStations: PropTypes.shape({
    showCameraStations: PropTypes.bool,
  }),
  roadworks: PropTypes.shape({
    showRoadworks: PropTypes.bool,
  }),
  disorders: PropTypes.shape({
    showDisorders: PropTypes.bool,
  }),
  roadConditions: PropTypes.shape({
    showRoadConditions: PropTypes.bool,
  }),
  ticketSales: PropTypes.shape({
    showTicketSales: PropTypes.bool,
  }),
  transportModes: PropTypes.shape({
    bus: transportModeConfigShape,
    citybike: transportModeConfigShape,
    ferry: transportModeConfigShape,
    rail: transportModeConfigShape,
    subway: transportModeConfigShape,
    tram: transportModeConfigShape,
  }),
});

SelectMapLayersDialog.propTypes = {
  config: mapLayersConfigShape,
  isOpen: PropTypes.bool,
  mapLayers: mapLayerShape.isRequired,
  updateMapLayers: PropTypes.func.isRequired,
};

SelectMapLayersDialog.defaultProps = {
  config: {},
  isOpen: false,
};

SelectMapLayersDialog.description = (
  <ComponentUsageExample isFullscreen>
    <div style={{ bottom: 0, left: 0, position: 'absolute' }}>
      <SelectMapLayersDialog
        config={{
          parkAndRide: {
            showParkAndRide: true,
          },
          ticketSales: {
            showTicketSales: true,
          },
          transportModes: {
            bus: {
              availableForSelection: true,
            },
            ferry: {
              availableForSelection: true,
            },
            rail: {
              availableForSelection: true,
            },
            subway: {
              availableForSelection: true,
            },
            tram: {
              availableForSelection: true,
            },
          },
        }}
        isOpen
        mapLayers={{
          stop: { bus: true },
          terminal: { subway: true },
          ticketSales: { ticketMachine: true },
        }}
        updateMapLayers={() => {}}
      />
    </div>
  </ComponentUsageExample>
);

const connectedComponent = connectToStores(
  SelectMapLayersDialog,
  [MapLayerStore],
  context => ({
    config: context.config,
    mapLayers: context.getStore(MapLayerStore).getMapLayers(),
    updateMapLayers: mapLayers =>
      context.executeAction(updateMapLayers, { ...mapLayers }),
  }),
  {
    config: mapLayersConfigShape,
    executeAction: PropTypes.func,
  },
);

export { connectedComponent as default, SelectMapLayersDialog as Component };
