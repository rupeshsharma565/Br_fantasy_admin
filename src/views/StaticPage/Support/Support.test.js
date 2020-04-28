import React from 'react';
import ReactDOM from 'react-dom';
import Support from './Support';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Support />, div);
  ReactDOM.unmountComponentAtNode(div);
});
