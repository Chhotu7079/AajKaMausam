import { getMonth } from "../assets/functions";

const WeekCard = ({ temp, date, icon, unit }) => {
  const month = getMonth(date?.substr(5, 2));
  const day = date?.substr(8, 2);

  return (
    <div className="h-36 w-48 xl:h-40 xl:w-52 rounded-3xl py-2 px-2 bg-white dark:bg-[#0a0a0a] flex justify-center items-center gap-2">
      <div className="flex justify-end items-end h-full">
        <img
          width="100px"
          height="100px"
          src={`/icons/${icon}.svg`}
          alt="weatherIcon"
        />
      </div>

      <div className="h-full flex flex-col items-end justify-start pr-1">
        <h3 className="text-xl font-medium text-right ">
          {day} {month}
        </h3>
        <h4 className="text-2xl font-semibold">{temp}</h4>
        <p className="text-base font-normal">{unit}</p>
      </div>
    </div>
  );
};

export default WeekCard;
