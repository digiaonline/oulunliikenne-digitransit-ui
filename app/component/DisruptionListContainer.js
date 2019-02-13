import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay/classic';
import moment from 'moment';
import { FormattedMessage, intlShape } from 'react-intl';
import find from 'lodash/find';
import uniqBy from 'lodash/uniqBy';
import DisruptionRow from './DisruptionRow';

function DisruptionListContainer({ root }, { intl }) {
  if (!root || !root.alerts || root.alerts.length === 0) {
    return (
      <FormattedMessage
        id="disruption-info-no-alerts"
        defaultMessage="No known disruptions or diversions."
      />
    );
  }

  const alerts = uniqBy(
    root.alerts,
    alert =>
      `${alert.alertDescriptionText}_${alert.effectiveStartDate}_${
        alert.effectiveEndDate
      }`,
  );

  const alertElements = alerts.map(alert => {
    const { id } = alert;
    const startTime = moment(alert.effectiveStartDate * 1000);
    const endTime = moment(alert.effectiveEndDate * 1000);
    const routes = alert.route ? [alert.route] : undefined;
    const translation = find(alert.alertDescriptionTextTranslations, [
      'language',
      intl.locale,
    ]);

    const description = translation
      ? translation.text
      : alert.alertDescriptionText;

    return (
      <DisruptionRow
        key={id}
        description={description}
        startTime={startTime}
        endTime={endTime}
        routes={routes}
      />
    );
  });

  return <div>{alertElements}</div>;
}

DisruptionListContainer.contextTypes = {
  intl: intlShape,
};

DisruptionListContainer.propTypes = {
  root: PropTypes.shape({
    alerts: PropTypes.array,
  }).isRequired,
};

export default Relay.createContainer(DisruptionListContainer, {
  fragments: {
    root: () => Relay.QL`
      fragment on Query {
        alerts(feeds:$feedIds) {
          id
          feed
          alertHeaderText
          alertHeaderTextTranslations {
            text
            language
          }
          alertDescriptionText
          alertDescriptionTextTranslations {
            text
            language
          }
          effectiveStartDate
          effectiveEndDate
          route {
            shortName
            mode
          }
        }
      }
    `,
  },
  initialVariables: { feedIds: null },
});
