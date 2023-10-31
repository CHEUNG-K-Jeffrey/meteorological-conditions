"use client"
import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';

function Location() {
  return (
    <>
      <div className="text-4xl p-2">Location</div>
      <input className="text-3xl p-4 rounded-full" type="text" placeholder="Location" value="San Francisco, Ca" disabled></input>
    </>
  )
}

function Clock() {
  const [time, setTime] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((new Date()).toLocaleString('en-US', {timeZone: 'America/Los_Angeles', hour12: false, timeStyle: 'short'}))
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="clock" className="flex justify-center">
      <div className="text-9xl">{time}</div>
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="grid grid-rows-[repeat(10,_minmax(0,_1fr))] h-screen">
      <div id="home-page" className="flex flex-col flex-auto p-10 sm:p-20">
        <Location></Location>
        <Clock></Clock>
      </div>
      <NavigationBar></NavigationBar>
    </main>
  )
}
