export const handleError = (error: any) => {
    const errorDetails = error?.response?.data || { message: 'Something went wrong' };
    return errorDetails;
};

export const isLightColor = (hex: string): 0 | 1 => {
    // Remove "#" if present
    hex = hex.replace(/^#/, "");

    // Convert hex to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance using the formula
    let luminance = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);

    // Return 1 if light, otherwise 0
    return luminance >= 128 ? 0 : 1;
};

export function formatToIndianShort(amount:number) {
    if (amount >= 10000000) {
      return (amount / 10000000).toFixed(1).replace(/\.0$/, '') + 'cr'; // Crores
    } else if (amount >= 100000) {
      return (amount / 100000).toFixed(1).replace(/\.0$/, '') + 'L'; // Lakhs
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(1).replace(/\.0$/, '') + 'K'; // Thousands
    }
    return amount.toString(); // Less than 1K
  }