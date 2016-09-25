import React from 'react';
import { string, number, boolean, object, array, text } from 'react-formulate';

const Text = ({content, style}) => <div style={style}>{content}</div>;

Text.defaultProps = {
  style: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'normal',
    boxSizing: 'border-box',
    padding: 10,
    textAlign: 'inherit',
    color: 'inherit',
    textShadow: 'inherit'
  },
  content: 'Text'
};

Text.propInputs = () => object({
  style: object({
    flex: number({label: 'Flex'}),
    fontSize: number({label: 'Font Size'}),
    fontWeight: string({label: 'Font Weight'}),
    padding: number({label: 'Padding'}),
    textAlign: string({label: 'Text Align'}),
    color: string({label: 'Font Color'}),
    textShadow: string({label: 'Text Shadow'})
  }, {label: 'Style'}),
  content: text({label: 'Content'})
});

Text.Icon = (
  <svg fill="#eee" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
);

export default Text;
