import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import NotificationToUser from './NotificationToUser';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><NotificationToUser /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
