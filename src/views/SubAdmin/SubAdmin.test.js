import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import SubAdmin from './SubAdmin';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><SubAdmin /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
