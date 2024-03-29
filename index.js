"use strict";
const DEBUG = false;
const baseURL = "https://api.open-meteo.com";
const location = "latitude=37.77493&longitude=-122.41942";

const generatePageData = (elementSelection, query) => {
  const page = document.querySelector(elementSelection);
  const pageData = document.createElement("table");
  document.querySelector(`${elementSelection} > table`)?.remove();

  fetch(`${baseURL}/v1/forecast?${location}&${Object.keys(query)[0]}=${Object.values(query)[0]}&forecast_days=1`).then(response => {
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return response.json();
  }).then(data => {
    for (let i = 0; i < data.hourly.time.length; i++) {
      let newRow = document.createElement("tr")
      newRow.innerHTML = `<td>${data.hourly.time[i]}</td><td>${data.hourly[Object.values(query)[0]][i].toFixed(1)}°</td>`;
      pageData.appendChild(newRow);
    }
  }).catch(error => {
    pageData.innerText = error;
  }).finally(() => {
    page.appendChild(pageData);
  })
}

const hideAllPages = () => {
  const pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

const navigatePages = () => {
  let hash = window.location.hash;

  // Hide all pages
  if (hash === "" || document.querySelector(hash)) {
    hideAllPages();
  }

  // Unhide page
  if (hash === "") {
    document.querySelector("#home").removeAttribute("style");
  } else if (document.querySelector(hash)) {
    document.querySelector(hash).removeAttribute("style");
  }

  // Generate the data when navigating to the page
  switch (hash) {
    case "#temperature":
      generatePageData(hash, { hourly: "temperature_2m" });
      break;
    case "#relative-humidity":
      generatePageData(hash, { hourly: "relative_humidity_2m" });
      break;
  }
}

const runClock = () => {
  const clockElement = document.querySelector("#clock-time");
  const locale = (navigator && navigator.language) || "en-US";

  const timeOptions = {
    timeStyle: 'medium'
  };

  const time = (new Date()).toLocaleString(locale, timeOptions);
  clockElement.textContent = `${time}`;
}

if (DEBUG === true && "serviceWorker" in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register("/sw.js").then(
    (registration) => {
      console.log("Service worker registration succeeded:", registration);
    },
    (error) => {
      console.error(`Service worker registration failed: ${error}`);
    },
  );
} else {
  console.error("Service workers are not supported.");
}

setInterval(runClock, 1000);

window.addEventListener('hashchange', navigatePages);

hideAllPages();
navigatePages();