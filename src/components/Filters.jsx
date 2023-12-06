import axios from "axios";
import runCat from "../assets/run-cat.svg";
import { useState, useEffect, useRef } from "react";
import FilteredCats from "./FilteredCats";

const Filters = () => {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [matchCats, setMatchCats] = useState(true);
  const inputRef = useRef(null);

  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const apiBaseUrl = "https://api.api-ninjas.com/v1/cats?";

  const handleFilterChange = async (event) => {
    //Get the type of filter and the value selected
    const selectedType = event.target.name;
    const selectedValue = event.target.value;
    setFilterType(selectedType);
    setFilterValue(selectedValue);

    if (cats.length === 0) {
      console.log("getting cats");
      if (selectedType && selectedValue) {
        const endpoint = `${apiBaseUrl}${selectedType}=${selectedValue}`;
        try {
          const response = await axios.get(endpoint, {
            headers: {
              "X-Api-Key": "0WNV51fbLddK8L5K+ZURiw==HpoPl9twxSE0Lja0",
            },
          });
          setCats(response.data);
          //   console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("didn't get the values");
      }
    }
    if (cats.length > 0) {
      console.log(cats, "in the filter");
      let filteredKitties = [];
      if (selectedType == "shedding") {
        filteredKitties = cats.filter(
          (cat) => parseInt(cat.shedding) === parseInt(selectedValue)
        );
      } else if (selectedType == "playfulness") {
        filteredKitties = cats.filter(
          (cat) => parseInt(cat.playfulness) === parseInt(selectedValue)
        );
      }
      console.log(filteredKitties);
      setFilteredCats([...filteredKitties]);
      if (filteredCats.length == 0) {
        setCats([]);
        setFilteredCats([]);
        setMatchCats(false);
      }
    }
  };
  //
  // To handle the search by breed name
  //
  const handleInput = async (e) => {
    e.preventDefault();
    const searchValue = inputRef.current.value;
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/cats?name=${searchValue}`,
        {
          headers: {
            "X-Api-Key": "0WNV51fbLddK8L5K+ZURiw==HpoPl9twxSE0Lja0",
          },
        }
      );
      setCats(response.data);
    } catch (error) {
      console.log(error);
      setCats([]);
    }
  };
  //
  // Function to clear the filter
  //
  const clearFilter = () => {
    document.getElementById("quality-form").reset();
    document.getElementById("breed-form").reset();
    setCats([]);
    setFilteredCats([]);
    setMatchCats(true);
  };

  return (
    <div className="py-4">
      <div className="bg-teal-700 rounded-md p-4 flex flex-col justify-center items-center">
        <div className="p-2">
          <form id="breed-form" onSubmit={handleInput} className="">
            <label htmlFor="name" className="font-bold">
              By Breed:{" "}
            </label>
            <input
              className="rounded px-1 m-2 bg-teal-100 text-teal-700 placeholder-teal-600"
              id="name"
              placeholder="breed name"
              ref={inputRef}
            ></input>
            <button
              className="rounded bg-teal-900 p-1.5 text-white"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
        <div className="m-2">
          <h5 className="font-bold">OR:</h5>
        </div>
        <form
          id="quality-form"
          className="flex flex-col items-center justify-center"
        >
          <div className="p-2 flex flex-col">
            <label htmlFor="shedding" className="font-bold">
              Shedding level{" "}
            </label>
            <select
              className="rounded bg-teal-100 m-1"
              name="shedding"
              id="shedding"
              onChange={handleFilterChange}
            >
              Shedding Level
              <option value="-">-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="p-2 flex flex-col">
            <label htmlFor="playfulness" className="font-bold">
              Playfulness level{" "}
            </label>
            <select
              className="rounded bg-teal-100 m-1"
              name="playfulness"
              id="playfulness"
              onChange={handleFilterChange}
            >
              playfulness Level
              <option value="-">-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <button
              type="button"
              className="rounded bg-teal-800 p-1.5 text-white"
              onClick={clearFilter}
            >
              Clear Filters
            </button>
          </div>
        </form>
      </div>
      <div className="w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cats.length === 0 ? (
          matchCats ? (
            <>
              <div></div>
              <div className="flex flex-col p-2 items-center">
                <p className="p-2 font-bold">
                  Use some filters to find some kitties!
                </p>
                <img src={runCat} alt="running kitty" />
              </div>
              <div></div>
            </>
          ) : (
            <>
              <div></div>
              <div className="flex flex-col p-2 items-center">
                <p className="p-2 font-bold">
                  Sorry no matching kitties, reset to try again
                </p>
                <img src={runCat} alt="running kitty" />
              </div>
              <div></div>
            </>
          )
        ) : filteredCats.length === 0 ? (
          cats.map((cat) => {
            return (
              <div
                key={cat.name}
                className="m-2 flex bg-teal-300 rounded-md p-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 hover:bg-teal-900 hover:text-white hover:shadow-2xl duration-300"
              >
                <img
                  className="rounded-lg w-1/2"
                  src={cat.image_link}
                  alt={cat.name}
                />
                <footer className="m-2">
                  <h2>{cat.name}</h2>
                  <h4>Origin: {cat.origin}</h4>
                  <h6>Shedding: {cat.shedding}</h6>
                  <h6>Playfulness: {cat.playfulness}</h6>
                </footer>
              </div>
            );
          })
        ) : (
          filteredCats.map((cat) => {
            return (
              <div
                key={cat.name}
                className="m-2 flex bg-teal-300 rounded-md p-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 hover:bg-teal-900 hover:text-white hover:shadow-2xl duration-300"
              >
                <img
                  className="rounded-lg w-1/2"
                  src={cat.image_link}
                  alt={cat.name}
                />
                <footer className="m-2">
                  <h2>{cat.name}</h2>
                  <h4>Origin: {cat.origin}</h4>
                  <h6>Shedding: {cat.shedding}</h6>
                  <h6>Playfulness: {cat.playfulness}</h6>
                </footer>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Filters;

// (
//           cats.map((cat) => {
//             return (
//               <div
//                 key={cat.name}
//                 className="m-2 flex bg-teal-300 rounded-md p-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 hover:bg-teal-900 hover:text-white hover:shadow-2xl duration-300"
//               >
//                 <img
//                   className="rounded-lg w-1/2"
//                   src={cat.image_link}
//                   alt={cat.name}
//                 />
//                 <footer className="m-2">
//                   <h2>{cat.name}</h2>
//                   <h4>Origin: {cat.origin}</h4>
//                   <h6>Shedding: {cat.shedding}</h6>
//                   <h6>Playfulness: {cat.playfulness}</h6>
//                 </footer>
//               </div>
//             );
//           })
//         )
