import { NavNumber, WelcomeForm } from "./components";
import "./styles/App.css";

function App() {
  return (
    <>
      <header className="text-white text-center">
        <h1 className="font-bold text-6xl sm:text-8xl">Pokè Partner</h1>
        <p className="mt-3 text-xl sm:w-1/2 mx-auto">
          Welcome to the official Pokè Partner app where we collect your data
          and do absolutely nothing with it!
        </p>
      </header>
      <section className="mt-10 max-w-xl mx-auto">
        <div className="flex justify-between mb-5">
          <NavNumber value={1} />
          <NavNumber value={2} />
          <NavNumber value={3} />
        </div>

        <WelcomeForm />
      </section>
      <footer></footer>
    </>
  );
}

export default App;
