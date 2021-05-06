import React from 'react';
import ReactDOM from 'react-dom';
import Constents from './Constents';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Constents />, div);
  ReactDOM.unmountComponentAtNode(div);
});
