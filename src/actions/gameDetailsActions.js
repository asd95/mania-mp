// actions type
const FETCH_GAME_REQUEST = "FETCH_GAME_REQUEST";
const FETCH_GAME_SUCCESS = "FETCH_GAME_SUCCESS";
const FETCH_GAME_FAILURE = "FETCH_GAME_FAILURE";
const GAME_DETAILS_UNMOUNT = "GAME_DETAILS_UNMOUNT";

// async actions
export const actionsFetchGameDetails = (service, id) => (dispatch) => {
  dispatch(gameRequested());
  service
    .getGameDetails(id)
    .then((fetchData) => dispatch(gameLoaded(fetchData)))
    .catch((error) => dispatch(gameError(error)));
};

// actions
const gameRequested = () => ({
  type: FETCH_GAME_REQUEST,
});

const gameLoaded = (gameDetails) => ({
  type: FETCH_GAME_SUCCESS,
  payload: gameDetails,
});

const gameError = (error) => ({
  type: FETCH_GAME_FAILURE,
  payload: error,
});
export const gameDetailsUnmount = () => ({ type: GAME_DETAILS_UNMOUNT });
