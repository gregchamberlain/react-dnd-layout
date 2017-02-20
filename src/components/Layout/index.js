import React from 'react';
import Static from './Static';
import DnD from './DnD';

import { connect } from '../../utils';

const LayoutHandler = ({ readOnly, ...props }) => readOnly ? <Static {...props}/> : <DnD {...props}/>;

export default connect('readOnly')(LayoutHandler);
// export default DnD;