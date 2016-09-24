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
    textShadow: 'none'
  },
  content: 'Text'
};

Text.propInputs = object({
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

export default Text;
