// parse avec mois complet 
export const dateParser = (num) => {
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let timestamp = Date.parse(num);
  let date = new Date(timestamp).toLocaleDateString("fr-BE", options);
  return date.toString();
};


// parse avec mois short et heure pour les posts
export const dateParser2 = (num) => {
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour:"2-digit",
    minute:"2-digit",
    weekday:"long"
  };
  let timestamp = Date.parse(num);
  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
  return date.toString();
};



export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
