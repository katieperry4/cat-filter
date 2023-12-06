import catImg from "../assets/cat.svg";
const Hero = () => {
  return (
    <div className="flex flex-col items-center bg-teal-500 rounded-md p-4 md:flex-row">
      <img
        className="w-1/2 p-2"
        src={catImg}
        alt="a cute little black cat with an orange collar"
      />
      <div>
        <h2 className="text-3xl">
          Have you ever wanted to (kind of) peruse cat breeds?
        </h2>
        <h3 className="text-xl py-2">
          Look no further, explore some cat breeds with limited filters and
          information!
        </h3>
      </div>
    </div>
  );
};

export default Hero;
