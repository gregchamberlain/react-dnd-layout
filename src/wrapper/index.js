import React from 'react';

// import EditWrapper from './EditWrapper';
// import StaticWrapper from './StaticWrapper';
import BaseWrapper from './BaseWrapper';

// const wrap = (readOnly, id) => readOnly ? <StaticWrapper id={id} /> : <EditWrapper id={id} />;

export default id => <BaseWrapper id={id} />
// export default wrap;
