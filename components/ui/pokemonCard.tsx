import React from "react";
import Link from "next/link";

/**
 *
 * This screen will show the details of a pokemon including
 * its name, image, id, height, weight, gender, weaknesses,types, and ability and stats
 *
 * Done: img, id, name, height, weight, types
 * TODO: ability, stats and then formating the data
 */

function PokemonCard({
  number,
  name,
  imageUrl,
  test,
}: {
  number: number;
  name: string;
  imageUrl: string;
  test: string;
}) {
  return (
    <Link href={`/pokemon-details?name=${name}`}>
      <div className="shadow-sm rounded-xs flex flex-col  w-50 h-50">
        <div className="flex items-center justify-center w-full h-full bg-gray-200 ">
          <img src={imageUrl} alt={name} className="w-16 h-16" />
        </div>
        <div className="float-left ml-3 ">
          <h1 className="font-semibold">{name}</h1>
          <p className="text-gray-500 text-sm">
            #{String(number).padStart(4, "0")}
          </p>
          <p className="text-gray-500 text-sm">{test}</p>
        </div>
      </div>
    </Link>
  );
}
export { PokemonCard };
