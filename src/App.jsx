import { useState, useEffect } from "react";
import axios from "axios";

import { config } from "../apikey.js";

import { IoMdSearch } from "react-icons/io";
import { BsWater, BsThermometer } from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";

const APIkey = config.apikey;

function App() {
  const [location, setLocation] = useState("New York");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [date, setDate] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [temp, setTemp] = useState("");
  const [feelslike, setFeelsLike] = useState("");
  const [humidity, setHumidity] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    const input = document.querySelector("input");

    input.value = "";
    e.preventDefault();
  };

  useEffect(() => {
    const fetchData = () => {
      const url = `https://api.api-ninjas.com/v1/worldtime?city=${location}`;

      axios
        .get(url, {
          headers: {
            "x-api-key": APIkey,
          },
        })
        .then((res) => {
          setHour(res.data.hour);
          setMinute(res.data.minute);
          setSecond(res.data.second);
          setDate(res.data.date);
          setDayOfWeek(res.data.day_of_week);
        })
        .catch((err) => {
          setErrorMsg(err);
        });
    };
    fetchData();

    const interval = setInterval(fetchData, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [location]);

  useEffect(() => {
    const url = `https://api.api-ninjas.com/v1/weather?city=${location}`;

    axios
      .get(url, {
        headers: {
          "x-api-key": APIkey,
        },
      })
      .then((res) => {
        setTemp(res.data.temp);
        setFeelsLike(res.data.feels_like);
        setHumidity(res.data.humidity);
      })
      .catch((err) => {
        setErrorMsg(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  return (
    <>
      <div className="w-full h-screen bg-gradientBg bg-norepeat bg-cover bg-center flex flex-col  justify-center items-center px-4 py-1 lg:px-0">
        {errorMsg && (
          <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md">{`${errorMsg.response.data.message}`}</div>
        )}
        <form>
          <div className="h-full relative flex items-center justify-between p-2">
            <input
              onChange={(e) => handleInput(e)}
              className="flex bg-transparent ouline-none placeholder:text-black text-gray text-[15px] font-light pl-6 h-full border-b-2 border-black"
              type="text"
              placeholder="Type city here"
            />
            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-[#ecf6ff] hover:bg-[#85b7ff] w-20 h-10 rounded-full flex justify-center items-center transition"
            >
              <IoMdSearch className="text-2xl text-black" />
            </button>
          </div>
        </form>
        <div className="w-full max-w-[450px] bg-white/30 min-h-[580px] text-black backdrop-blur-[32px] rounded-[32px] py-8 px-6">
          <div>
            <div className="flex items-center justify-center text-3xl py-2 font-semibold capitalize">
              {location}
            </div>
            <div>
              <div className="flex items-center gap-x-5 font-semibold text-6xl justify-center py-5 ">
                {hour} : {minute} :{second}
              </div>
              <div className="flex items-center justify-center py-2 font-semibold">
                {date} | {dayOfWeek}
              </div>
            </div>
          </div>
          <hr className="w-full h-1 bg-black mt-8 mb-8" />
          <div className="flex justify-center items-center">
            <div className="text-[120px] leading-none font-light pt-5">
              {temp}
            </div>
            <div className="text-6xl">
              <TbTemperatureCelsius />
            </div>
          </div>
          <div className="flex justify-between mt-10">
            <div className="flex items-center gap-x-2">
              <div className="text-[20px]">
                <BsThermometer />
              </div>
              <div>
                Feels like
                <span className="ml-2 flex-1">{feelslike} °C</span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="text-[20px]">
                <BsWater />
              </div>
              <div className="flex">
                Humidity
                <div className="flex ml-2">{humidity} %</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
