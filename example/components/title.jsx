import React from 'react';
import { string, number, boolean, object, array, text } from 'react-formulate';

const Title = ({children, style}) => <h1 style={style}>{children}</h1>;

Title.defaultProps = {
  style: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'left',
    margin: 0,
    color: 'black'
  },
  children: 'asdasdasd'
};

Title.propInputs = object({
  style: object({
    flex: number({label: 'Flex'}),
    fontWeight: string({label: 'Font Weight'}),
    padding: number({label: 'Padding'}),
    textAlign: string({label: 'Text Align'}),
    color: string({label: 'Font Color'})
  }, {label: 'Style'}),
  children: text({label: 'Content'})
});

export default Title;
