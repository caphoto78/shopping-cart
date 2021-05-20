export const changeCurrSymbols = (crcy) => {
  switch (crcy) {
    case 'USD':
      return '$'
      break;
    case 'EUR':
      return '€'
      break;
    case 'GBP':
      return '£'
      break;
  
    default:
      return '$'
      break;
  }
}