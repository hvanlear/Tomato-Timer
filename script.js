const durationInput = document.querySelector("#duration");
const startBtn = document.querySelector("#start");
const pauseBtn = document.querySelector("#pause");
const resetBtn = document.querySelector("#reset");
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let duration;
const timer = new Timer(durationInput, startBtn, pauseBtn, {
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onComplete() {
    console.log("timer is completed");
    promdromoCount();
  },
});

function promdromoCount() {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  if (localStorage.promdromo) {
    localStorage.promdromo = Number(localStorage.promdromo) + 1;
  } else {
    localStorage.promdromo = 1;
  }
  document.querySelector(
    ".pomCounter"
  ).innerHTML = `Total Poms:  ${localStorage.promdromo} on ${date}`;
}

resetBtn.addEventListener("click", () => {
  location.reload();
});
