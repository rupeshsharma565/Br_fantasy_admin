import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import WithdrawRequest from './WithdrawRequest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><WithdrawRequest /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
