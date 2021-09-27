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