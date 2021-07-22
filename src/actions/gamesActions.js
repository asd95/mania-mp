// actions type
const FETCH_GAMES = "FETCH_GAMES";
const FETCH_SEARCHED_GAMES = "FETCH_SEARCHED_GAMES";
const FETCH_SEARCHED_DEFAULT = "FETCH_SEARCHED_DEFAULT";

// async actions
export const actionsFetchGames = (service) => async (dispatch) => {
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

export const actionsFetchSearchedGames = (service, gameName) => (dispatch) => {
  service.getSearchGame(gameName).then((fetchData) => {
    dispatch(searchedGames(fetchData.results));
  });
};

// actions
const searchedGames = (sg) => ({
  type: FETCH_SEARCHED_GAMES,
  payload: sg,
});

const gamesCreators = (games) => ({
  type: FETCH_GAMES,
  payload: games
});
export const searchedDefault = () => ({ type: FETCH_SEARCHED_DEFAULT });
