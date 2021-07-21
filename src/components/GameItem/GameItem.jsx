import React from "react";
// Styling & animation
import styled from "styled-components";
import { motion } from "framer-motion";

const GameItemStyle = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  border-radius: 0.5em;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
  .game-item-img {
    display: flex;
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;

const GameItem = ({ name, released, id, image, onDetailsGame }) => {
  const onSelectItem = (id) => {
    onDetailsGame(id);
    document.body.style.overflow = "hidden";
  };
  return (
    <GameItemStyle onClick={() => onSelectItem(id)}>
      <h3 className="ht3">{name}</h3>
      <p className="prgph">{released}</p>
      <img src={image} alt="gameImg" className="game-item-img" />
    </GameItemStyle>
  );
};

export default GameItem;
