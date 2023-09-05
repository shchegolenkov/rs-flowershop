export default function formatPrice(price: number): string {
  return `${price}`.slice(0, -2) + '.' + `${price}`.slice(-2);
}
