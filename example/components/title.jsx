import React from 'react';
import { string, number, boolean, object, array, text } from 'react-formulate';

const Title = ({content, style}) => <h1 style={style}>{content}</h1>;

Title.defaultProps = {
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
  content: 'Title'
};

Title.propInputs = object({
  style: object({
    flex: number({label: 'Flex'}),
    fontWeight: string({label: 'Font Weight'}),
    padding: number({label: 'Padding'}),
    textAlign: string({label: 'Text Align'}),
    color: string({label: 'Font Color'}),
    textShadow: string({label: 'Text Shadow'})
  }, {label: 'Style'}),
  content: text({label: 'Content'})
});

export default Title;
