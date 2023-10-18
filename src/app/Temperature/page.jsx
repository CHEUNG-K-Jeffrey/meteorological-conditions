"use client"
import React, { useState, useEffect } from 'react';

function Temperature() {
  const [data, setData] = useState(Infinity);

  // useEffect(() => {
  //   fetch("https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current=temperature_2m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data.current.temperature_2m);
  //     })
  // })

  return (
    <>
      <div id="temperature">Current Temperature:<br></br>{data}°</div>
      <div id="attribution">
        <a class="text-blue-500 underline" href="https://open-meteo.com/" rel="nofollow">Weather data by Open-Meteo.com</a> is licensed under <a class="text-blue-500 underline" rel="nofollow" href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
      </div>
    </>
  )
}

export default function TemperaturePage() {
  return (
    <main className="flex flex-col h-screen">
      <div id="temperature-page" className="p-20">
        <Temperature></Temperature>
      </div>
    </main>
  )
}