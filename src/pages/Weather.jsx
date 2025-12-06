import React, { useEffect, useState } from "react";
import { MapPin, Search, Wind, CloudRain, Thermometer, Droplets } from "lucide-react";

const Weather = () => {
  const [inputVal, setInputVal] = useState("");
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
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
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${inputVal}&aqi=no`
      );
      const json = await data.json();
      setWeather(json);
      setLoading(false);
      setInputVal("");
    } catch (err) {
      setError("Error while fetching the data");
      setLoading(false);
      setInputVal("");
    }
  };

  const getWeatherAuto = async () => {
    if (location) {
      const data = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.coords?.latitude},${location.coords.longitude}&aqi=no`
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
    <div className="max-h-9/12 bg-linear-to-br from-green-100 to-teal-200 flex items-center justify-center p-6 rounded-xl">
      
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 space-y-6">

        {/* Input Section */}
        <div className="flex items-center gap-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

            <input
              type="text"
              placeholder="Enter city name"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && getWeather()}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <button
            onClick={getWeather}
            className="px-5 py-3 bg-teal-600 text-white font-medium rounded-xl shadow hover:bg-teal-800 transition"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        ) : !weather ? (
          <h1 className="text-center text-gray-600 text-lg">
            Search weather of any location
          </h1>
        ) : (
          <>
            {/* Location Info */}
            <div className="text-center">
              <div className="flex justify-center items-center gap-2 text-gray-700">
                <MapPin size={20} />
                <h2 className="text-xl font-semibold">
                  {weather?.location?.name}, {weather?.location?.region}
                </h2>
              </div>
            </div>

            {/* Temp + Icon */}
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-5xl font-bold text-teal-600 flex items-center gap-2">
                <Thermometer size={40} />
                {weather?.current?.temp_c}°C
              </h1>
              <img
                src={weather?.current?.condition?.icon}
                alt="condition"
                className="w-20 h-20"
              />
              <p className="text-gray-600 text-lg">
                {weather?.current?.condition?.text}
              </p>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-3 gap-4 text-gray-700 pt-6">

              <div className="flex flex-col items-center bg-white rounded-xl p-4 shadow">
                <CloudRain size={28} className="text-teal-500" />
                <p className="font-medium">{weather?.current?.precip_mm} mm</p>
                <span className="text-sm text-gray-500">Precipitation</span>
              </div>

              <div className="flex flex-col items-center bg-white rounded-xl p-4 shadow">
                <Wind size={28} className="text-teal-500" />
                <p className="font-medium">{weather?.current?.wind_kph} kph</p>
                <span className="text-sm text-gray-500">Wind Speed</span>
              </div>

              <div className="flex flex-col items-center bg-white rounded-xl p-4 shadow">
                <Droplets size={28} className="text-teal-500"/>
                <p className="font-medium">{weather?.current?.humidity}%</p>
                <span className="text-sm text-gray-500">Humidity</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
