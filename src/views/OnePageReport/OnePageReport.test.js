import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import OnePageReport from './OnePageReport';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><OnePageReport /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
