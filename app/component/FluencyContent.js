import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import ComponentUsageExample from './ComponentUsageExample';
import { lang as exampleLang } from './ExampleData';

const getFlowTranslation = trafficFlow => {
  switch (trafficFlow) {
    case 'TRAFFIC_FLOW_NORMAL':
      return (
        <FormattedMessage id="traffic-flow-normal" defaultMessage="Normal" />
      );
    case 'TRAFFIC_HEAVIER_THAN_NORMAL':
      return (
        <FormattedMessage id="traffic-flow-medium" defaultMessage="Medium" />
      );
    case 'TRAFFIC_MUCH_HEAVIER_THAN_NORMAL':
      return (
        <FormattedMessage id="traffic-flow-heavy" defaultMessage="Heavy" />
      );
    case 'TRAFFIC_FLOW_UNKNOWN':
    default:
      return (
        <FormattedMessage id="traffic-flow-unknown" defaultMessage="Unknown" />
      );
  }
};

const FluencyContent = ({
  trafficFlow,
  trafficDirectionName,
  averageSpeed,
  measuredTime,
}) => (
  <table className="component-list">
    <tbody>
      {trafficFlow && (
        <tr>
          <td>
            <FormattedMessage id="traffic-flow" defaultMessage="Traffic flow">
              {(...content) => `${content}:`}
            </FormattedMessage>
          </td>
          <td>{getFlowTranslation(trafficFlow)}</td>
        </tr>
      )}
      {trafficDirectionName && (
        <tr>
          <td>
            <FormattedMessage
              id="traffic-direction"
              defaultMessage="Traffic direction"
            >
              {(...content) => `${content}:`}
            </FormattedMessage>
          </td>
          <td>{trafficDirectionName}</td>
        </tr>
      )}
      {averageSpeed && (
        <tr>
          <td>
            <FormattedMessage id="average-speed" defaultMessage="Average speed">
              {(...content) => `${content}:`}
            </FormattedMessage>
          </td>
          <td>{`${averageSpeed} km/h`}</td>
        </tr>
      )}
      {measuredTime && (
        <tr>
          <td>
            <FormattedMessage id="last-updated" defaultMessage="Last updated">
              {(...content) => `${content}:`}
            </FormattedMessage>
          </td>
          <td>{moment(measuredTime).format('HH:mm:ss') || ''}</td>
        </tr>
      )}
    </tbody>
  </table>
);

FluencyContent.displayName = 'FluencyContent';

FluencyContent.description = (
  <div>
    <p>Content of a fluency popup or modal</p>
    <ComponentUsageExample description="">
      <FluencyContent comment={exampleLang} />
    </ComponentUsageExample>
  </div>
);

FluencyContent.propTypes = {
  trafficFlow: PropTypes.string,
  trafficDirectionName: PropTypes.string,
  averageSpeed: PropTypes.number,
  measuredTime: PropTypes.string,
};

FluencyContent.defaultProps = {
  trafficFlow: null,
  trafficDirectionName: null,
  averageSpeed: null,
  measuredTime: null,
};

export default FluencyContent;
