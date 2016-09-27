import React, { Component, PropTypes } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { object } from 'react-formulate';
import debounce from 'debounce';

class RichText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.content,
      focused: false
    };
    this.saveChange = debounce(this._saveChange, 500);
    this.focus = debounce(this._focus, 20);
  }

  blur = () => {
    this.setState({focused: false});
  }

  _focus = () => {
    this.setState({focused: true});
    this.refs.editor.focus();
  }

  _saveChange = editorState => {
    const raw = convertToRaw(editorState.getCurrentContent());
    // console.log(raw);
  }

  onChange = editorState => {
    this.saveChange(editorState);
    this.setState({editorState});
  }

  handleKeyCommand = command => {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  onTab = e => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  toggleBlockType = blockType => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render() {

    const { editorState, focused } = this.state;
    const { style } = this.props;

    return (
      <div style={style} onMouseDown={this.focus} onBlur={this.blur}>
        {this.context.editable && focused ? (
          <div>
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
          </div>
        ) : ''}
        <Editor
          ref="editor"
          onTab={this.onTab}
          readOnly={!this.context.editable}
          customStyleMap={styleMap}
          handleKeyCommand={this.handleKeyCommand}
          editorState={editorState}
          onChange={this.onChange}
          spellCheck={true}
        />
      </div>
    );
  }
}

RichText.contextTypes = {
  editable: React.PropTypes.bool
};

RichText.defaultProps = {
  content: EditorState.createEmpty(),
  style: {
    fontFamily: 'Arial',
    minHeight: 200,
    cursor: 'text',
    width: '100%',
    padding: 20
  }
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

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

class StyleButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span style={{color: this.props.active ? '#5890ff' : '#999', cursor: 'pointer', marginRight: 16, padding: '2px 0', display: 'inline-block'}} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
