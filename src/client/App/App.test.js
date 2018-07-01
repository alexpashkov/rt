import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

test('mounts', () => {
  ReactDOM.render(<App />, document.createElement('div'));
});
