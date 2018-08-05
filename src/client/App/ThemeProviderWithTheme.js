import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../theme';

export const ThemeProviderWithTheme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default ThemeProviderWithTheme;
