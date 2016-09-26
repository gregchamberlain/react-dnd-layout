import React from 'react';
import { string, number, boolean, object, array, text } from 'react-formulate';

const Title = ({content, style}) => <h1 style={style}>{content}</h1>;

Title.defaultProps = {
  content: 'Title',
  style: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'inherit',
    boxSizing: 'border-box',
    margin: 0,
    color: 'inherit',
    textShadow: 'inherit'
  },
};

Title.propInputs = object({
  content: text({label: 'Content'}),
  style: object({
    flex: number({label: 'Flex'}),
    fontWeight: string({label: 'Font Weight'}),
    padding: number({label: 'Padding'}),
    textAlign: string({label: 'Text Align'}),
    color: string({label: 'Font Color'}),
    textShadow: string({label: 'Text Shadow'})
  }, {label: 'Style'}),
});

Title.Icon = (
  <svg fill="#eee" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 4v3h5.5v12h3V7H19V4z"/>
    <path d="M0 0h24v24H0V0z" fill="none"/>
  </svg>
);

export default Title;
