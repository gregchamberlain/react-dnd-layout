export const mergeItems = (state, id) => state[id].items.map(cId => state[cId]);
