import React, { useEffect } from "react";
// Styling & animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Routing
import { withRouter } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { actionsFetchGameDetails, gameDetailsUnmount } from "../../actions";
// utils
import { transformImage } from "../../utils";
// Components
import Spinner from "../Spinner";
// IMAGES
import xboxOne from "../../img/xbox-one.svg";
import xboxSeriesX from "../../img/xbox-series-x.svg";
import playstation4 from "../../img/ps4.svg";
import playstation5 from "../../img/ps5.svg";
import steam from "../../img/steam.svg";
import nintendo from "../../img/nintendo.svg";
import macos from "../../img/macos.svg";
import ios from "../../img/ios.svg";
import gamepad from "../../img/gamepad.svg";
import pc from "../../img/pc.svg";
// STARIMAGES
import starEmpty from "../../img/star-empty.png";
import starFull from "../../img/star-full.png";

const GameListStyle = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;

  &::-webkit-scrollbar-thumb {
    background: #4386fc;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #0e59ee;
  }
  &::-webkit-scrollbar-thumb:active {
    background-color: #0345d7;
  }
`;
const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1em;
  padding: 2em 1em;
  color: #333;
  background: #e8edf1;
  position: absolute;
  left: 10%;
  img {
    width: 100%;
  }
`;
const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .rating {
    img {
      width: 24px;
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    .rating {
      text-align: center;
    }
  }
`;
const Info = styled(motion.div)`
  text-align: center;
`;
const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  .img-platforms {
    margin: 0 0.3em;
    width: 40px;
  }

  @media screen and (max-width: 480px) {
    .img-platforms {
      width: 32px;
    }
  }
`;
const Media = styled(motion.div)`
  margin-top: 2em;
  img {
    width: 100%;
  }
`;
const Description = styled(motion.div)`
  margin: 2em 0;
`;
const SpinnerContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
const Gallery = styled(motion.div)`
  img {
    margin: 0.05em 0;
  }
`;
const platformsImageData = {
  "xbox-one": xboxOne,
  "xbox-series-x": xboxSeriesX,
  pc,
  playstation4,
  playstation5,
  macos,
  ios,
  "nintendo-switch": nintendo,
  steam,
  others: gamepad,
};

const GameDetails = ({ idItem, history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionsFetchGameDetails(idItem));
    return () => dispatch(gameDetailsUnmount());
  }, [idItem, dispatch]);
  const { details, loading } = useSelector((state) => state.gameDetails);

  if (loading) {
    return (
      <GameListStyle>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      </GameListStyle>
    );
  }
  const screen = details.screenshots.results.map((screen) => (
    <img
      src={transformImage(screen.image, 1280)}
      key={screen.id}
      alt={screen.image}
    />
  ));
  const platforms = details.platforms.map((data) => {
    const imgUrl = platformsImageData[data.platform.slug]
      ? platformsImageData[data.platform.slug]
      : platformsImageData.others;
    return (
      <img
        className="img-platforms"
        alt={data.platform.slug}
        src={imgUrl}
        key={data.platform.id}
      ></img>
    );
  });

  // close modal window(game details)
  const exitDetailHandler = (event) => {
    const el = event.target;
    if (el.classList.contains("game-details")) {
      document.body.style.overflow = "auto";
      history.push("/");
    }
  };
  // rendering stars rating
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(details.rating);
    for (var i = 0; i < 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull}></img>);
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty}></img>);
      }
    }
    return stars;
  };

  return (
    <GameListStyle className="game-details" onClick={exitDetailHandler}>
      <Detail>
        <Stats>
          <div className="rating">
            <h3 className="ht3">{details.name}</h3>
            <p className="prgph">Rating: {details.rating}</p>
            {getStars()}
          </div>
          <Info>
            <h3 className="ht3">Platforms</h3>
            <Platforms>{platforms}</Platforms>
          </Info>
        </Stats>
        <Media>
          <img
            src={transformImage(details.background_image, 1280)}
            alt={details.background_image}
          />
        </Media>
        <Description>
          <p className="prgph">{details.description_raw}</p>
        </Description>
        <Gallery>{screen}</Gallery>
      </Detail>
    </GameListStyle>
  );
};

export default withRouter(GameDetails);
