"use client"
import React, { useState, useEffect } from 'react';
import NavigationBar from '../NavigationBar';

function Temperature() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current=temperature_2m&hourly=temperature_2m&timezone=auto&forecast_days=1")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
  }, [])

  return (
    <div id="temperature-container" className="flex-auto flex flex-col justify-between">
      <div id="current-temperature" className="flex flex-col items-center p-4">
        <span className="text-4xl">Current Temperature:</span><br/>
        <span className="text-5xl">{data ? (data.error ? data.reason : data.current.temperature_2m) : "Null"}°</span>
      </div>

      <div id="temperature-grid" className="grid p-4 gap-4 sm:grid-cols-2 border rounded-3xl border-black">
        {data ? (data.error ? data.reason : data.hourly.time.map((time, index) => {
            return (
                <div key={time} className="flex justify-around text-xl">
                  <div>{time.slice(-5)}</div>
                  <div>{data.hourly.temperature_2m[index]+"°"}</div>
                </div>
            )
          })) : ""}
      </div>

      <div id="attribution" className="text-center text-xs">
        <a className="text-blue-500 underline" href="https://open-meteo.com/" rel="nofollow">Weather data by Open-Meteo.com</a> is licensed under <a className="text-blue-500 underline" rel="nofollow" href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
      </div>
    </div>
  )
}

export default function TemperaturePage() {
  return (
    <main className="grid grid-cols-1 h-screen ">
      <div id="temperature-page" className="flex p-10 sm:p-20 overflow-auto">
        <Temperature></Temperature>
      </div>
      <NavigationBar></NavigationBar>
    </main>
  )
}