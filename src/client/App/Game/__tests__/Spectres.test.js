import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '../../ThemeProvider';
import Spectres from '../Spectres';

describe('Spectres', () => {
  it('Renders with spectres', () => {
    const component = renderer.create(
      <ThemeProvider>
        <Spectres
          spectres={[
            {
              id: 'player1',
              spectre: Array.from(Array(20)).fill(Array.from(Array(10).fill(0)))
            },
            {
              id: 'player2',
              spectre: Array.from(Array(20)).fill(Array.from(Array(10).fill(0)))
            }
          ]}
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('Renders empty', () => {
    const component = renderer.create(
      <ThemeProvider>
        <Spectres />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
