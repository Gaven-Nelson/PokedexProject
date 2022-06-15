import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import App from "../App";
import Pokemon from "./Pokemon";
import "./details-layout.css";
import pikachu from ".//runningPikachu.gif";

const Details = (props) => {
  const [items, setItems] = React.useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let { pokemonId } = useParams();

  let nextMiniPokemonUrl = "";
  let lastMiniPokemonUrl = "";

  if (pokemonId >= 1 && pokemonId < 553) {
    nextMiniPokemonUrl = `https://intern-pokedex.myriadapps.com/images/pokemon/${
      +pokemonId + +1
    }.png`;
  } else {
    nextMiniPokemonUrl = `https://intern-pokedex.myriadapps.com/images/pokemon/1.png`;
  }

  if (pokemonId > 1) {
    lastMiniPokemonUrl = `https://intern-pokedex.myriadapps.com/images/pokemon/${
      pokemonId - 1
    }.png`;
  } else {
    lastMiniPokemonUrl = `https://intern-pokedex.myriadapps.com/images/pokemon/553.png`;
  }

  const handlePreviousButton = (event) => {
    if (items.data.id == 1) {
      navigate(`/pokemon/id/553`);
    } else {
      navigate(`/pokemon/id/` + (items.data.id - 1));
    }
  };

  const handleNextButton = (event) => {
    if (items.data.id == 553) {
      navigate(`/pokemon/id/1`);
    } else {
      navigate(`/pokemon/id/` + (items.data.id + 1));
    }
  };

  useEffect(() => {
    const url = `https://intern-pokedex.myriadapps.com/api/v1/pokemon/${pokemonId}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setItems(json);
        setLoading(false);
      } catch (hasError) {
        console.log("error", hasError);
      }
    };

    fetchData();
  }, [pokemonId]);

  if (loading) {
    return (
      <div>
        <div className="loadscreen">
          <img
            className="loadingScreen"
            src={pikachu}
            width={400}
            height={300}
          />{" "}
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={items.data.types[0]}>
      <div className="page-container">
        <div className="header-title-nav">
          <button className="back-arrow" onClick={() => navigate(-1)}>
            &#10094;
          </button>
          <div className="previousPokemon">
            <button
              className="previousPokemonButton"
              onClick={handlePreviousButton}
            >
              &#10094; #{items.data.id - 1}{" "}
              <img
                className="miniPicture"
                src={lastMiniPokemonUrl}
                height={40}
                width={40}
              />
            </button>
          </div>
          <div className="big-title">{items.data.name}</div>
          <div className="nextPokemon">
            <button className="nextPokemonButton" onClick={handleNextButton}>
              <img
                className="miniPicture"
                src={nextMiniPokemonUrl}
                height={40}
                width={40}
              />
              #{items.data.id + 1} &#10095;
            </button>
          </div>
          <div className="homeButton">
            <button
              className="toHomeButton"
              onClick={() => navigate("/pokemon")}
            >
              Home
            </button>
          </div>
        </div>
        <div className="details-container">
          <div className="header-container">
            <div className="name-id">
              <h2>{items.data.name}</h2>
              <h6>#{items.data.id}</h6>
            </div>
            <div className="types-container">
              <h5 className={items.data.types[0]}>{items.data.types[0]}</h5>
              <h5 className={items.data.types[1]}>{items.data.types[1]}</h5>
            </div>
          </div>
          <div className="rectangle" />
          <div className="body-container">
            <div className="pokemon-picture">
              <img
                src={items.data.image}
                alt={"pokemonPic"}
                width={300}
                height={300}
              />
            </div>
            <div className="pokemon-stats-titles">
              <div className="hp-stats-title">HP:</div>
              <div className="attack-stats-title">Attack:</div>
              <div className="defense-stats-title">Defense:</div>
              <div className="speed-stats-title">Speed:</div>
              <div className="spatk-stats-title">Sp Atk:</div>
              <div className="spdef-stats-title">Sp Def:</div>
            </div>
            <div className="pokemon-stats-values">
              <div className="hp-stats-value2">{items.data.stats.hp}</div>
              <div className="attack-stats-values">
                {items.data.stats.attack}
              </div>
              <div className="defense-stats-values">
                {items.data.stats.defense}
              </div>
              <div className="speed-stats-values">{items.data.stats.speed}</div>
              <div className="spatk-stats-values">
                {items.data.stats["special-attack"]}
              </div>
              <div className="spdef-stats-values">
                {items.data.stats["special-defense"]}
              </div>
            </div>
          </div>
          <div className="genus-description">{items.data.genus}</div>
          <div className="bio-description">{items.data.description}</div>
          <div className="profile-line">Profile</div>
          <div className="profile-stats">
            <div className="profile-titles">
              <div className="height-title">Height:</div>
              <div className="weight-title">Weight:</div>
              <div className="egg-title">Egg Groups:</div>
              <div className="abilities-title">Abilities:</div>
            </div>
            <div className="profile-values">
              <div className="height-value">{items.data.height} m</div>
              <div className="weight-value">{items.data.weight}</div>
              <div className="egg-value">
                {items.data.egg_groups.map((x) => x).join(", ")}
              </div>
              <div className="abilities-value">
                {items.data.abilities.map((x) => x).join(", ")}
              </div>
            </div>
          </div>
        </div>

        <div
          className="stats-fillbar-hp"
          style={{ width: items.data.stats.hp * 1.1764 + "px" }}
        >
          {items.data.stats.hp}
        </div>
        <div
          className="stats-fillbar-attack"
          style={{ width: items.data.stats.attack * 1.1764 + "px" }}
        >
          {items.data.stats.attack}
        </div>
        <div
          className="stats-fillbar-defense"
          style={{ width: items.data.stats.defense * 1.1764 + "px" }}
        >
          {items.data.stats.defense}
        </div>
        <div
          className="stats-fillbar-speed"
          style={{ width: items.data.stats.speed * 1.1764 + "px" }}
        >
          {items.data.stats.speed}
        </div>
        <div
          className="stats-fillbar-spatk"
          style={{ width: items.data.stats["special-attack"] * 1.1764 + "px" }}
        >
          {items.data.stats["special-attack"]}
        </div>
        <div
          className="stats-fillbar-spdef"
          style={{ width: items.data.stats["special-defense"] * 1.1764 + "px" }}
        >
          {items.data.stats["special-defense"]}
        </div>
      </div>
    </div>
  );
};

export default Details;
