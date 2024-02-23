const baseURL = "https://api.open-meteo.com";
const location = "latitude=52.52&longitude=13.41";

const generatePageData = (elementSelection, query) => {
  const page = document.querySelector(elementSelection);
  const pageData = document.createElement("p");
  fetch(`${baseURL}/v1/forecast?${location}${query}`).then(response => {
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return response.json();
  }).then(data => {
    pageData.innerText = JSON.stringify(data);
  }).catch(error => {
    pageData.innerText = error;
  }).finally(() => {
    page.appendChild(pageData);
  })
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

generatePageData("#temperature", "&hourly=temperature_2m");
generatePageData("#relative-humidity", "&hourly=relative_humidity_2m")