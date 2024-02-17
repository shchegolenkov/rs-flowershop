const formatPrice = (price: number): string => {
  if (price === 0) return '0';
  return `${price}`.slice(0, -2) + '.' + `${price}`.slice(-2);
};

export default formatPrice;
