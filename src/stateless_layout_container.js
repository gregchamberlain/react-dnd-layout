import Layout from './stateless_layout';
import { connect } from 'react-redux';
import { mergeItems } from './redux/utils';
import { change } from './redux/actions';

const mapStateToProps = (state, props) => ({
  items: mergeItems(state, props.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  onChange: items => dispatch(change(props.id, items))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
