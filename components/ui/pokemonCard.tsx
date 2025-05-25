import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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
  types,
}: {
  number: number;
  name: string;
  imageUrl: string;
  types: string[];
}) {
  return (
    <Link href={`/pokemon-details?name=${name}`}>
      <div className="shadow-lg rounded-sm flex flex-col border border-gray-300 bg-white hover:shadow-2xl transition duration-300 ease-in-out ">
        <div className="flex items-center justify-center  bg-gray-200 rounded-t-sm">
          <img src={imageUrl} alt={name} className="w-36 h-36" />
        </div>
        <div className="float-left ml-3 ">
          <h1 className="font-semibold capitalize">{name}</h1>
          <p className="text-gray-500 text-sm">
            #{String(number).padStart(4, "0")}
          </p>
          {types.map((type) => (
            <Badge className="capitalize bg-gray-600 m-1">{type}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
export { PokemonCard };
