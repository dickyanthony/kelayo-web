export function formatNumberWithSeparator(number = 0) {
  return new Intl.NumberFormat("id-ID").format(number);
}
