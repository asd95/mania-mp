const initialState = {
  popular: [],
  newGames: [],
  upcoming: [],
  searched: [],
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {
        ...state,
        popular: action.payload.popGamesArr,
        newGames: action.payload.NewGamesArr,
        upcoming: action.payload.UpcomingGamesArr,
      };
    case "FETCH_SEARCHED_GAMES":
      return {
        ...state,
        searched: action.payload
      };
    default:
      return state;
  }
};

export default gamesReducer;
