import React from 'react';

import EditWrapper from './EditWrapper';
import StaticWrapper from './StaticWrapper';

const wrap = (readOnly, id) => readOnly ? <StaticWrapper id={id} /> : <EditWrapper id={id} />;

export default wrap;
