import React from 'react';
import ReactDOM from 'react-dom';
import TermCondition from './TermCondition';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TermCondition />, div);
  ReactDOM.unmountComponentAtNode(div);
});
