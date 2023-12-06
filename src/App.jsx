import "./App.css";
import FilteredCats from "./components/FilteredCats";
import Filters from "./components/Filters";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <Hero />
      <Filters />
      <FilteredCats />
    </>
  );
}

export default App;
