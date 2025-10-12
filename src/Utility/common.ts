export const toTitleCase = (str: string) => {
  return str
    .toLowerCase() // first make everything lowercase
    .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize first letter of each word
};

export const pathToTitle = (path: string) => {
  return path
    .replace("/", "") // remove leading slash
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
