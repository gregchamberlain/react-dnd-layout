import React from 'react';
import { render } from 'react-dom';
import BasicExample from './basic';
import WrapperExample from './wrapper';
import StatelessExample from './stateless';
import ProviderExample from './provider';

render(
  <ProviderExample />,
document.getElementById('root'));
