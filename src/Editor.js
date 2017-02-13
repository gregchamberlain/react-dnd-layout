import React, { PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LayoutProvider from './LayoutProvider';
import LayoutEditor from './addons/LayoutEditor';
import RootLayout from './RootLayout';
import Catalog from './catalog';
import ItemEditor from './editor';

class Editor extends React.Component {

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleResize = e => {

  }

  render() {
    return (
      <LayoutProvider {...this.props} addons={[LayoutEditor]}>
        <div style={styles.container} ref={container => {this.container = container;}}>
          <Catalog />
          <div style={styles.layoutEditor} ref={box => {this.box = box;}}>
            <RootLayout />
          </div>
          <ItemEditor />
        </div>
      </LayoutProvider>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  layoutEditor: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 20
  }
};

Editor.propTypes = LayoutProvider.propTypes;

export default DragDropContext(HTML5Backend)(Editor);