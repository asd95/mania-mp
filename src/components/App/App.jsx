// React
import React from "react";

// Routing
import { Route } from "react-router-dom";

// Components & pages
import Header from "../Header/Header";
import Home from "../../pages/home-pages";
import GameDetails from "../GameDetails/GameDetails";

// Styling
import "./App.style.scss";

function App() {
  return (
    <div className="app">
    <Header/>
        <Route path="/" component={Home} />
        <Route
          path="/games/:id"
          render={({ match }) => {
            const { id } = match.params;
            return (
                <GameDetails idItem={id} />
            );
          }}
        />
    </div>
  );
}

export default App;

// Refactoring
// 1) Add transition effect, some effect
// 2) SERVICE(Use CONTEXT for get data) ++
// 3) split actions into separate folders ++
// 4) add spinner and error components for HOME
// 5) styled components -> scss
// 6) stars rating debug ++
// 7) logo set default searched games ++ 