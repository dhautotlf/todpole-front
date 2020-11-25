import { handleActions } from 'redux-actions';
import { materials as materialsAction } from '../actions';
import Queries from '../utils/queries';
import throttleThunk from '../utils/throttleThunk';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
};

const normalize = (materials) =>
  materials.reduce(
    (acc, bookmark) => ({ ...acc, [bookmark.id]: bookmark }),
    {},
  );

export default handleActions(
  {
    [materialsAction.getMaterialsStart]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [materialsAction.getMaterialsSuccess]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      data: normalize(payload),
    }),
    [materialsAction.getMaterialsError]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: payload.error,
    }),
  },
  INITIAL_STATE,
);

// SELECTORS

export const getMaterials = ({ materials }) => ({
  ...materials,
  data: materials.data ? Object.values(materials.data) : INITIAL_STATE.data,
});

// THUNKS

/**
 * Get all the materials
 * Note: because this thunk is used by a single Activity component, and Activity componentare rendered in list, it is important to
 */
export const fetchAllMaterials = throttleThunk(() => {
  return async (dispatch) => {
    dispatch(materialsAction.getMaterialsStart());
    try {
      const materials = await Queries.materials({ name: null });
      dispatch(materialsAction.getMaterialsSuccess(materials));
    } catch (error) {
      dispatch(materialsAction.getMaterialsError({ error }));
    }
  };
});
