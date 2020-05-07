import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import DevelopSetting from './DevelopSetting';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><DevelopSetting /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
