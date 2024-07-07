import { useEffect, useState } from "react";
import CurrDetails from "./components/CurrDetails";
import CurrTemp from "./components/CurrTemp";
import WeekTemp from "./components/WeekTemp";
import { OPENWEATHER_API_KEY } from "./assets/constants.jsx";
const emptyboxStyles =
  "h-40 w-52 rounded-3xl py-2 px-2 bg-white dark:bg-[#0a0a0a] flex justify-center items-center gap-2";

const App = () => {
  const [cityName, setCityName] = useState("Raipur");
  const [weatherData, setWeatherData] = useState();
  const [futureDetail, setFutureDetail] = useState();
  const [apiFetch, setApiFetch] = useState(true);
  const [unitSystem, setUnitSystem] = useState("metric");

  const [themeMode, setThemeMode] = useState("light");
  useEffect(() => {
    document.querySelector("html")?.classList.remove("dark", "light");
    document.querySelector("html")?.classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    const updateIndices = async (data) => {
      let indices = new Array(5);
      const currdate =
        data?.list[0]?.dt_txt.substr(5, 2) + data?.list[0]?.dt_txt.substr(8, 2);
      let ind = 0;
      for (let i = 1; i < 40; i++) {
        const date =
          data?.list[i]?.dt_txt.substr(5, 2) +
          data?.list[i]?.dt_txt.substr(8, 2);
        const timezone = data?.list[i]?.dt_txt.substr(11, 2);
        if (date > currdate && timezone == "12") {
          indices[ind] = i;
          ind++;
        }
      }
      return indices;
    };
    const updateState = async (data) => {
      const days = [];
      const indices = await updateIndices(data);

      for (let i = 0; i < 5; i++) {
        days.push({
          date: data?.list[indices[i]]?.dt_txt,
          desc: data?.list[indices[i]]?.weather[0]?.description,
          icon: data?.list[indices[i]]?.weather[0]?.icon,
          temp: data?.list[indices[i]]?.main?.temp,
        });
      }
      return days;
    };
    const getFutureData = async () => {
      const URL = ` https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&cnt=40&appid=${OPENWEATHER_API_KEY}`;
      const result = await fetch(URL);
      const data = await result.json();
      const updatedState = await updateState(data);
      setFutureDetail(updatedState);
      setCityName("");
    };
    const getData = async () => {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${OPENWEATHER_API_KEY}`;
      const result = await fetch(URL);
      const data = await result.json();
      setWeatherData({ ...data });
    };

    if (cityName != "") {
      getData();
      getFutureData();
    }
  }, [apiFetch]);

  const changeSystem = () =>
    unitSystem == "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return weatherData && !weatherData?.message ? (
    <div className="bg-[#F8D8F7] dark:bg-[#573656] dark:text-white min-h-screen flex flex-col justify-evenly items-center gap-2 py-6">
      <div className="max-w-[70%] lg:h-[480px] md:w-full lg:min-w-[1000px] lg:max-w-[1000px] xl:min-w-[1100px] xl:max-w-[1100px] dark:bg-[#0a0a0a] bg-white shadow-2xl shadow-[#e3a1e1] dark:shadow-[#f767f4] rounded-3xl flex flex-col lg:flex-row items-center justify-center overflow-hidden">
        <CurrTemp
          city={weatherData?.name}
          country={weatherData?.sys?.country}
          temperature={weatherData?.main?.temp}
          feels={weatherData?.main?.feels_like}
          desc={weatherData?.weather[0]?.main}
          icon={weatherData?.weather[0]?.icon}
          unitSystem={unitSystem}
        />
        <div className="h-full w-full py-4 px-2 bg-[#EAEAEB]  dark:bg-[#232121] flex flex-col justify-start items-center">
          <div className="h-[10%] w-[95%] flex flex-col sm:flex-row justify-between items-center gap-2 ">
            <input
              type="search"
              className="py-2 px-2 rounded-3xl outline-none dark:bg-[#0a0a0a]"
              placeholder="Search city.."
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              onKeyDown={(e) => {
                e.keyCode === 13 && setApiFetch(!apiFetch);
              }}
            />
            <div className="w-full md:w-[25%] flex h-full justify-center sm:justify-end items-center px-2">
              <button
                onClick={() => {
                  setThemeMode(themeMode === "light" ? "dark" : "light");
                }}
              >
                {themeMode === "light" ? (
                  <img height="32px" width="32px" src="/icons/01n.svg" />
                ) : (
                  <img height="32px" width="32px" src="/icons/01d.svg" />
                )}
              </button>
              <label className="flex cursor-pointer select-none w-16 h-full items-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="peer absolute left-1/2 -translate-x-1/2 w-full h-full appearance-none rounded-md"
                    onClick={() => {
                      changeSystem();
                    }}
                  />
                  <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-[#F8D8F7] dark:bg-[#0a0a0a] rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 after:content-center"></span>
                </div>
              </label>
            </div>
          </div>
          <CurrDetails weather={weatherData} unitSystem={unitSystem} />
        </div>
      </div>
      {futureDetail && (
        <div className="sm:w-full lg:min-w-[1000px] lg:max-w-[1000px] xl:min-w-[1100px] xl:max-w-[1100px] rounded-3xl flex items-center justify-center overflow-x-hidden">
          <WeekTemp futureWeather={futureDetail} unitSystem={unitSystem} />
        </div>
      )}
    </div>
  ) : weatherData && weatherData?.message ? (
    <div className="bg-[#F8D8F7] dark:bg-[#573656] dark:text-white min-h-screen flex flex-col justify-evenly items-center gap-2 py-6">
      <div className="max-w-[70%] lg:h-[480px] md:w-full lg:min-w-[1000px] lg:max-w-[1000px] xl:min-w-[1100px] xl:max-w-[1100px] dark:bg-[#0a0a0a] bg-white shadow-2xl shadow-[#e3a1e1] dark:shadow-[#f767f4] rounded-3xl flex flex-col lg:flex-row items-center justify-center overflow-hidden">
        <div className="h-full min-w-[300px]" />
        <div className="h-full w-full py-4 px-2 bg-[#EAEAEB]  dark:bg-[#232121] flex flex-col justify-start items-center">
          <div className="h-[10%] w-[95%] flex flex-col sm:flex-row justify-between items-center gap-2 ">
            <input
              type="search"
              className="py-2 px-2 rounded-3xl outline-none dark:bg-[#0a0a0a]"
              placeholder="Search city.."
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              onKeyDown={(e) => {
                e.keyCode === 13 && setApiFetch(!apiFetch);
              }}
            />
          </div>
          <p>City not found!</p>
          <div className="max-w-full flex flex-wrap justify-center items-start py-2 pl-4 gap-2">
            {Array(6)
              .fill(1)
              .map((index) => {
                return <div className={emptyboxStyles} key={index} />;
              })}
          </div>
        </div>
      </div>
      <div className=" sm:w-full lg:min-w-[1000px] lg:max-w-[1000px] xl:min-w-[1100px] xl:max-w-[1100px] rounded-3xl hidden lg:flex items-center justify-center overflow-x-hidden">
        <div className="w-full h-full flex flex-wrap justify-evenly items-start gap-3">
          {Array(5)
            .fill(1)
            .map((index) => {
              return <div className={emptyboxStyles} key={index} />;
            })}
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen w-full text-center text-2xl ">
      Loading data ...
    </div>
  );
};

export default App;
