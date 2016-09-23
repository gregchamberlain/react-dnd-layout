import Layout from './stateless_layout';
import { connect } from 'react-redux';
import { mergeItems } from './redux/utils';
import { change } from './redux/actions';

const mapStateToProps = (state, props) => ({
  children: state[props.id] ? mergeItems(state, props.id) : []
});

const mapDispatchToProps = (dispatch, props) => ({
  onChange: children => dispatch(change(props.id, children))
});

const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);
LayoutContainer.defaultProps = {
  children: []
};
export default LayoutContainer;
