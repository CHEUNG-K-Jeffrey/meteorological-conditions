const clockElement = document.querySelector("#clock-time");

function runClock() {
  const locale = (navigator && navigator.language) || "en-US";

  const timeOptions = {
    timeStyle: 'medium'
  };

  const time = (new Date()).toLocaleString(locale, timeOptions);
  clockElement.textContent = `${time}`;
}

setInterval(runClock, 1000);

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

let temperaturePage = document.querySelector("#temperature");
let tempData = document.createElement("p");
fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m").then(response => {
  if (!response.ok) {
    throw new Error("Request failed");
  }
  return response.json();
}).then(data => {
  tempData.innerText = JSON.stringify(data);
  return tempData;
}).catch(error => {
  tempData.innerText = error;
  return tempData;
}).finally(() => {
  temperaturePage.appendChild(tempData);
})

let humidityPage = document.querySelector("#relative-humidity");
let humidityData = document.createElement("p");
fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=relative_humidity_2m").then(response => {
  if (!response.ok) {
    throw new Error("Request failed");
  }
  return response.json();
}).then(data => {
  humidityData.innerText = JSON.stringify(data);
  return tempData;
}).catch(error => {
  humidityData.innerText = error;
  return tempData;
}).finally(() => {
  humidityPage.appendChild(humidityData);
})