import { ctoF } from "../assets/converts";
const CurrTemp = ({
  city,
  country,
  temperature,
  feels,
  desc,
  icon,
  unitSystem,
}) => {
  return (
    <div className="lg:h-[100%] lg:w-1/3 py-4 px-2 flex flex-col overflow-x-hidden justify-center items-center">
      <h1 className="text-4xl font-semibold">
        {city},{country}
      </h1>
      <p className="text-lg leading-none tracking-wide">{desc}</p>
      <img
        width="300px"
        height="300px"
        src={`/icons/${icon}.svg`}
        alt="weatherIcon"
      />
      <h1 className="text-5xl font-semibold">
        {unitSystem === "metric"
          ? Math.round(temperature)
          : Math.round(ctoF(temperature))}
        °{unitSystem === "metric" ? "C" : "F"}
      </h1>
      <p className="text-lg leading-none tracking-wide">
        feels like{" "}
        {unitSystem === "metric" ? Math.round(feels) : Math.round(ctoF(feels))}°
        {unitSystem === "metric" ? "C" : "F"}
      </p>
    </div>
  );
};

export default CurrTemp;
