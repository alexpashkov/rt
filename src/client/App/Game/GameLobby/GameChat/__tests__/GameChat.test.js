import React from "react";
import GameChat from '../GameChat';
import renderer from 'react-test-renderer';
import ThemeProvider from "../../../../ThemeProvider"

describe('GameChat', () => {
  it('Renders without throwing an exception', () => {
    const component = renderer.create(<ThemeProvider><GameChat /></ThemeProvider>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
