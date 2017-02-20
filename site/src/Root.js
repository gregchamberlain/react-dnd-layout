// import React, { Component } from 'react';

// import { Editor, StaticLayout, LayoutState } from '../../src';

// import Column from './Column';
// import Row from './Row';

// const components = {
//   Column,
//   Row
// };

// class Root extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       layoutState: new LayoutState(),
//       locked: false,
//       saves: [],
//       editor: true
//     };
//   }

//   onChange = layoutState => {
//     this.setState({ layoutState });
//   }

//   toggleLock = e => {
//     this.setState({ locked: e.target.checked });
//   }

//   save = e => {
//     this.setState({ saves: this.state.saves.concat(this.state.layoutState) });
//   }

//   setLayoutState = layoutState => e => {
//     this.setState({ layoutState });
//   }

//   setEditor = e => {
//     this.setState({ editor: e.target.checked });
//   }

//   render() {
//     return (
//       <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto'}}>
//         <div>
//           <label>
//             <input type="checkbox" onChange={this.setEditor} checked={this.state.editor} />
//             Editor
//           </label>
//           <label>
//             <input type="checkbox" onChange={this.toggleLock} checked={this.state.locked} />
//             Locked
//           </label>
//           <button onClick={this.setLayoutState(new LayoutState)}>Empty</button>
//           <button onClick={this.save}>Save</button>
//           {this.state.saves.map((save, idx) => (
//             <button key={idx} onClick={this.setLayoutState(save)}>{`Layout #${idx + 1}`}</button>
//           ))}
//         </div>
//         <div style={{position: 'relative', height: '100%'}}>
//           { this.state.editor ? (
//             <Editor
//               readOnly={this.state.locked}
//               layoutState={this.state.layoutState}
//               onChange={this.onChange}
//               components={components}
//             />
//           ) : (
//             <StaticLayout
//               layoutState={this.state.layoutState}
//               components={components}
//             />
//           )}
          
//         </div>
//       </div>
//     );
//   }

// }

// export default Root;

import MyComponent from './EditorExample';
export default MyComponent;