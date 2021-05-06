import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import PanCard from './PanCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><PanCard /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
