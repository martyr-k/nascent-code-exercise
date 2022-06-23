import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { NavNumber, WelcomeForm, PokemonForm } from "./components";
import "./styles/App.css";

function App() {
  const [appState, setAppState] = useState({
    welcome: {},
    pokemon: {
      method: null,
      pokemonName: null,
      color: null,
      initials: null,
    },
  });

  const save = (type, data) => {
    const newAppState = { ...appState, [type]: data };
    setAppState(newAppState);
  };

  return (
    <>
      <header className="text-white text-center">
        <h1 className="font-bold text-7xl sm:text-8xl">Pokè Partner</h1>
        <p className="mt-3 text-xl sm:w-1/2 mx-auto">
          Welcome to the official Pokè Partner app where we collect your data
          and do absolutely nothing with it!
        </p>
      </header>
      <section className="mt-10 max-w-xl mx-auto">
        <div className="flex justify-between mb-5">
          <NavNumber value={1} path="/" />
          <NavNumber
            value={2}
            path="/partner"
            disabled={!appState.welcome.firstName}
          />
          <NavNumber
            value={3}
            path="review"
            disabled={!appState.pokemon.pokemonName}
          />
        </div>
        <Routes>
          <Route
            path="/"
            element={<WelcomeForm welcomeData={appState.welcome} save={save} />}
          />
          <Route
            path="/partner"
            element={<PokemonForm pokemonData={appState.pokemon} save={save} />}
          />
          <Route
            path="/review"
            element={
              <div>
                Review your responses. You can go back at any time to make
                changes. When you are satsified, click on the submit button
                below.
                {/* add back button for each page? */}
              </div>
            }
          />
        </Routes>
      </section>
    </>
  );
}

export default App;
