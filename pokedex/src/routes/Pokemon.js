import React from "react";
import { useParams } from "react-router-dom";
import App from "../App";

const Pokemon = () => {
  let { pokemonId } = useParams();

return console.log(pokemonId);
};

export default Pokemon;
