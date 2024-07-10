async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

const dataPromise = fetchData("user_data.json");

dataPromise
    .then((data) => {
        dataDocumentMeta(data);
        dataDisplay(data);
        dataCountdown(data);
    })
    .catch((error) => {
        window.location.hostname == "127.0.0.1" ? console.error("Error fetching data:", error) : null;
    });

dataDocumentMeta = (data) => {
    document.title = data.document.title;
    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content = data.meta.description;
    document.getElementsByTagName("head")[0].appendChild(meta);
};

dataDisplay = (data) => {
    const message = document.querySelector(`[data-script="message"]`);
    const scheduled = document.querySelector(`[data-script="scheduled"]`);
    const email = document.querySelector(`[data-script="email"]`);
    const credit = document.querySelector(`[data-script="credit"]`);
    const site = document.querySelector(`[data-script="site"]`);
    const completed = document.querySelector(`[data-script="completed"]`);

    message.outerHTML = data.header.message;
    scheduled.outerHTML = data.header.scheduled;
    email.setAttribute("href", `mailto:${data.main.email}`);
    credit.outerHTML = data.main.credit;
    site.outerHTML = data.footer.site;
    completed.outerHTML = data.footer.completed;
};

dataCountdown = (data) => {
    updateCountdown = () => {
        const now = new Date();
        const targetDate = new Date(data.countdown.time);
        const distance = targetDate.getTime() - now.getTime();

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        days = days.toString().padStart(2, "0");
        hours = hours.toString().padStart(2, "0");
        minutes = minutes.toString().padStart(2, "0");
        seconds = seconds.toString().padStart(2, "0");

        const countdownString = days + ":" + hours + ":" + minutes + ":" + seconds;

        const countdown = document.querySelector(`[data-script="countdown"]`);
        countdown.innerHTML = countdownString;

        if (distance < 0) {
            clearInterval(timer);
            countdown.innerHTML = "Time Expired";
        }
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
};
