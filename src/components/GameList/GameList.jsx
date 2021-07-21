import React from "react";
// Styling & animation
import styled from "styled-components";
import { motion } from "framer-motion";
// components
import GameItem from "../GameItem";
// Routing
import { withRouter } from "react-router-dom";
// utils
import {transformImage} from '../../utils';


const GameListStyle = styled(motion.div)`
  min-height: 100%;
  margin-bottom: 2em;
  @media screen and (max-width: 480px) {
    .ht2 {
      text-align: center;
    }
  }
`;
const ListStyle = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-column-gap: 2em;
  grid-row-gap: 4em;
`;

const GameList = ({ children, titleName, history }) => {
  const items = children.map((item, idx) => (
    <GameItem
      key={idx}
      name={item.name}
      released={item.released}
      image={transformImage(item.background_image, 640)}
      id={item.id}
      onDetailsGame={(id) => {
        history.push(`/games/${id}`);
      }}
    />
  ));

  return (
    <GameListStyle>
      <h2 className="ht2">{titleName}</h2>
      <ListStyle>{items}</ListStyle>
    </GameListStyle>
  );
};

export default withRouter(GameList);
