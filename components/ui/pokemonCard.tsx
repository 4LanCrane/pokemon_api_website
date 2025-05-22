import React from "react";

function PokemonCard({ name, imageUrl }: { name: string; imageUrl: string }) {
  return (
    <div className="shadow-sm rounded-xs flex flex-col  w-50 h-50">
      <div className="flex items-center justify-center w-full h-full bg-gray-200 ">
        <img src={imageUrl} alt={name} className="w-16 h-16" />
      </div>
      <div className="float-left ml-3 ">
        <h1 className="font-semibold">{name}</h1>
        <p className="text-gray-500 text-sm">test</p>
      </div>
    </div>
  );
}
export { PokemonCard };
