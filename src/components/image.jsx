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

Image.Icon = (
  <svg fill="#eee" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
  </svg>
);

export default Image;
