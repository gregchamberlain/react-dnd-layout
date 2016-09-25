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
    width: 'auto',
    height: 'auto',
    minWidth: 64,
    minHeight: 64,
    borderRadius: 0,
  }
};

Image.propInputs = object({
  style: object({
    flex: number({label: 'Flex'}),
    background: string({label: 'Background'}),
    minWidth: number({label: 'Width'}),
    minHeight: number({label: 'Height'}),
    borderRadius: number({label: 'Border Radius'})
  }, {label: 'Style'})
});

export default Image;
