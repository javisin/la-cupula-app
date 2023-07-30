export const convertDateToTimeString = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const convertDateToDateString = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};
