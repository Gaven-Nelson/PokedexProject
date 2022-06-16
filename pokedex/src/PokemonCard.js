import React from "react";
import { useNavigate } from "react-router-dom";
import "./card-layout.css";

const PokemonCard = (props) => {
  let navigate = useNavigate();

  const handleClick = (event) => {
    navigate("/pokemon/Id/" + props.item.id);
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div className="pokemon-name-title">
        <h1 className="">{props.item.name}</h1>
      </div>
      <div className="pokemon-card-picture">
        <img src={props.item.image} alt={"Pokemon"} height={150} width={150} />
      </div>
      <div className="pokemon-card-type">
        <h5 className={props.item.types[0]}>{props.item.types[0]}</h5>
        <h5 className={props.item.types[1]}>{props.item.types[1]}</h5>
      </div>
    </div>
  );
};

export default PokemonCard;
