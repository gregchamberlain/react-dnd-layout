import Layout from './stateless_layout';
import { connect } from 'react-redux';
import { mergeItems } from './redux/utils';
import { change } from './redux/actions';
import { string, number, boolean, object, array } from 'react-formulate';

const mapStateToProps = (state, props) => ({
  children: state[props.id] ? mergeItems(state, props.id) : []
});

const mapDispatchToProps = (dispatch, props) => ({
  onChange: children => dispatch(change(props.id, children))
});

const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);

LayoutContainer.defaultProps = {
  children: [],
  style: {
    flex: 1,
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    background: 'transparent',
    padding: 20,
  }
};
LayoutContainer.propInputs = object({
  style: object({
    display: string({label: 'Display'}),
    flex: number({label: 'Flex'}),
    background: string({label: 'Background'}),
  }, {label: 'Style'})
});

export default LayoutContainer;
