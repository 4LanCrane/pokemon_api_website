"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PokemonCard } from "@/components/ui/pokemonCard";
export default function Home() {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchList = async (): Promise<void> => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
    const data = await res.json();
    const resWithId = data.results.map((pokemon: any) => {
      const imageId = pokemon.url.split("/").filter(Boolean).pop();
      return { ...pokemon, imageId };
    });
    setPokemonList(resWithId);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const Pokemon = async (search: string) => {
    if (search.length === 0) {
      fetchList();
      setSearchText("");
      return;
    }
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
    );
    if (!response.ok) {
      setPokemonList([]);

      return;
    }
    const data = await response.json();
    setPokemonList([
      {
        name: data.name,
        imageId: data.id,
      },
    ]);
    setSearchText(search);
  };

  return (
    <main className="">
      <header className="pt-10 pb-10">
        <h1 className="pb-2 text-3xl font-bold justify-center-safe flex">
          Pokèmon Browser
        </h1>
        <h2 className=" text-1.2xl text-slate-600 font-semibold justify-center-safe flex">
          Search and find Pokèmon
        </h2>
      </header>

      <div className="mt-10 pb-20">
        <hr className="w-auto h-0.2 mx-auto my-4 bg-gray-900  "></hr>
        <h1 className="ml-10 float-left text-1xl  font-semibold">
          {searchText ? `results for "${searchText}"` : "Explore Pokèmon"}
        </h1>
        <div className="ml-10 float-right flex ">
          <Input
            className="gap-1.5 w-40"
            placeholder="Find Pokèmon"
            value={search}
            onChange={(a) => setSearch(a.target.value)}
          />
          <Button
            className="mr-10 float-right"
            variant="default"
            onClick={() => Pokemon(search)}
          >
            Search
          </Button>
        </div>
      </div>
      <div className=" mb-6 flex flex-wrap gap-4 justify-center-safe">
        {pokemonList.map((pokemon: any) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.imageId}.png`}
          />
        ))}
      </div>
      <nav className="mb-10 mt-10 flex justify-center-safe gap-3">
        <Button>Back</Button>
        <Button>Next</Button>
      </nav>
      <hr className="w-auto h-0.2 mx-auto my-4 bg-gray-900  "></hr>
      <footer className="mt-10 mb-10 flex justify-center-safe">
        <p>Thank you for using Pokèmon Brower!</p>
      </footer>
    </main>
  );
}
