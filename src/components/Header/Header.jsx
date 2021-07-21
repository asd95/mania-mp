import React, { useState } from "react";
import "./Header.style.scss";
// Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../../img/logo.svg";
// Redux & routes
import { actionsFetchSearchedGames } from "../../actions";
import { useDispatch } from "react-redux";

const HeaderStyle = styled(motion.nav)`
  padding: 2em 0;
  text-align: center;
  input {
    width: 30%;
    min-width: 260px;
    font-size: 1.2rem;
    padding: 0.3em;
    border: none;
    margin-top: 1em;
    background: #e8edf1;
    outline: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s all;
    &:focus {
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    }
  }

  button {
    font-size: 1.2rem;
    border: none;
    padding: 0.3em 1.3em;
    font-family: "Montserrat", sans-serif;
    cursor: pointer;
    background: #0345d7;
    color: #eee;
    transition: all 0.3s;
    &:hover {
      background: #0e59ee;
    }
  }
`;
const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  cursor: pointer;
  img {
    width: 2em;
    height: 2em;
    margin: 0.3em;
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputText) {
      return;
    }
    dispatch(actionsFetchSearchedGames(inputText.toLowerCase()));
    setInputText("");
  };

  const onInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <HeaderStyle>
      <Logo>
        <img src={logo} alt="logo" />
        <h1 className="ht1">MANIA</h1>
      </Logo>
      <div className="search">
        <form onSubmit={onSubmit}>
          <input type="text" value={inputText} onChange={onInputChange} />
          <button type="submit">Search</button>
        </form>
      </div>
    </HeaderStyle>
  );
};

export default Header;
