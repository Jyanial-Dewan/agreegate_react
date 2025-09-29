export const convertDate = (isoDateString: Date | undefined) => {
  if (isoDateString) {
    const date = new Date(isoDateString);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  } else {
    return "Null";
  }
};
