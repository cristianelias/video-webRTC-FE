const addLeadingZeroIfNecessary = (num: number) => (num < 10 ? `0${num}` : num);

// This function takes an UTC timestamp string and returns a string in the format of hh:mm
export const parseTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${addLeadingZeroIfNecessary(date.getMinutes())}`;
};
