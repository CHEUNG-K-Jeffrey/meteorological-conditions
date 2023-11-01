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