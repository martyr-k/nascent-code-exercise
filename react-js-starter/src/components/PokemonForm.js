import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

import { TextInput, FormLabel, SelectInput, SearchRadioButton } from "./index";

const PokemonForm = () => {
  const [searchMethod, setSearchMethod] = useState("");
  const [error, setError] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [isLoading, setIsLoading] = useState(true); // use tailwind skeleton layout

  const handleSearchMethodChange = (event) => {
    setSearchMethod(event.target.value);
    setError("");
  };

  const handlePokemonNameChange = (event) => {
    setPokemonName(event.target.value);
    setError("");
  };

  // useEffect(() => {
  //   (async () => {
  // try {
  //     const response = await axios.get(
  //       "https://pokeapi.co/api/v2/type?limit=18"
  //     );
  //     setTypes(response.data.results);
  //} catch (e) {
  // alert("Something went wrong, please try again later.")
  //}
  //   })();
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    switch (searchMethod) {
      case "name":
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
          );
          console.log("Success!");
        } catch (error) {
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
            searchMethod={searchMethod}
            handleChange={handleSearchMethodChange}
            img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
            error={error}
          />
          <SearchRadioButton
            title="Color"
            description="Select a color and we'll present a list of Pokèmon matching that color!"
            value="type"
            id="type"
            name="searchMethod"
            searchMethod={searchMethod}
            handleChange={handleSearchMethodChange}
            img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png"
            error={error}
          />
          <SearchRadioButton
            title="Initials"
            description="Enter your first and last intials and we'll try to find a Pokèmon with those letters in its name."
            value="initials"
            id="initials"
            name="searchMethod"
            searchMethod={searchMethod}
            handleChange={handleSearchMethodChange}
            img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png"
            error={error}
          />
        </div>
        {error === "no-search" && (
          <p className="text-xs text-red-500">Please select a search method.</p>
        )}
        {searchMethod === "name" && (
          <div className="mb-4">
            <FormLabel>Pokèmon Name:</FormLabel>
            <TextInput
              type="text"
              placeholder="Charizard"
              error={error === "invalid-name"}
              onChange={handlePokemonNameChange}
              value={pokemonName}
              required
            />
            {error === "invalid-name" && (
              <p className="text-xs text-red-500 mt-1">
                Please enter a valid Pokèmon name.
              </p>
            )}
          </div>
        )}
        <button
          type="submit"
          className="px-3 py-2 rounded font-semibold bg-violet-800 text-white hover:bg-violet-900 transition-colors flex ml-auto"
        >
          Review
          <ArrowCircleRightIcon className="h-6 ml-2" />
        </button>
      </form>
    </>
  );
};

export default PokemonForm;
