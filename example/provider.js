import React, { Component, PropTypes } from 'react';
import DragDropLayout, { Row, Column, Title, Link, Image, Text } from '../src';
import Items from './pages/page1.json';

const comps = {
  Row,
  Column,
  Title,
  Text,
  Image,
  Link,
};


class StatelessExample extends Component {

  render() {
    return (
      <DragDropLayout items={Items} components={comps} onChange={i => console.log(i)}/>
    );
  }
}

export default StatelessExample;
