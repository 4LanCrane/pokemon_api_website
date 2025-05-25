"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { StatsCard } from "@/components/ui/statsCard";

export default function PokemonDetails() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [pokemon, setPokemon] = useState<any>(null);
  const [species, setSpecies] = useState<any>(null);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemonDetails = async (name: string) => {
    setLoading(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    response
      .json()
      .then(setPokemon)
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching Pokémon details:", error);
        setPokemon(null);
      });
  };

  const fetchSpeciesDetails = async (url: string) => {
    const response = await fetch(url);
    return response
      .json()
      .then(setSpecies)
      .catch((error) => {
        console.error("Error fetching species details:", error);
        setSpecies(null);
      });
  };

  const fetchWeaknesses = async (types: string[]) => {
    const weaknesses: string[] = [];
    for (const type of types) {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      data.damage_relations.double_damage_from.forEach((weakness: any) => {
        weaknesses.push(weakness.name);
      });
    }
    setWeaknesses(weaknesses);
  };

  useEffect(() => {
    if (name) {
      fetchPokemonDetails(name);
      fetchSpeciesDetails(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    }
  }, [name]);

  useEffect(() => {
    if (pokemon && pokemon.types) {
      fetchWeaknesses(pokemon.types.map((t: any) => t.type.name));
    }
  }, [pokemon]);

  if (!pokemon || !name) {
    return <main className="p-8"></main>;
  }
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  const flavorText = species?.flavor_text_entries
    ?.find((entry: any) => entry.language.name === "en")
    ?.flavor_text.replace("not available");

  if (loading) {
    return (
      <main className="p-8">
        <div className="flex items-center justify-center h-screen">
          <ClipLoader color="blue" size={50} />
          <p className="ml-4 text-lg">Loading Pokémon details...</p>
        </div>
      </main>
    );
  } else {
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
          <p className="text-lg font-semibold capitalize mr-1">
            {" "}
            {pokemon.name}
          </p>
          <p className="text-gray-400 font-bold">
            #{String(pokemon.id).padStart(4, "0")}
          </p>
        </div>

        {/* The Grid starts here */}
        <div className=" flex flex-col   md:grid grid-cols-3   gap-3 mt-8 mx-20">
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
          <div className="p-4 rounded-lg md:col-span-1 min-h-[200px] outline-solid sm: col-span-2 flex flex-col">
            <p>
              <strong>Types:</strong>
            </p>
            <p>
              {pokemon.types.map((t: any) => (
                <Badge key={t.type.name} className="capitalize m-1">
                  {t.type.name}
                </Badge>
              ))}
            </p>
            <p className="mt-2">
              <strong>Weaknesses:</strong>
            </p>
            <p>
              {weaknesses.map((weakness) => (
                <Badge key={weakness} className="capitalize m-1">
                  {weakness}
                </Badge>
              ))}
            </p>
          </div>

          <div className="p-4 rounded-lg shadow-md col-span-1 md:min-h-[200px] outline-solid">
            <p>
              <strong>Abilities:</strong>
            </p>
            <div>
              {pokemon.abilities.map((ability: any) => (
                <div key={ability.ability.name} className="mb-2">
                  <span className="font-semibold capitalize">
                    {ability.ability.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <StatsCard stats={pokemon.stats} />

          <Button
            className="mt-6 w-40 p-5  col-start-1"
            variant="default"
            onClick={() => window.history.back()}
          >
            <ChevronLeft /> Back to Search
          </Button>
        </div>

        <footer className="mt-10 mb-10 flex justify-center-safe">
          <p>Thank you for using Pokèmon Brower!</p>
        </footer>
      </main>
    );
  }
}
