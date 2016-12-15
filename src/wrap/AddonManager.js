import React, { Component } from 'react';

class AddonManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentlyOpen: null
    };
  }

  openAddon = idx => () => {
    this.setState({ currentlyOpen: idx === this.state.currentlyOpen ? null : idx });
  }

  render() {

    const { addons, layoutState, item } = this.props;

    const ActiveAddon = addons[this.state.currentlyOpen];

    return (
      <div style={styles.container}>
        {addons.map((addon, idx) => (
          <div key={idx} style={styles.button} onClick={this.openAddon(idx)}>{addon.Icon}</div>
        ))}
        <div style={styles.display}>
          {ActiveAddon && <ActiveAddon item={item} updateItem={layoutState.updateItem(item.id)}/>}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  },
  display: {
    position: 'absolute',
    backgroundColor: '#eee',
    top: 26,
    left: 0,
  },
  button: {
    userSelect: 'none',
    display: 'flex',
    fontFamily: 'Arial',
    boxShadow: '0 0 4px #888',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    textShadow: 'none',
    background: '#eee',
    borderRadius: 11,
    color: '#333',
    height: 22,
    width: 22,
  }
};

export default AddonManager;
