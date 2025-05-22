"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PokemonDetails() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then(setPokemon);
  }, [name]);

  if (!pokemon || !name) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold capitalize mb-4">Loading...</h1>
      </main>
    );
  }
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h1>
      <img src={imageUrl} alt={pokemon.name} className="w-48 h-48 mb-4" />
      <p>
        <strong>ID:</strong> {pokemon.id}
      </p>
      <p>
        <strong>Height:</strong> {pokemon.height}
      </p>
      <p>
        <strong>Weight:</strong> {pokemon.weight}
      </p>
      <p>
        <strong>HP:</strong> {pokemon.stats[0].base_stat}
      </p>
      <p>
        <strong>Attack:</strong> {pokemon.stats[1].base_stat}
      </p>
      <p>
        <strong>Defense:</strong> {pokemon.stats[2].base_stat}
      </p>
      <p>
        <strong>Special Attack:</strong> {pokemon.stats[3].base_stat}
      </p>
      <p>
        <strong>Special Defense:</strong> {pokemon.stats[4].base_stat}
      </p>
      <p>
        <strong>Speed:</strong> {pokemon.stats[5].base_stat}
      </p>
      <p>
        <strong>Abilities:</strong>{" "}
        {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}
      </p>
      <p>
        <strong>Types:</strong>{" "}
        {pokemon.types.map((t: any) => t.type.name).join(", ")}
      </p>
      <p>
        <strong>Weaknesses:</strong>{" "}
        {pokemon.types.map((t: any) => t.type.name).join(", ")}
      </p>
      <a href="/" className="text-blue-600 underline mt-4 block">
        Back to list
      </a>
    </main>
  );
}
