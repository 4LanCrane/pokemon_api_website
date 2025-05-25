"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PokemonCard } from "@/components/ui/pokemonCard";
import { ClipLoader } from "react-spinners";

const itemsPerPage = 30;

export default function Home() {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchList = async (currentPage = 0): Promise<void> => {
    setLoading(true);
    const offset = currentPage * itemsPerPage;
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
    );
    const data = await res.json();
    const resWithDetails = await Promise.all(
      data.results.map(async (pokemon: any) => {
        const details = await fetch(pokemon.url).then((res) => res.json());
        return {
          name: details.name,
          imageId: details.id,
          types: details.types.map((t: any) => t.type.name),
        };
      })
    );
    setPokemonList(resWithDetails);
    setLoading(false);
  };

  useEffect(() => {
    fetchList(currentPage);
  }, [currentPage]);

  const searchPokemon = async (search: string) => {
    setLoading(true);
    if (search.length === 0) {
      fetchList();
      setSearchText("");
      setLoading(false);
      return;
    }
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
    );
    if (!response.ok) {
      setPokemonList([]);
      setLoading(false);
      return;
    }
    const data = await response.json();
    setPokemonList([
      {
        name: data.name,
        imageId: data.id,
        types: data.types.map((t: any) => t.type.name),
      },
    ]);
    setSearchText(search);
    setLoading(false);
  };

  return (
    <main>
      <header className="pt-10 pb-10">
        <h1 className="pb-2 text-3xl font-bold justify-center-safe flex">
          Pokèmon Browser
        </h1>
        <h2 className=" text-1.2xl text-slate-600 font-semibold justify-center-safe flex">
          Search and find Pokèmon
        </h2>
      </header>

      <div className="mt-10 pb-20">
        <hr className="w-auto h-0.2 mx-auto my-4 bg-gray-900 "></hr>

        <h1 className="md:ml-40 md:float-left text-2xl  font-medium flex flex-row items-center justify-center">
          {searchText ? `results for "${searchText}"` : "Explore Pokèmon"}
        </h1>
        <div className="md:mr-40 md:float-right md:flex md:gap-3 flex flex-row items-center justify-center">
          <Input
            className="w-40"
            placeholder="Find Pokèmon"
            value={search}
            onChange={(a) => setSearch(a.target.value)}
          />
          <Button
            className="md:float-right"
            variant="default"
            onClick={() => searchPokemon(search)}
          >
            Search
          </Button>
        </div>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:mx-40 md:mx-10 sm:mx-10 mx-5">
        {loading ? (
          <div className="flex flex-row h-96">
            <ClipLoader color="blue" size={50} />
            <p className="text-lg">Loading Pokèmon...</p>
          </div>
        ) : (
          pokemonList.map((pokemon: any) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              number={pokemon.imageId}
              types={pokemon.types}
              imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.imageId}.png`}
            />
          ))
        )}
      </div>
      <nav className="mb-10 mt-10 flex justify-center-safe gap-3">
        <Button
          onClick={() => {
            if (currentPage > 0) {
              setCurrentPage(currentPage - 1);
            }
          }}
          disabled={currentPage === 0}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            if (pokemonList.length === itemsPerPage) {
              setCurrentPage(currentPage + 1);
            }
          }}
          disabled={pokemonList.length < itemsPerPage}
        >
          Next
        </Button>
      </nav>
      <hr className="w-auto h-0.2 mx-auto my-4 bg-gray-900  "></hr>
      <footer className="mt-10 mb-10 flex justify-center-safe">
        <p>Thank you for using Pokèmon Brower!</p>
      </footer>
    </main>
  );
}
