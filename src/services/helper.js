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
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
  window.location.reload(true);
};

export { formatInt, formatFloat, formatVariation, deleteWorker };
