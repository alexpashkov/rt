import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '../../ThemeProvider';
import Spectres from '../Spectres';

describe('Spectres', () => {
  it('Renders', () => {
    const component = renderer.create(
      <ThemeProvider>
        <Spectres />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
