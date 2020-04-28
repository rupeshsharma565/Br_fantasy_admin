import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Notification from './Notification';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Notification /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
