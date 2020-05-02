export const ucfirst = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
};
