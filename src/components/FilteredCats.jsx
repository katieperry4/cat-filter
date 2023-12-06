import React from "react";
import Filters from "./Filters";
import Cat from "./Cat";

const FilteredCats = ({ cats }) => {
  return (
    <div>
      {/* {cats.map((cat) => {
        return <Cat key={cat.name} {...cat}></Cat>;
      })} */}
    </div>
  );
};

export default FilteredCats;
