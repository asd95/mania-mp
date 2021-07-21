import React, { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { actionsFetchGames } from "../../actions";

// components & pages
import GameList from "../../components/GameList/GameList";
import "./Home.style.scss";

const Home = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  useEffect(() => {
    dispatch(actionsFetchGames());
  }, [dispatch]);

  const { popular, newGames, upcoming, searched } = games;
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

export default Home;
