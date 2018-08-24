import React from "react";
import MessageList from '../MessageList';
import renderer from 'react-test-renderer';
import ThemeProvider from "../../../../ThemeProvider"

describe('GameChat', () => {
  it('Renders without throwing an exception', () => {
    const component = renderer.create(<ThemeProvider><MessageList /></ThemeProvider>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
