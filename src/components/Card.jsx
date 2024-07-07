const Card = ({ mainHeading, number, unit, icon }) => {
  return (
    <div className="h-48 w-56 rounded-3xl py-2 px-2 bg-white dark:bg-[#0a0a0a] flex justify-center items-center gap-2">
      <div className="flex justify-end items-end h-full pl-2">
        <img
          width="124px"
          height="124px"
          src={`/icons/${icon}.png`}
          alt="weatherIcon"
        />
      </div>
      <div className="h-full flex flex-col items-end justify-start pr-1">
        <h3 className="text-xl font-medium text-right ">{mainHeading}</h3>
        <h4 className="text-3xl font-semibold">{number}</h4>
        <p className="text-lg font-normal">{unit}</p>
      </div>
    </div>
  );
};

export default Card;
