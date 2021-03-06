import React from 'react';
import { expect } from 'chai';
import { describe, it } from 'mocha';

import { shallowWithIntl } from './helpers/mock-intl-enzyme';

import AppBarLarge from '../../app/component/AppBarLarge';
import Icon from '../../app/component/Icon';

describe('<AppBarLarge />', () => {
  it('should show logo image', () => {
    const wrapper = shallowWithIntl(
      <AppBarLarge titleClicked={() => {}} logo="/" />,
      {
        context: {
          config: {
            textLogo: false,
          },
        },
      },
    );

    expect(wrapper.find('.title span')).to.have.lengthOf(0);
    expect(wrapper.find('div.navi-logo')).to.have.lengthOf(1);
  });

  it('should show text logo when textLogo is true', () => {
    const wrapper = shallowWithIntl(
      <AppBarLarge titleClicked={() => {}} logo="/" />,
      {
        context: {
          config: {
            textLogo: true,
          },
        },
      },
    );

    expect(wrapper.find('.title span')).to.have.lengthOf(1);
    expect(wrapper.find('div.navi-logo')).to.have.lengthOf(0);
  });

  it('should enable pointer events for the disruptions info icon', () => {
    const wrapper = shallowWithIntl(<AppBarLarge titleClicked={() => {}} />, {
      context: { config: { textLogo: false, appBarDisruptionInfo: true } },
    });
    const icon = wrapper.find(Icon);
    expect(icon.props().pointerEvents).to.equal(true);
  });
});
