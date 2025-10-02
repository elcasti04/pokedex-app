import React from "react";

type PokemonProps = {
  id: number;
  name: string;
  image: string;
  types: string[];
  moves: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
};

const PokemonCard: React.FC<PokemonProps> = ({ id, name, image, types, moves, stats }) => {
  return (
    <div className="pokemon-card">
      <h2>#{id} {name.toUpperCase()}</h2>
      <div className="w-60 h-60 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center bg-white">
        <img src={image} alt={name} width={200} />
      </div>
      <hr/>
      <br/>
      

      <p><strong>Tipos:</strong> <br/> {types.join(", ")}</p>
      <hr/>
      <br/>

      <div>
        <h3 className= "font-bold">Stats:</h3>
        <ul>
          <li>HP: {stats.hp}</li>
          <li>Ataque: {stats.attack}</li>
          <li>Defensa: {stats.defense}</li>
          <li>Ataque Especial: {stats.specialAttack}</li>
          <li>Defensa Especial: {stats.specialDefense}</li>
          <li>Velocidad: {stats.speed}</li>
        </ul>
      </div>
      <hr/>
      <br/>

      <div>
        <h3 className= "font-bold">Movimientos (primeros 5)</h3>
        <ul>
          {moves.slice(0, 5).map((m, i) => (
            <li key={i}> <br/> {m}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCard;
