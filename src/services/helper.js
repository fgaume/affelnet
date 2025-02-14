const formatFloat = (mynumber) => {
  if (typeof mynumber !== "number") return "?";
  if (mynumber > 0) return parseFloat(mynumber.toFixed(3)).toLocaleString();
  else return "?";
};

const formatInt = (mynumber) => {
  return Math.round(mynumber).toLocaleString();
};

const formatVariation = (mynumber) => {
  const formatted = Math.round(mynumber).toLocaleString();
  return mynumber < 0 ? formatted : "+" + formatted;
};

const deleteWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration
          .unregister()
          .then((success) => {
            if (success) {
              console.log("Service Worker désenregistré avec succès.");
            } else {
              console.warn("Échec du désenregistrement du Service Worker.");
            }
          })
          .catch((error) => {
            console.error(
              "Erreur lors du désenregistrement du Service Worker:",
              error
            );
          });
      }
    });
  } else {
    console.warn(
      "Les Service Workers ne sont pas supportés par ce navigateur."
    );
  }
  window.location.reload(true);
};

const delta = (numberBefore, numberAfter) => {
  const diff = Math.round(numberAfter - numberBefore);
  return formatVariation(diff);
};

export { formatInt, formatFloat, formatVariation, deleteWorker, delta };
