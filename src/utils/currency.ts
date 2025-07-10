// Currency formatting utilities for Dominican Peso (DOP)

/**
 * Format a number as Dominican Peso currency
 * @param amount - The numeric amount to format
 * @param showDecimals - Whether to show decimal places (default: true)
 * @returns Formatted currency string (e.g., "RD$45.00")
 */
export const formatPrice = (amount: number, showDecimals: boolean = true): string => {
  if (showDecimals) {
    return `RD$${amount.toFixed(2)}`;
  }
  return `RD$${Math.round(amount)}`;
};

/**
 * Format a price with "desde" (from) prefix for variable pricing
 * @param amount - The numeric amount to format
 * @param showDecimals - Whether to show decimal places (default: true)
 * @returns Formatted price string (e.g., "desde RD$45.00")
 */
export const formatPriceFrom = (amount: number, showDecimals: boolean = true): string => {
  return `desde ${formatPrice(amount, showDecimals)}`;
};

/**
 * Format a price with quantity suffix (e.g., per dozen)
 * @param amount - The numeric amount to format
 * @param quantity - The quantity description (e.g., "docena", "cada")
 * @param showDecimals - Whether to show decimal places (default: true)
 * @returns Formatted price string (e.g., "RD$30.00/docena")
 */
export const formatPriceWithQuantity = (
  amount: number,
  quantity: string,
  showDecimals: boolean = true
): string => {
  return `${formatPrice(amount, showDecimals)}/${quantity}`;
};

/**
 * Format a price with "desde" prefix and quantity suffix
 * @param amount - The numeric amount to format
 * @param quantity - The quantity description (e.g., "docena", "cada")
 * @param showDecimals - Whether to show decimal places (default: true)
 * @returns Formatted price string (e.g., "desde RD$30.00/docena")
 */
export const formatPriceFromWithQuantity = (
  amount: number,
  quantity: string,
  showDecimals: boolean = true
): string => {
  return `desde ${formatPriceWithQuantity(amount, quantity, showDecimals)}`;
};

/**
 * Currency symbol for Dominican Peso
 */
export const CURRENCY_SYMBOL = 'RD$';

/**
 * Currency code for Dominican Peso
 */
export const CURRENCY_CODE = 'DOP';

/**
 * Currency name in Spanish
 */
export const CURRENCY_NAME = 'Peso Dominicano';

/**
 * Format a number using Intl.NumberFormat for Dominican Peso
 * @param amount - The numeric amount to format
 * @returns Formatted currency string using browser's locale formatting
 */
export const formatPriceIntl = (amount: number): string => {
  // Use Spanish Dominican Republic locale formatting
  const formatter = new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'DOP',
    currencyDisplay: 'symbol'
  });

  return formatter.format(amount).replace('$', 'RD$');
};
