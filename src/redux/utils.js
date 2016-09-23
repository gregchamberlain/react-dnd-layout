export const mergeItems = (state, id) => state[id].props.children.map(cId => state[cId]);
