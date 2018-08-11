import React from 'react';
import renderer from 'react-test-renderer';
import Game from '../Game';
import { ThemeProvider } from '../../ThemeProvider';

describe('Game', () => {
  it('Renders', () => {
    const component = renderer.create(
      <ThemeProvider>
        <Game />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
