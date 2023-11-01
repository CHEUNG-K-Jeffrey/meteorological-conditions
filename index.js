const clockElement = document.querySelector("#clock-container");

function runClock() {
    const locale = navigator.language;
    
    const timeOptions = {
        timeStyle: 'medium'
    };

    const time = (new Date()).toLocaleString(locale, timeOptions);
    clockElement.textContent = `${time}`;
}

setInterval(runClock, 1000);