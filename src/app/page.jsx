"use client"
import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';

function Location() {
  return (
    <>
      <div>Location</div>
      <input type="text" placeholder="Location" value="San Francisco, Ca" disabled></input>
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
    <div>{time}</div>
  )
}

export default function HomePage() {
  return (
    <main className="grid grid-cols-1 h-screen">
      <div id="home-page" className="flex flex-col flex-auto p-10 sm:p-20">
        <Location></Location>
        <Clock></Clock>
      </div>
      <NavigationBar></NavigationBar>
    </main>
  )
}
