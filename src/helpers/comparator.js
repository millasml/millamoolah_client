export const mmYYYYComparator = (a, b) => {
    const [aMonth, aYear] = a.split("-");
    const [bMonth, bYear] = b.split("-");
    if (aYear < bYear) {
      return -1;
    } else if (aYear > bYear) {
      return 1;
    } else {
      if (aMonth < bMonth) {
        return -1;
      } else if (aMonth > bMonth) {
        return 1;
      } else {
        return 0;
      }
    }
  };


  export const dateStringComparator = (a, b) => {
    const aDate = new Date(a)
    const bDate = new Date(b)
    if (aDate < bDate) {
      return 1;
    } else if (aDate > bDate) {
      return -1;
    } else {
      return 0;
    }
  };