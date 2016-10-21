import Layout from './stateless_layout';
// import { connect } from 'react-redux';
import connect from './utils/connect.js';
import { mergeItems } from './redux/utils';
import { change } from './redux/actions';
import { isEqual } from 'lodash';
import { string, number, boolean, object, array } from 'react-formulate';

const getChildren = (state, id) => {
  if (state.getIn([id, 'props']) && state.get(id).props.children) {
    return mergeItems(state, id);
  } else {
    return [];
  }
};

const mapStateToProps = ({ state }, props) => ({
  children: state.getIn(['items', props.id, 'props', 'children']).map(c => state.getItem(c))
});

const LayoutContainer = connect(mapStateToProps)(Layout);

LayoutContainer.defaultProps = {
  children: [],
  style: {
    flex: 1,
    position: 'relative',
    top: 'auto',
    left: 'auto',
    zIndex: 1,
    display: 'flex',
    background: 'transparent',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    minHeight: 0,
    minWidth: 0,
    padding: 20,
    textAlign: 'inherit',
    color: 'inherit',
    fontSize: 16,
    textShadow: 'inherit',
    fontFamily: 'inherit'
  }
};

LayoutContainer.categories = ['layout'];

LayoutContainer.propInputs = object({
  style: object({
    display: string({label: 'Display'}),
    flex: number({label: 'Flex'}),
    position: string({label: 'Position'}),
    top: string({label: 'Top'}),
    left: string({label: 'Left'}),
    zIndex: number({label: 'z-index'}),
    background: string({label: 'Background'}),
    backgroundSize: string({label: 'Background Size'}),
    backgroundRepeat: string({label: 'Background Repeat'}),
    backgroundPosition: string({label: 'Background Position'}),
    minHeight: number({label: 'Height'}),
    minWidth: number({label: 'Width'}),
    padding: number({label: 'Padding'}),
    color: string({label: 'Font Color'}),
    fontSize: number({label: 'Font Size'}),
    textAlign: string({label: 'Text Align'}),
    textShadow: string({label: 'Text Shadown'}),
    fontFamily: string({label: 'Font Family'}),
  }, {label: 'Style'})
});

export default LayoutContainer;
