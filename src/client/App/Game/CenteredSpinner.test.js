import React from 'react';
import CenteredSpinner from './CenteredSpinner';
import renderer from 'react-test-renderer';

test('Renders without throwing an exception', () => {
  const component = renderer.create(<CenteredSpinner />);
  expect(component.toJSON()).toMatchSnapshot();
});
