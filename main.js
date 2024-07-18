updateCountdown = () => {
    const completedTime = "November 2, 2024";

    const now = new Date();
    const targetDate = new Date(completedTime);
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

document.title = "Under Maintenance";

const schemeBtn = document.querySelector(`[data-script="scheme"]`);
schemeBtn.addEventListener("click", function () {
    document.body.classList.toggle("adjust");
});
