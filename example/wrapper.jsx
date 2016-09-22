import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Wrapper } from '../src';

class WrapperExample extends Component {
  render() {
    return (
      <div>
        <Wrapper>
          <div style={{display: 'flex'}}>
            <Wrapper row >Wrapper #4</Wrapper>
            <Wrapper row >Wrapper #5</Wrapper>
            <Wrapper row >Wrapper #6</Wrapper>
          </div>
        </Wrapper>
        <Wrapper>
          <div style={{display: 'flex'}}>
            <Wrapper row >Wrapper #1</Wrapper>
            <Wrapper row >Wrapper #2</Wrapper>
            <Wrapper row >Wrapper #3</Wrapper>
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default  DragDropContext(HTML5Backend)(WrapperExample);
