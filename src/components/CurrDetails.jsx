import { ctoF, degToCompass } from "../assets/converts";
import { getVisibility, getWindSpeed } from "../assets/functions";
import Card from "./Card";

const CurrDetails = ({ weather, unitSystem }) => {
  return (
    <div className="w-full flex flex-wrap justify-evenly items-start pt-2 pl-4 gap-x-4 gap-y-2">
      <Card
        mainHeading="Humidity"
        number={weather?.main?.humidity}
        icon="humidity"
        unit={"%"}
      />
      <Card
        mainHeading="Maximum Temp"
        number={
          unitSystem === "metric"
            ? Math.round(weather?.main?.temp_max)
            : Math.round(ctoF(weather?.main?.temp_max))
        }
        icon="sunrise"
        unit={`°${unitSystem === "metric" ? "C" : "F"}`}
      />
      <Card
        mainHeading="Minimum Temp"
        number={
          unitSystem === "metric"
            ? Math.round(weather?.main?.temp_min)
            : Math.round(ctoF(weather?.main?.temp_min))
        }
        icon="sunset"
        unit={`°${unitSystem === "metric" ? "C" : "F"}`}
      />
      <Card
        mainHeading="Visibility"
        number={getVisibility(unitSystem, weather?.visibility)}
        icon="binocular"
        unit={unitSystem === "metric" ? "km" : "miles"}
      />
      <Card
        mainHeading="Wind speed"
        number={getWindSpeed(unitSystem, weather?.wind?.speed)}
        icon="wind"
        unit={unitSystem === "metric" ? "m/s" : "m/h"}
      />
      <Card
        mainHeading="Wind direction"
        number={degToCompass(weather?.wind?.deg)}
        icon="compass"
      />
    </div>
  );
};

export default CurrDetails;
