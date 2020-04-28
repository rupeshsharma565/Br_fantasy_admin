import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ChangePassword from './ChangePassword';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ChangePassword /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
