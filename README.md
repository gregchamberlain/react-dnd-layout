>## Warning!

>This library is under heavy development, and is prone to breaking changes in the future. It is not safe to use for production purposes at this time.

# React DnD Layout [![npm package](https://img.shields.io/npm/v/react-dnd-layout.svg?style=flat-square)](https://www.npmjs.org/package/react-dnd-layout)

Drag and Drop Layout Builder for React Components
```
npm install --save react-dnd-layout
```

## Getting Started
```js
import React, { Component } from 'react';
import { Editor, LayoutState, Row, Column } from 'react-dnd-layout';

const comps = {
  Row,
  Column
}

class MyComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layoutState: new LayoutState()
    };
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
  }

  handleLayoutChange(layoutState) {
    this.setState({ layoutState });
  }

  render() {
    return (
      <Editor
        layoutState={this.state.layoutState}
        onChange={this.handleLayoutChange}
        components={components}
      />
    );
  }

}
```

## Editor
The Editor is used to create the interfaces using drop and drop. It accepts the following props.

|Property|Type|Required|Description|
|-----|-----|-----|-------|
|layoutState|`LayoutState`|✓|Represents the current state of the layout|
|onChange|Function|✓|A function to be called for every change made to the layoutState, this function is passed the new `LayoutState`|
|components|Object|✓|The components to make available in the catalog for drag and drop building|
|readOnly|Boolean||Used to lock the interface editor (true = readonly)|


### LayoutState
LayoutState is a custom immutable.js `Record` used to hold the current state of the layout, including all components and their `props`.
##### To JSON
To get a raw JSON object from the `LayoutState`, (most likey for storage), call layoutState.toRaw();
##### From JSON
To convert raw JSON back to a LayoutState pass the JSON to LayoutState.fromRaw();
