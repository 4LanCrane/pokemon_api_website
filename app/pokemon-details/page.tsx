"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progressBar";

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
    <main>
      <header className="pb-2 pt-2">
        <h1 className="pl-10 text-1xl font-bold">Pokèmon Browser</h1>
      </header>
      <div className="justify-center-safe flex flex-col items-center relative">
        <div className="bg-gray-300 flex-row w-full h-22"></div>
        <img
          src={imageUrl}
          alt={pokemon.name}
          className="w-48 h-48 mb-4 rounded-full bg-gray-100 border-2 border-gray-300 shadow-lg -mt-10"
        />
      </div>
      <div className="flex justify-center-safe ">
        <h3 className="font-bold capitalize mr-1"> {pokemon.name}</h3>
        <p className="text-gray-400 font-bold">
          {" "}
          #{String(pokemon.id).padStart(4, "0")}
        </p>
      </div>

      {/* Grid starts here */}
      <div className="grid  gap-1   ">
        {/* this is the top span box*/}
        <div className="col-start-1 row-start-1 col-span-3 bg-amber-400 h-20"></div>

    {/*this is the large sidebar */}
        <div className="bg-green-600 col-start-1 row-span-3 col-span-1 ">
        <p>testing</p>
        </div>

        <div className="col-start-2 row-start-2 col-span-1 bg-gray-800 p-4 rounded-lg shadow-md">
          <p>
            <strong>Types:</strong>
            {pokemon.types.map((t: any) => t.type.name).join(", ")}
          </p>
          <p>
            <strong>Weaknesses:</strong>
            {pokemon.types.map((t: any) => t.type.name).join(", ")}
          </p>
        </div>

        <div className="col-span-1 col-start-3 bg-gray-800 p-4 rounded-lg shadow-md">
          <p>
            <strong>Abilities:</strong>
            {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}
          </p>
        </div>

        {/* This is the stats for the pokemon */}
        <div className=" bg-amber-300 col-start-2 col-span-2 row-start-3">
          <div className="flex items-center justify-between">
            <p>HP</p>
            <Progress
              value={pokemon.stats[0].base_stat}
              className="w-72 mt-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <p>Attack</p>
            <Progress
              value={pokemon.stats[1].base_stat}
              className="w-72 mt-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <p>Defense</p>
            <Progress
              value={pokemon.stats[2].base_stat}
              className="w-72 mt-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <p>Special Attack</p>
            <Progress
              value={pokemon.stats[3].base_stat}
              className="w-72 mt-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <p>Special Defense</p>
            <Progress
              value={pokemon.stats[4].base_stat}
              className="w-72 mt-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <p>Speed</p>
            <Progress
              value={pokemon.stats[5].base_stat}
              className="w-72 mt-2"
            />
          </div>
        </div>
      </div>

      <a href="/" className="text-blue-600 underline mt-4 block">
        Back to list
      </a>
      <footer className="mt-10 mb-10 flex justify-center-safe">
        <p>Thank you for using Pokèmon Brower!</p>
      </footer>
    </main>
  );
}
