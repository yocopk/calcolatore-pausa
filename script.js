function calculateTime() {
  const breakLength = sanitize(
    document.getElementById("select-break-length").value
  );
  const currentTime = new Date();

  // Non vogliamo farci rubare circa mezzo minuto dalla pausa
  // quindi arrotondiamo al minuto dopo (grazie Luca "Iagan" Carturan)
  const secondsToRoundUp = 20;
  if (currentTime.getSeconds() >= secondsToRoundUp) {
    currentTime.setSeconds(currentTime.getSeconds() + secondsToRoundUp);
  }
  const futureTime = new Date(currentTime);
  futureTime.setMinutes(futureTime.getMinutes() + breakLength);

  const options = { hour: "numeric", minute: "numeric" };

  document.getElementById("display-input-time").textContent =
    currentTime.toLocaleTimeString("it-IT", options);
  document.getElementById("display-future-time").textContent =
    futureTime.toLocaleTimeString("it-IT", options);

  function sanitize(code) {
    if(code >= 15 && code <= 30 && code % 5 == 0) {
      return parseInt(code);
    }
    alert("Non fare il furbo!");
    return 45;
  }
}

// Nino è stato qui
