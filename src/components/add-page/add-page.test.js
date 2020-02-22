import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AddPage from './add-page';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><AddPage /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});