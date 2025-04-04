import React from "react";
import { useEffect, useState } from "react";
import "./Card.css";
import { nameTranslater, typeTranslater } from "../../utils/translater";

const Card = ({pokemon}: any) => {
  const [pokemonName, setName] = useState();
  useEffect(() => {
    const translatedName: any = nameTranslater(pokemon)
    setName(translatedName)
  }, [pokemon])

  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      {pokemonName ? <h3 className="cardName">pokemonName</h3> : <></> }
      <div className="cardTypes">
        <div>タイプ</div>
        <span className="typeName">
          {pokemon.types
            .map((type: any) => typeTranslater(type.type.name))
            .join(" / ")}
        </span>
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">重さ: {pokemon.weight}kg</p>
        </div>
        <div className="cardData">
          <p className="title">高さ: {pokemon.height/10}m</p>
        </div>
        <div className="cardData">
          <p className="title">特性: {pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
