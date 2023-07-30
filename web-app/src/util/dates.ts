export const convertDateToTimeString = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const convertDateToDateString = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};

export const formatDateToMonthAndYear = (date: Date) => {
  const userLocale = navigator.language;
  const formattedDate = date.toLocaleString(userLocale, { year: 'numeric', month: 'long' });
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};
