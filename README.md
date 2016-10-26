# React DnD Layout
Drag and Drop Layout Builder for React Components
```
npm install --save react-dnd-layout
```

## Getting Started
```js
import React, { Component } from 'react';
import Editor, { LayoutState, Row, Column, RichText, Space } from 'react-dnd-layout';
import CustomComponent from '/path/to/your/component';

const comps = {
  Row,
  Column,
  RichText,
  Space.
  CustomComponent
}

class MyComponent extends Component {
  constructor() {
    this.state = {
      items: LayoutState.createEmpty(),
    }
  }

  render() {
    return (
      <Editor
        items={this.state.items}
        components={comps}
        rootId="root"
      />
    );
  }
}
```

## Editor
The Editor is the default export of this package and is the component used to create the interfaces using drop and drop. It accepts the following props.

|Property|Type|Required|Description|
|-----|-----|-----|-------|
|items|`LayoutState`|x|Represents the current state of the layout|
|components|Object|x|The components to make available in the catalog for drag and drop building|
|rootId|String|x|The id of the root component used in the `LayoutState`, default is 'root'|
|locked|Boolean||Used to lock the interface editor (true = readonly)|
|info|Object||Information that is passed down to all components in the layout through context (Used when custom components need dynamic info from outside the layout)|
