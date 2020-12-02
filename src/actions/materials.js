import { createActions } from 'redux-actions';

export default createActions({
  GET_MATERIALS_START: () => {},
  GET_MATERIALS_SUCCESS: (materials) => materials,
  GET_MATERIALS_ERROR: (error) => error,
});
