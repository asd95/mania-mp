const initialState = {
  details: {},
  loading: true,
  error: false
};

const gameDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GAME_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "FETCH_GAME_SUCCESS":
      return {
        details: action.payload,
        loading: false,
        error: false,
      };
    case "FETCH_GAME_FAILURE":
      return {
        details: {},
        loading: false,
        error: action.payload,
      };
    case "GAME_DETAILS_UNMOUNT":
      return {
        details: {},
        loading: true,
        error: false,
      };
    default:
      return state;
  }
};

export default gameDetailsReducer;
