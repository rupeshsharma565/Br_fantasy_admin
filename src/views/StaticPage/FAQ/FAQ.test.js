import React from 'react';
import ReactDOM from 'react-dom';
import FAQ from './FAQ';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FAQ />, div);
  ReactDOM.unmountComponentAtNode(div);
});
