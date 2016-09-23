import React from 'react';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';

import Wrapper from './wrapper';

const layoutTarget = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      props.onChange(
        update(props.items, {
          $splice: [
            [0,0,monitor.getItem()]
          ]
        })
      );
      return props;
    }
  }
};

const Layout = (props) => {
  const { onChange, connectDropTarget, items } = props;

  const removeItem = idx => () => {
    onChange(update(props.items, {$splice: [[idx, 1]]}));
  };

  const renderItems = items.map((item, idx) => (
    <Wrapper
      key={item.props.id}
      onDragStart={() => setTimeout(removeItem(idx), 50)}>
      {item}
    </Wrapper>
  ));

  const styles = style(props);

  return connectDropTarget(
    <div style={styles.container}>
      {renderItems}
    </div>
  );
};

const style = ({ row, isOverCurrent }) => ({
  container: {
    minHeight: 75,
    height: '100%',
    padding: 5,
    display: row ? 'flex' : 'block',
    background: isOverCurrent ? '#35b5e5' : '#333',
    // background: '#333'
  },
});

const LayoutContainer = DropTarget('COMPONENT', layoutTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({shallow: true})
}))(Layout);

LayoutContainer.defaultProps = {
  items: [],
  onChange: items => console.log(items)
};

export default LayoutContainer;
