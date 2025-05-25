"use client";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progressBar";
import { Button } from "@/components/ui/button";

export default function PokemonDetails() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [pokemon, setPokemon] = useState<any>(null);
  const [species, setSpecies] = useState<any>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then(setPokemon);
  }, [name]);

  useEffect(() => {
    if (!pokemon) return;
    fetch(pokemon.species.url)
      .then((res) => res.json())
      .then(setSpecies);
  }, [pokemon]);

  if (!pokemon || !name) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold capitalize mb-4">Loading...</h1>
      </main>
    );
  }
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  const flavorText = species?.flavor_text_entries
    ?.find((entry: any) => entry.language.name === "en")
    ?.flavor_text.replace("not available");
  return (
    <main>
      <header className="pb-2 pt-2">
        <h1 className="pl-10 text-1xl font-bold">Pokèmon Browser</h1>
      </header>
      <div className="justify-center-safe flex flex-col items-center relative">
        <div className="bg-gray-300 flex-row w-full h-32"></div>
        <img
          src={imageUrl}
          alt={pokemon.name}
          className="w-48 h-48 mb-4 rounded-full bg-gray-100 border-2 border-gray-300 shadow-lg -mt-10"
        />
      </div>
      <div className="flex justify-center-safe ">
        <p className="text-lg font-semibold capitalize mr-1"> {pokemon.name}</p>
        <p className="text-gray-400 font-bold">
          #{String(pokemon.id).padStart(4, "0")}
        </p>
      </div>

      {/* The Grid starts here */}
      <div className="grid grid-cols-3 grid-rows-[auto_auto_1fr] gap-3 mt-8 mx-20">
        {/* this is the top bar which contains the  "flavorText" */}
        <div className="bg-gray-200 p-4 col-span-3 rounded-lg shadow-md mb-5 h-auto">
          <p>{flavorText || ""}</p>
        </div>

        {/* sidebar, spans all rows, contains height, category, weight and gender */}
        <div className=" rounded-lg flex flex-col items-center md:row-span-3 w-full min-h-[440px] outline-solid sm:w-auto ">
          <div className=" text-center mt-5 space-y-4">
            <div>
              <span className="font-bold">Height</span>
              <div>{pokemon.height / 10} m</div>
            </div>
            <div>
              <span className="font-bold">Weight</span>
              <div>{pokemon.weight / 10} kg</div>
            </div>
            <div>
              <span className="font-bold">Category</span>
              <div>{pokemon.species.name}</div>
            </div>
            <div>
              <span className="font-bold">Gender</span>
              <div>
                {species
                  ? species.gender_rate === -1
                    ? "No gender"
                    : species.gender_rate === 0
                    ? "Male"
                    : species.gender_rate === 8
                    ? "Female"
                    : "Male / Female"
                  : ""}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg md:col-span-1 min-h-[200px] outline-solid sm: col-span-2">
          <p>
            <strong>Types:</strong>{" "}
            {pokemon.types.map((t: any) => t.type.name).join(", ")}
          </p>
          <p>
            <strong>Weaknesses:</strong>{" "}
            {pokemon.types.map((t: any) => t.type.name).join(", ")}
          </p>
        </div>

        <div className="p-4 rounded-lg shadow-md col-span-1 md:min-h-[200px] outline-solid">
          <p>
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}
          </p>
        </div>

        <div className="p-4 rounded-lg col-start-2 col-span-2 row-start-3 outline-solid">
          <div className="space-y-2">
            {pokemon.stats.map((stat: any) => (
              <div key={stat.stat.name} className="flex items-center gap-4">
                <span className="capitalize font-medium w-32 text-right">
                  {stat.stat.name.replace("special-", "Sp. ")}
                </span>
                <Progress value={stat.base_stat} className="flex-1 h-3" />
                <span className="font-mono w-10 text-right">
                  {stat.base_stat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        className="mt-6 mx-auto block"
        variant="default"
        onClick={() => window.history.back()}
      >
        Back to Search
      </Button>

      <footer className="mt-10 mb-10 flex justify-center-safe">
        <p>Thank you for using Pokèmon Brower!</p>
      </footer>
    </main>
  );
}
