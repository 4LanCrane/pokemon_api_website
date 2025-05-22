import React from "react";

function PokemonCard({ name, imageUrl }: { name: string; imageUrl: string }) {
  return (
    <div className="shadow-sm rounded-xs flex flex-col items-center justify-center w-50 h-50">
      <div className="flex items-center justify-center w-full h-full bg-gray-200 ">
        <img src={imageUrl} alt={name} className="w-16 h-16" />
      </div>
      <div className="">
        <h1 className="text-2xl font-bold">Item</h1>
        <p className="text-lg">{name}</p>
      </div>
    </div>
  );
}
export { PokemonCard };
