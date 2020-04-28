import React from 'react';
import ReactDOM from 'react-dom';
import GlobalSettings from './GlobalSettings';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GlobalSettings />, div);
  ReactDOM.unmountComponentAtNode(div);
});
