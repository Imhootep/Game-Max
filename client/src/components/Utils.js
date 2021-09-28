
// pour "parser" la date pour membre depuis
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


// pour répondre à la question is empty
export const isEmpty = (value) => {
  // va retourner soit true, soit false à la question isEmpty
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
