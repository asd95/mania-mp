import Service from "../service/";
const service = new Service();

// actions type
const FETCH_GAMES = "FETCH_GAMES";
const FETCH_GAME_REQUEST = "FETCH_GAME_REQUEST";
const FETCH_GAME_SUCCESS = "FETCH_GAME_SUCCESS";
const FETCH_GAME_FAILURE = "FETCH_GAME_FAILURE";
const GAME_DETAILS_UNMOUNT = "GAME_DETAILS_UNMOUNT";
const FETCH_SEARCHED_GAMES = "FETCH_SEARCHED_GAMES";

// async actions
export const actionsFetchGames = () => async (dispatch) => {
  const popGamesArr = await service
    .getPopularGames()
    .then((fetchData) => fetchData.results);
  const NewGamesArr = await service
    .getNewGames()
    .then((fetchData) => fetchData.results);
  const UpcomingGamesArr = await service
    .getUpcomingGames()
    .then((fetchData) => fetchData.results);
  dispatch(gamesCreators({ popGamesArr, NewGamesArr, UpcomingGamesArr }));
};

export const actionsFetchGameDetails = (id) => (dispatch) => {
  dispatch(gameRequested());
  service
    .getGameDetails(id)
    .then((fetchData) => dispatch(gameLoaded(fetchData)))
    .catch((error) => dispatch(gameError(error)));
};

export const actionsFetchSearchedGames = (gameName) => (dispatch) => {
  service
    .getSearchGame(gameName)
    .then((fetchData) => {
      dispatch(searchedGames(fetchData.results))});
};

// actions

const searchedGames = (gs) => ({
  type: FETCH_SEARCHED_GAMES,
  payload: gs,
});

const gamesCreators = (payload) => ({
  type: FETCH_GAMES,
  payload,
});

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
