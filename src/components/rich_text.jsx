import React, { Component, PropTypes } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { object, string, number } from 'react-formulate';
import debounce from 'debounce';
import { merge } from 'lodash';

class RichText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(props.content)),
      focused: false
    };
    this.saveChange = debounce(this._saveChange, 500);
    // this.focus = debounce(this._focus, 5);
  }

  blur = () => {
    this.setState({focused: false});
  }

  focus = () => {
    this.setState({focused: true});
    this.refs.editor.focus();
  }

  _saveChange = editorState => {
    const raw = convertToRaw(editorState.getCurrentContent());
    const nextProps = merge({}, this.props);
    nextProps.content = raw;
    this.props.onChange(nextProps);
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
      <div style={style} ref="container" onClick={this.focus} onBlur={this.blur}>
        {this.context.editable && focused ? (
          <div style={controlStyle} onClick={this.focus}>
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

const controlStyle = {
  position: 'absolute',
  padding: 10,
  // margin: 15,
  // background: 'rgba(255, 255, 255, 0.9)',
  top: '100%',
  left: 0
};

RichText.defaultProps = {
  content: convertToRaw(EditorState.createEmpty().getCurrentContent()),
  style: {
    fontFamily: 'Arial',
    flex: 1,
    cursor: 'text',
    position: 'relative',
    padding: 20
  }
};

RichText.propInputs = object({
  style: object({
    fontFamily: string({label: 'Font Family'}),
    flex: number({label: 'Flex'}),
    padding: number({label: 'Padding'}),
    position: string({label: 'Position'})
  },{label: 'Style'})
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
      <span style={{
        color: this.props.active ? '#35b5e5' : '#333',
        cursor: 'pointer',
        marginRight: 16,
        // padding: '2px 0',
        display: 'inline-block',
        fontWeight: 'bold',
        boxShadow: '0 0 10px black',
        background: this.props.active ? '#444' : '#eee',
        margin: 5,
        borderRadius: 5,
        padding: 10}} onMouseDown={this.onToggle}>
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
