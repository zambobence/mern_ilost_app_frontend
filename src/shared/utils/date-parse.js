function dateParser(dateString) {
    if (dateString === ""){
        return false
    }

  // Parse the input date string into a Date object
  const [year, month, day] = dateString.split("-").map(Number);
  const inputDate = new Date(year, month - 1, day); // Month is zero-indexed in Date constructor

  // Get the current date
  const currentDate = new Date();

  // Compare the input date with the current date
  let isBefore = inputDate < currentDate;
  return isBefore
}

export default dateParser