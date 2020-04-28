import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Promocode from './Promocode';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Rewards /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
