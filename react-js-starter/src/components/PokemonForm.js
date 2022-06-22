import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

import { TextInput, FormLabel, SelectInput, SearchRadioButton } from "./index";
import { pokemonColors } from "../util/const";

const PokemonForm = () => {
  const [method, setMethod] = useState("");
  const [error, setError] = useState("");
  const [submtting, setSubmtting] = useState(false);
  const [pokemon, setPokemon] = useState("");
  const [pokemonList, setPokemonList] = useState("");
  const [color, setColor] = useState("");
  const [isLoading, setIsLoading] = useState(true); // use tailwind skeleton layout

  useEffect(() => {
    if (method === "color" && color) {
      (async () => {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-color/${color.toLowerCase()}`
          );
          setPokemonList(response.data["pokemon_species"]);
        } catch (e) {
          alert("Something went wrong, please try again later.");
        }
      })();
    }
  }, [method, color]);

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
    setError("");
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handlePokemonChange = (event) => {
    setPokemon(event.target.value);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmtting(true);

    switch (method) {
      case "name":
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
          );
          console.log("Success!");
          // ok for now
          setSubmtting(false);
        } catch (error) {
          setSubmtting(false);
          if (error.response.status === 404) {
            setError("invalid-name");
          } else {
            alert("Something went wrong, please try again later.");
          }
        }
        break;
      case "color":
        break;
      case "initials":
        break;
      default:
        setError("no-search");
        break;
    }
  };

  return (
    <>
      <p className="text-white mb-3 text-lg">Next, find your Pokèmon match!</p>
      <form
        className="w-full bg-zinc-50 rounded-md p-4 text-gray-600 shadow"
        onSubmit={handleSubmit}
      >
        <p className="mb-4 font-light">
          We have a few options to help you choose your preferred Pokèmon:
        </p>
        <div className="mb-3 grid sm:grid-cols-3 gap-3">
          <SearchRadioButton
            title="Name"
            description="If you already know your Pokèmon match!"
            value="name"
            id="name"
            name="searchMethod"
            method={method}
            handleChange={handleMethodChange}
            img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
            error={error}
          />
          <SearchRadioButton
            title="Color"
            description="Select a color and we'll present a list of Pokèmon matching that color that you can choose from!"
            value="color"
            id="color"
            name="searchMethod"
            method={method}
            handleChange={handleMethodChange}
            img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png"
            error={error}
          />
          <SearchRadioButton
            title="Initials"
            description="Enter your first and last intials and we'll find a Pokèmon using our magic algorithm."
            value="initials"
            id="initials"
            name="searchMethod"
            method={method}
            handleChange={handleMethodChange}
            img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png"
            error={error}
          />
        </div>
        {error === "no-search" && (
          <p className="text-xs text-red-500">Please select a search method.</p>
        )}
        {method === "name" && (
          <div className="mb-4">
            <FormLabel>Pokèmon Name:</FormLabel>
            <TextInput
              type="text"
              placeholder="Charizard"
              error={error === "invalid-name"}
              onChange={handlePokemonChange}
              value={pokemon}
              required
            />
            {error === "invalid-name" && (
              <p className="text-xs text-red-500 mt-1">
                Please enter a valid Pokèmon name.
              </p>
            )}
          </div>
        )}
        {method === "color" && (
          <div className="mb-4">
            <FormLabel htmlFor="pokemonColor">Pokemon Color:</FormLabel>
            <SelectInput
              type="text"
              id="pokemonColor"
              name="pokemonColor"
              onChange={handleColorChange}
              value={color}
            >
              <option>Select a color...</option>
              {pokemonColors.map((color) => {
                return (
                  <option key={color} value={color}>
                    {color}
                  </option>
                );
              })}
            </SelectInput>
          </div>
        )}
        <button
          type="submit"
          className="px-3 py-2 rounded font-semibold bg-violet-800 text-white hover:bg-violet-900 transition-colors flex ml-auto"
        >
          {submtting ? (
            "Submitting..."
          ) : (
            <>
              Review
              <ArrowCircleRightIcon className="h-6 ml-2" />
            </>
          )}
        </button>
      </form>
    </>
  );
};

export default PokemonForm;
