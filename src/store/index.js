import { createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

import gamesReducer from './gamesReducer';
import gameDetailsReducer from './gameDetailsReducer';

const rootReducers = combineReducers({
  games: gamesReducer,
  gameDetails: gameDetailsReducer
});

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
