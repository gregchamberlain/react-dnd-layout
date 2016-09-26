import React from 'react';
import Radium from 'radium';
import { string, number, boolean, object, array, select } from 'react-formulate';

const Link = ({ href, text, style }) => (
  <a href={href} style={style}>{text}</a>
);

Link.defaultProps = {
  text: 'Link',
  href: '#',
  style: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'normal',
    boxSizing: 'border-box',
    padding: 10,
    textAlign: 'inherit',
    color: 'inherit',
    textShadow: 'inherit',
    textDecoration: 'none',
  },
};

Link.generateInputs = info => {
  return object({
    text: string({label: 'Content'}),
    href: select(info.pages.map(page => ({value: page.id, name: page.name})), {label: 'To'}),
    style: object({
      flex: number({label: 'Flex'}),
      fontSize: number({label: 'Font Size'}),
      fontWeight: string({label: 'Font Weight'}),
      padding: number({label: 'Padding'}),
      textAlign: string({label: 'Text Align'}),
      color: string({label: 'Font Color'}),
      textShadow: string({label: 'Text Shadow'})
    }, {label: 'Style'}),
  });
};

Link.Icon = (
  <svg fill="#eee" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
  </svg>
);

export default Radium(Link);
