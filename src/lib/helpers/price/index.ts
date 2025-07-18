export const formatPrice = (price: number): string => {
  if (price < 0) {
    return 'Free';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
