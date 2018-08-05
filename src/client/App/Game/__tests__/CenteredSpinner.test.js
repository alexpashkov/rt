import React from 'react';
import CenteredSpinner from '../CenteredSpinner';
import renderer from 'react-test-renderer';

describe('CenteredSpinner', () => {
  it('Renders without throwing an exception', () => {
    const component = renderer.create(<CenteredSpinner />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
