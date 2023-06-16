const computeStats = (notes) => {
  console.log("computeStats : ", notes.toString());
  notes.sort((a, b) => (a.brute < b.brute ? 1 : -1));
  let smallPair = notes[0];
  //console.log("smallPair=", smallPair);
  let bigPair = notes[notes.length - 1];
  //console.log("bigPair=", bigPair);
  let x1 = smallPair.brute;
  //console.log("x1=", x1);
  let y1 = smallPair.harmonisee / 10 - 10;
  //console.log("y1=", y1);
  let x2 = bigPair.brute;
  //console.log("x2=", x2);
  let y2 = bigPair.harmonisee / 10 - 10;
  //console.log("y2=", y2);
  let ecartType = (x1 - x2) / (y1 - y2);
  let moyenne = x1 - y1 * ecartType;
  let stats = { moyenne: moyenne, ecartType: ecartType };
  console.log("stats=", stats);
  return stats;
};

export { computeStats };
