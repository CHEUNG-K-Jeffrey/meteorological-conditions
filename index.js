"use strict";
const baseURL = "https://api.open-meteo.com";
const location = "latitude=52.52&longitude=13.41";

const generatePageData = (elementSelection, query) => {
  const page = document.querySelector(elementSelection);
  const pageData = document.createElement("table");
  fetch(`${baseURL}/v1/forecast?${location}&${Object.keys(query)[0]}=${Object.values(query)[0]}`).then(response => {
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return response.json();
  }).then(data => {
    for (let i = 0; i < data.hourly.time.length; i++) {
      let newRow = document.createElement("tr")
      newRow.innerHTML = `<td>${data.hourly.time[i]}</td><td>${data.hourly[Object.values(query)[0]][i]}</td>`;
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

  // Unhide homepage without hash
  if (hash === "" ) {
    document.querySelector("#home").removeAttribute("style");
  }

  // Otherwise unhide any other valid page
  if (document.querySelector(hash)) {
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

if ("serviceWorker" in navigator) {
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