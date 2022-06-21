import { ArrowCircleRightIcon } from "@heroicons/react/solid";

import "./styles/App.css";
import { FormLabel, TextInput, NavNumber } from "./components";

function App() {
  return (
    <>
      <header className="text-white text-center">
        <h1 className="text-8xl font-bold">Pokè Partner</h1>
        <p className="mt-3 text-xl sm:w-1/2 mx-auto">
          Welcome to the official Pokè Partner app. Where we collect your data
          and do absolutely nothing with it.
        </p>
      </header>
      <section className="mt-10 max-w-xl mx-auto">
        <div className="flex justify-between mb-5">
          <NavNumber value={1} />
          <NavNumber value={2} />
          <NavNumber value={3} />
        </div>
        <p className="text-white mb-3 text-lg">
          First, let's start by gathering some information about you.
        </p>

        <form className="w-full bg-zinc-50 rounded-md p-4 text-gray-600 shadow">
          <p className="mb-3 font-light">All fields are required.</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <FormLabel>First Name:</FormLabel>
              <TextInput type="text" />
            </div>
            <div>
              <FormLabel>Last Name:</FormLabel>
              <TextInput type="text" />
            </div>
          </div>
          <div className="mb-3">
            <FormLabel>Phone Number:</FormLabel>
            <TextInput type="text" />
          </div>
          <div className="mb-3">
            <FormLabel>Street Address:</FormLabel>
            <TextInput type="text" />
          </div>
          <div className="App-location mb-5">
            <div>
              <FormLabel>City:</FormLabel>
              <TextInput type="text" />
            </div>
            <div>
              <FormLabel>Province:</FormLabel>
              <TextInput type="text" />
            </div>
            <div>
              <FormLabel>Postal Code:</FormLabel>
              <TextInput type="text" />
            </div>
          </div>
          <button
            type="submit"
            className="px-3 py-2 rounded font-semibold bg-violet-600 text-white hover:bg-violet-800 transition-colors flex ml-auto"
          >
            Choose a Pokèmon
            <ArrowCircleRightIcon className="h-6 ml-2" />
          </button>
        </form>
      </section>
      <footer></footer>
    </>
  );
}

export default App;
