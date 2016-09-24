import React from 'react';
import { string, number, boolean, object, array } from 'react-formulate';

const Image = ({ style }) => (
  <div style={style}></div>
);

Image.defaultProps = {
  style: {
    flex: 1,
    background: 'url(http://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    boxSizing: 'border-box',
    minWidth: 64,
    minHeight: 64,
  }
};

Image.propInputs = object({
  style: object({
    flex: number({label: 'Flex'}),
    background: string({label: 'Background'})
  }, {label: 'Style'})
});

export default Image;
