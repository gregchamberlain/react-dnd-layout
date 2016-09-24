import React from 'react';
import { string, number, boolean, object, array, text } from 'react-formulate';

const Text = ({children, style}) => <div style={style}>{children}</div>;

Text.defaultProps = {
  style: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'normal',
    padding: 10,
    textAlign: 'left',
    color: 'black',
    textShadow: 'none'
  },
  children: 'asdasdasd'
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
  children: text({label: 'Content'})
});

export default Text;
