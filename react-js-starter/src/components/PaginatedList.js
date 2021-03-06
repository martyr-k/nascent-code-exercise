import { useState, useEffect } from "react";
import {
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/solid";

import { ListItem } from "./index";
import { findPage } from "../util/helpers";

const PaginatedList = ({
  list,
  limit,
  selectPokemonByColor,
  selectedPokemon,
}) => {
  const [page, setPage] = useState(findPage(list, limit, selectedPokemon));
  const lastPage = Math.ceil(list.length / limit) - 1;

  useEffect(() => {
    setPage(findPage(list, limit, selectedPokemon));
  }, [list, limit, selectedPokemon]);

  const handleClickL = () => {
    setPage((page) => page - 1);
  };

  const handleClickR = () => {
    setPage((page) => page + 1);
  };

  const handlePokemonClick = (pokemon) => {
    selectPokemonByColor(pokemon);
  };

  return (
    <>
      <div className="flex mt-3">
        <button
          type="button"
          className={`shrink-0 self-center mr-2 ${page === 0 && "opacity-30"}`}
          onClick={handleClickL}
          disabled={page === 0}
        >
          <ArrowCircleLeftIcon className="h-10" />
        </button>
        <div className="flex gap-3 flex-wrap mt-3">
          {list.slice(page * limit, page * limit + limit).map((item) => (
            <ListItem
              key={item.name}
              name={item.name}
              handlePokemonClick={handlePokemonClick}
              selectedPokemon={selectedPokemon}
            />
          ))}
        </div>
        <button
          type="button"
          className={`shrink-0 self-center ml-2 ${
            page === lastPage && "opacity-30"
          }`}
          onClick={handleClickR}
          disabled={page === lastPage}
        >
          <ArrowCircleRightIcon className="h-10" />
        </button>
      </div>
    </>
  );
};

export default PaginatedList;
