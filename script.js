function calculateTime() {
  const inputTime = document.getElementById("input-time").value;
  const [hours, minutes] = inputTime.split(":");

  if (
    hours &&
    minutes &&
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59
  ) {
    const currentTime = new Date();
    const futureTime = new Date(currentTime);
    futureTime.setHours(parseInt(hours));
    futureTime.setMinutes(parseInt(minutes) + 15);

    const options = { hour: "numeric", minute: "numeric" };

    document.getElementById("display-input-time").textContent = inputTime;
    document.getElementById("display-future-time").textContent =
      futureTime.toLocaleTimeString("it-IT", options);
  } else {
    alert("Inserisci un'ora valida nel formato HH:MM.");
  }
}

const inputField = document.getElementById("input-time");
inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    calculateTime();
  }
});
// Nino è stato qui