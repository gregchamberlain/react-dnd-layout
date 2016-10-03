import React, { Component, PropTypes } from 'react';
import DragDropLayout, {
  RootLayout, Row, Column, Title, Link, RichText,
  Image, Text, generateEmptyLayout, renderToString
} from '../src';
import Items from './pages/page2.json';

const comps = {
  Row,
  Column,
  Title,
  Text,
  RichText,
  Image,
  Link,
};


class StatelessExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      items: Items,
      layout: Items,
      info: {pages: [
        {id: '#home', name: 'Home'},
        {id: '#about', name: 'About'},
        {id: '#contact', name: 'Contact'},
      ]}
    };
  }

  toggleLock = () => {
    this.setState({locked: !this.state.locked});
  }

  layoutChange = layout => {
    this.setState({layout});
  }

  setItems = items => () => {
    this.setState({items});
  }

  changeInfo = () => {
    this.setState({info: {pages: [
      {id: '#home', name: 'Home'},
      {id: '#services', name: 'Services'},
      {id: '#products', name: 'Products'},
    ]}});
  }

  render() {
    return (
      <div>
        <div style={styles.toolbar}>
          <button onClick={this.changeInfo}>
            Change Info
          </button>
          <button onClick={this.setItems(Items)}>
            Page1
          </button>
          <button onClick={this.setItems(generateEmptyLayout('root'))}>
            Empty
          </button>
          <button onClick={this.toggleLock}>
            {this.state.locked ? 'Unlock' : 'Lock'}
          </button>
        </div>
        <div style={styles.content}>
          <DragDropLayout
            info={this.state.info}
            items={this.state.items}
            components={comps}
            rootId="root"
            locked={this.state.locked}/>
        </div>
      </div>
    );
  }
}

const styles = {
  toolbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 56,
    background: '#333',
    boxSizing: 'border-box',
    justifyContent: 'flex-end',
    padding: 10,
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    position: 'absolute',
    top: 56,
    left: 0,
    bottom: 0,
    right: 0
  }
};

export default StatelessExample;
