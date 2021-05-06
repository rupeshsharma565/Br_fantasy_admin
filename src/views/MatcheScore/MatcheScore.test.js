import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import MatcheScore from './MatcheScore';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><MatcheScore /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
