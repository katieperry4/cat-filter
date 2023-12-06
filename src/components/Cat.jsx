import React from "react";

const Cat = ({ image, name }) => {
  return (
    <>
      <div>
        <img src={image} alt={name} />
      </div>
      <div>
        <footer>
          <h5>{name}</h5>
        </footer>
      </div>
    </>
  );
};

export default Cat;
