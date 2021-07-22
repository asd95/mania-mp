// React
import React, { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { actionsFetchGames } from "../../actions";

// components & pages
import GameList from "../../components/GameList/GameList";

// utils function
import { withService } from "../../components/HOC";

const Home = ({ service }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionsFetchGames(service));
  }, [dispatch, service]);

  const { popular, newGames, upcoming, searched } = useSelector(
    (state) => state.games
  );

  return (
    <div className="home">
      {searched.length === 0 ? null : (
        <GameList titleName="Searched Games">{searched}</GameList>
      )}
      <GameList titleName="Upcoming Games">{upcoming}</GameList>
      <GameList titleName="New Games">{newGames}</GameList>
      <GameList titleName="Popular Games">{popular}</GameList>
    </div>
  );
};

export default withService()(Home);
