import React, { Component, PropTypes } from 'react';
import { Editor, EditorState } from 'draft-js';
import { object } from 'react-formulate';

class RichText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.content
    };
  }

  onChange = editorState => {
    this.setState({editorState});
  }

  render() {
    const { editorState } = this.state;
    return (
      <Editor editorState={editorState} onChange={this.onChange} />
    );
  }
}

RichText.defaultProps = {
  content: EditorState.createEmpty()
};

RichText.propInputs = object({
});

RichText.Icon = (
  <svg fill="#eee" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
);

export default RichText;
