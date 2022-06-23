import { useState, useEffect } from "react";
import axios from "axios";
import { PencilAltIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { parsePokemonName } from "../util/helpers";

const ReviewPage = ({ appData, clear }) => {
  const { pokemonName } = appData.pokemon;
  const { firstName, lastName, phone, address, city, province, postalCode } =
    appData.welcome;
  const [pokemonSprite, setPokemonSprite] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        setPokemonSprite(response.data.sprites["front_default"]);
      } catch (e) {
        toast.error("Something went wrong, please try again later.");
      }
    })();
  }, [pokemonName]);

  const handleSubmit = () => {
    try {
      // POST to api of some sort
      toast.success("Submission saved successfully!");
      clear();
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
    }
  };

  return (
    <>
      <p className="text-white mb-3 text-lg">
        Review your responses. You can go back at any time to make changes. When
        you are satsified, click on the submit button below.
      </p>
      <section className="w-full bg-zinc-50 rounded-md p-4 text-gray-600 shadow">
        <h2 className="text-xl mb-3 border-b-2 pb-3 border-sky-300 border-dashed">
          About You
        </h2>
        <article className="font-light tracking-wider mb-6 flex">
          <div className="grow">
            <p className="mb-1">
              Name: {firstName} {lastName}
            </p>
            <p className="mb-1">Phone: {phone}</p>
            <p className="mb-1">
              Address: {address}, {city} {province}, {postalCode}
            </p>
          </div>
          <Link className="text-emerald-500 self-start" to="/">
            <span className="align-middle">Edit</span>{" "}
            <PencilAltIcon className="h-6 inline-block" />
          </Link>
        </article>
        <h2 className="text-xl mb-3 border-b-2 pb-3 border-sky-300 border-dashed">
          Pokèmon Partner
        </h2>
        <article className="flex mt-4">
          <div className="text-center grow">
            <h3 className="uppercase font-bold text-xl uppercase">
              {parsePokemonName(pokemonName)}
            </h3>
            {pokemonSprite ? (
              <img className="mx-auto" src={pokemonSprite} alt={pokemonName} />
            ) : (
              <div className="h-24 w-24 bg-slate-200 animate-pulse mx-auto mt-3 rounded-full"></div>
            )}
          </div>
          <Link className="text-emerald-500 self-start" to="/partner">
            <span className="align-middle">Edit</span>{" "}
            <PencilAltIcon className="h-6 inline-block" />
          </Link>
        </article>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-3 py-2 rounded font-semibold bg-violet-800 text-white hover:bg-violet-900 transition-colors flex ml-auto"
        >
          Submit
        </button>
      </section>
    </>
  );
};

export default ReviewPage;
