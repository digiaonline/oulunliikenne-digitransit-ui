import { expect } from 'chai';
import { afterEach, describe, it } from 'mocha';
import React from 'react';

import defaultConfig from '../../../app/configurations/config.default';
import { getDefaultSettings } from '../../../app/util/planParamUtil';
import { shallowWithIntl } from '../helpers/mock-intl-enzyme';
import SaveCustomizedSettingsButton from '../../../app/component/SaveCustomizedSettingsButton';
import { mockContext } from '../helpers/mock-context';
import {
  getCustomizedSettings,
  setCustomizedSettings,
} from '../../../app/store/localStorage';
import { OptimizeType } from '../../../app/constants';

describe('<SaveCustomizedSettingsButton />', () => {
  afterEach(() => {
    global.localStorage.clear();
  });

  it('should call noSettingsFound if the query and localStorage do not contain any settings', () => {
    const context = {
      ...mockContext,
      config: defaultConfig,
    };
    context.location.query = {};

    let wasCalled = false;
    const callback = () => {
      wasCalled = true;
    };

    const wrapper = shallowWithIntl(
      <SaveCustomizedSettingsButton noSettingsFound={callback} />,
      {
        context,
      },
    );
    wrapper.find('.save-settings-button').simulate('click');
    expect(wasCalled).to.equal(true);
  });

  it('should not call noSettingsFound if the query is empty and localStorage has settings', () => {
    setCustomizedSettings({ optimize: OptimizeType.Safe }, 'PUBLIC_TRANSPORT');
    let wasCalled = false;
    const callback = () => {
      wasCalled = true;
    };

    const wrapper = shallowWithIntl(
      <SaveCustomizedSettingsButton noSettingsFound={callback} />,
      {
        context: {
          ...mockContext,
          config: defaultConfig,
          location: {
            ...mockContext.location,
            query: {},
          },
        },
      },
    );

    wrapper.find('.save-settings-button').simulate('click');
    expect(wasCalled).to.equal(false);
  });

  it('should not call noSettingsFound if the query is not empty and localStorage is empty', () => {
    let wasCalled = false;
    const callback = () => {
      wasCalled = true;
    };

    const wrapper = shallowWithIntl(
      <SaveCustomizedSettingsButton noSettingsFound={callback} />,
      {
        context: {
          ...mockContext,
          config: defaultConfig,
          location: {
            ...mockContext.location,
            query: {
              optimize: OptimizeType.Safe,
            },
          },
        },
      },
    );

    wrapper.find('.save-settings-button').simulate('click');
    expect(wasCalled).to.equal(false);
  });

  it('should call noSettingsFound if the query and localStorage contain only default settings', () => {
    const defaultSettings = getDefaultSettings(defaultConfig);
    setCustomizedSettings({ ...defaultSettings }, 'PUBLIC_TRANSPORT');

    const context = {
      ...mockContext,
      config: defaultConfig,
    };
    context.location.query = { ...defaultSettings };

    let wasCalled = false;
    const callback = () => {
      wasCalled = true;
    };

    const wrapper = shallowWithIntl(
      <SaveCustomizedSettingsButton noSettingsFound={callback} />,
      {
        context,
      },
    );
    wrapper.find('.save-settings-button').simulate('click');
    expect(wasCalled).to.equal(true);
  });

  it('should save the combined settings, not only query settings', () => {
    setCustomizedSettings({ optimize: OptimizeType.Safe }, 'PUBLIC_TRANSPORT');
    const query = { walkBoardCost: 1234 };

    const context = {
      ...mockContext,
      config: defaultConfig,
      location: {
        ...mockContext.location,
        query,
      },
    };

    let wasCalled = false;
    const callback = () => {
      wasCalled = true;
    };

    const wrapper = shallowWithIntl(
      <SaveCustomizedSettingsButton noSettingsFound={callback} />,
      {
        context,
      },
    );
    wrapper.find('.save-settings-button').simulate('click');
    expect(wasCalled).to.equal(false);

    const savedSettings = getCustomizedSettings();
    expect(savedSettings).to.deep.equal({
      optimize: OptimizeType.Safe,
      walkBoardCost: 1234,
      active: true,
    });
  });

  it('should not override localStorage settings with empty ones from the query', () => {
    setCustomizedSettings(
      { optimize: OptimizeType.Greenways },
      'PUBLIC_TRANSPORT',
    );
    const query = {};

    const context = {
      ...mockContext,
      config: defaultConfig,
      location: {
        ...mockContext.location,
        query,
      },
    };

    let wasCalled = false;
    const callback = () => {
      wasCalled = true;
    };

    const wrapper = shallowWithIntl(
      <SaveCustomizedSettingsButton noSettingsFound={callback} />,
      {
        context,
      },
    );
    wrapper.find('.save-settings-button').simulate('click');
    expect(wasCalled).to.equal(false);

    const savedSettings = getCustomizedSettings();
    expect(savedSettings).to.deep.equal({
      optimize: OptimizeType.Greenways,
      active: true,
    });
  });
});
