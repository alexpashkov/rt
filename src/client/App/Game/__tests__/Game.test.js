import React from 'react';
import renderer from 'react-test-renderer';
import Game from '../Game';
import { ThemeProviderWithTheme } from '../../ThemeProviderWithTheme';

describe('Game', () => {
  it('Renders', () => {
    const component = renderer.create(
      <ThemeProviderWithTheme>
        <Game />
      </ThemeProviderWithTheme>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
