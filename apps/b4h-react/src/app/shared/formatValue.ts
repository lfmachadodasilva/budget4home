export const formatValue = (value: number) => {
  return (value / 100).toFixed(2).replace(/[.,]00$/, '');
};
