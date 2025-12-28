import React, { useEffect, useState } from "react";
import {
  MapPin,
  Search,
  Wind,
  CloudRain,
  Thermometer,
  Droplets,
} from "lucide-react";

const Weather = () => {
  const [inputVal, setInputVal] = useState("");
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(false);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  function showLocation(position) {
    setLocation(position);
  }

  async function getLocation() {
    navigator.geolocation.getCurrentPosition(showLocation);
  }

  const getWeather = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${inputVal}&aqi=no`
      );
      if (!data.ok) {
        setError(true);
      }
      const json = await data.json();
      setWeather(json);
      setLoading(false);
      setInputVal("");
    } catch (err) {
      setLoading(false);
      setInputVal("");
    }
  };

  const getWeatherAuto = async () => {
    if (location) {
      const data = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.coords?.latitude},${location.coords.longitude}&aqi=no`
      );
      const json = await data.json();
      setWeather(json);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getWeatherAuto();
  }, [location]);

  return (
    <div className="bg-linear-to-br from-green-100 dark:from-gray-600 to-teal-200 dark:to-gray-600 flex items-center justify-center p-3 sm:p-4 rounded-xl">
      <div className="w-full max-w-md bg-white/85 dark:bg-gray-500 backdrop-blur-md shadow-lg rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
        {/* Input Section */}
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <Search
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />

            <input
              type="text"
              placeholder="Enter city"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && getWeather()}
              className="w-full pl-8 sm:pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 dark:text-gray-200 outline-none text-xs sm:text-sm"
            />
          </div>

          <button
            onClick={getWeather}
            className="px-3 sm:px-4 py-2 bg-teal-600 dark:bg-teal-700 text-white dark:text-gray-200 text-xs sm:text-sm font-medium rounded-lg shadow hover:bg-teal-700 dark:hover:bg-teal-800 transition"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
          </div>
        ) : !weather ? (
          <h1 className="text-center text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
            Search weather of any city
          </h1>
        ) : !error ? (
          <>
            {/* Location Info */}
            <div className="text-center">
              <div className="flex justify-center items-center gap-1 text-gray-700 dark:text-gray-300">
                <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                <h2 className="text-base sm:text-lg font-semibold">
                  {weather?.location?.name}, {weather?.location?.region}
                </h2>
              </div>
            </div>

            {/* Temp + Icon */}
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-teal-600 dark:text-teal-500 flex items-center gap-1">
                <Thermometer size={24} className="sm:w-[30px] sm:h-[30px]" />
                {weather?.current?.temp_c}°C
              </h1>
              <img
                src={weather?.current?.condition?.icon}
                alt="condition"
                className="w-14 h-14 sm:w-16 sm:h-16"
              />
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                {weather?.current?.condition?.text}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-gray-700 pt-2 sm:pt-3">
              <div className="flex flex-col items-center bg-white dark:bg-gray-300 rounded-lg p-2 sm:p-3 shadow">
                <CloudRain size={20} className="sm:w-6 sm:h-6 text-teal-500" />
                <p className="font-medium text-xs sm:text-sm">
                  {weather?.current?.precip_mm} mm
                </p>
                <span className="text-xs text-gray-500">Rain</span>
              </div>

              <div className="flex flex-col items-center bg-white dark:bg-gray-300 rounded-lg p-2 sm:p-3 shadow">
                <Wind size={20} className="sm:w-6 sm:h-6 text-teal-500" />
                <p className="font-medium text-xs sm:text-sm">
                  {weather?.current?.wind_kph} kph
                </p>
                <span className="text-xs text-gray-500">Wind</span>
              </div>

              <div className="flex flex-col items-center bg-white dark:bg-gray-300 rounded-lg p-2 sm:p-3 shadow">
                <Droplets size={20} className="sm:w-6 sm:h-6 text-teal-500" />
                <p className="font-medium text-xs sm:text-sm">
                  {weather?.current?.humidity}%
                </p>
                <span className="text-xs text-gray-500">Humidity</span>
              </div>
            </div>
          </>
        ) : <h1 className="text-center text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
            Please write the city name correctly
          </h1>}
      </div>
    </div>
  );
};

export default Weather;
