import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Referral from './Referral';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Referral /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
