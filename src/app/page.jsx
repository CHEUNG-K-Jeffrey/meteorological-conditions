"use client"
import React, { useState, useEffect } from 'react';

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
      setTime((new Date()).getTime())
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>{time}</div>
  )
}

export default function HomePage() {
  return (
    <main className="flex flex-col h-screen">
      <div id="home-page" className="p-20">
        <Location></Location>
        <Clock></Clock>
      </div>
    </main>
  )
}
