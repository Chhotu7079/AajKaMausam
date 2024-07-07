import WeekCard from "./WeekCard";
import { ctoF } from "../assets/converts";

const WeekTemp = ({ futureWeather, unitSystem }) => {
  return (
    <div className=" w-[70%] lg:w-full h-full flex flex-wrap justify-evenly items-start gap-3">
      {futureWeather.map((day, index) => {
        const temp = day?.temp;
        if (temp === undefined) return null;
        return (
          <WeekCard
            date={day?.date}
            icon={day?.icon}
            temp={
              unitSystem === "metric"
                ? Math.round(day?.temp)
                : Math.round(ctoF(day?.temp))
            }
            key={index}
            unit={`°${unitSystem === "metric" ? "C" : "F"}`}
          />
        );
      })}
    </div>
  );
};

export default WeekTemp;
