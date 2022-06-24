import { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/solid";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  TextInput,
  FormLabel,
  SelectInput,
  SearchRadioButton,
  PaginatedList,
} from "./index";
import { pokemonColors } from "../util/const";
import { handleSearchMethod, parsePokemonName } from "../util/helpers";

const PokemonForm = ({ pokemonData, save, firstName, welcomeData }) => {
  const [method, setMethod] = useState(pokemonData.method || "");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [pokemon, setPokemon] = useState(
    (pokemonData.method === "name" && pokemonData.pokemonName) || ""
  );
  const [pokemonByColor, setPokemonByColor] = useState(
    (pokemonData.method === "color" && pokemonData.pokemonName) || ""
  );
  const [pokemonList, setPokemonList] = useState([]);
  const [color, setColor] = useState(pokemonData.color || "");
  const [initials, setInitials] = useState(pokemonData.initials || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!welcomeData.hasOwnProperty("firstName")) {
      navigate("/");
      toast.error(
        "Please enter information about yourself before choosing a Pokèmon.",
        { toastId: 123 }
      );
    }
  }, [welcomeData, navigate]);

  useEffect(() => {
    if (method === "color" && color) {
      (async () => {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-color/${color.toLowerCase()}`
          );
          setPokemonList(response.data["pokemon_species"]);
        } catch (e) {
          toast.error("Something went wrong, please try again later.");
        }
      })();
    }
  }, [method, color]);

  // - make into hook!
  const handleMethodChange = (event) => {
    setMethod(event.target.value);
    setError("");
  };

  // - make into hook!
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  // - make into hook!
  const handlePokemonChange = (event) => {
    setPokemon(event.target.value.split(" ").join("-"));
    setError("");
  };

  // - make into hook!
  const handleInitialChange = (event) => {
    setInitials(event.target.value);
    setError("");
  };

  const selectPokemonByColor = (pokemon) => {
    setPokemonByColor(pokemon);
  };

  const isSubmitDisabled = () => {
    return (
      (!pokemon && method === "name") ||
      (!pokemonByColor && method === "color") ||
      (!initials && method === "initials")
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const [result, error] = await handleSearchMethod({
      method,
      pokemon,
      pokemonByColor,
      color,
      initials,
      firstName,
    });

    if (result) {
      save("pokemon", {
        method: result.method,
        pokemonName: result.pokemonName,
        color: result.color,
        initials: result.initials,
      });

      setSubmitting(false);
      navigate("/review");
    } else {
      setSubmitting(false);
      if (typeof error === "string") {
        setError(error);
      } else {
        toast.error("Something went wrong, please try again later.");
      }
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
            description="Enter a set of first and last intials and we'll find a Pokèmon using our magic algorithm!"
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
          <p className="text-xs text-red-500 mb-3">
            Please select a search method.
          </p>
        )}
        {method === "name" && (
          <div className="mb-4">
            <FormLabel htmlFor="pokemonName">Pokèmon Name:</FormLabel>
            <TextInput
              id="pokemonName"
              name="pokemonName"
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
            <FormLabel htmlFor="pokemonColor">Pokèmon Color:</FormLabel>
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
            {pokemonList.length > 0 && (
              <PaginatedList
                list={pokemonList}
                limit={20}
                selectedPokemon={pokemonByColor}
                selectPokemonByColor={selectPokemonByColor}
              />
            )}
          </div>
        )}
        {method === "initials" && (
          <div className="mb-4">
            <FormLabel htmlFor="initialsSearch">Initials:</FormLabel>
            <TextInput
              type="text"
              id="initialsSearch"
              name="initialsSearch"
              onChange={handleInitialChange}
              value={initials}
              minLength={2}
              maxLength={2}
              required
              error={error === "invalid-initials"}
            />
            {error === "invalid-initials" && (
              <p className="text-xs text-red-500 mt-1">
                Please enter valid initials.
              </p>
            )}
            {pokemonData.method === "initials" && pokemonData.pokemonName && (
              <p className="mt-1 font-light text-emerald-500">
                Current Match:{" "}
                <span className="capitalize">
                  {parsePokemonName(pokemonData.pokemonName)}
                </span>
              </p>
            )}
          </div>
        )}
        <div className="flex justify-between">
          <Link
            className="px-3 py-2 rounded font-semibold bg-red-600 text-white hover:bg-red-800 transition-colors flex"
            to=".."
          >
            <ArrowCircleLeftIcon className="h-6 mr-2" />
            Back
          </Link>
          <button
            type="submit"
            className={`px-3 py-2 rounded font-semibold bg-violet-800 text-white hover:bg-violet-900 transition-colors flex ${
              isSubmitDisabled() && "opacity-30"
            }`}
            disabled={isSubmitDisabled()}
          >
            {submitting ? (
              "Submitting..."
            ) : (
              <>
                Review
                <ArrowCircleRightIcon className="h-6 ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default PokemonForm;
