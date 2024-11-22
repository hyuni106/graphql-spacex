const Colors = {
  error: '#FC4438',
  black: '#000000',
  transparent: 'transparent',
  white: '#FFFFFF',
  primary: '#1E1D44',
  sk1: '#ECF2FD',
  sk2: '#B2D0F9',
  sk3: '#91B1FA',
  sk4: '#5C95F3',
  sk5: '#5085D1',
} as const;

export default Colors;

const hexToRGB = (input: string) => {
  let hex = input;

  if (hex.length === 4) {
    hex = hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  return {
    r: parseInt(hex.substring(1, 3), 16),
    g: parseInt(hex.substring(3, 5), 16),
    b: parseInt(hex.substring(5, 7), 16),
  };
};

const formatRGB = ({r, g, b}: {r: number; g: number; b: number}) =>
  `rgb(${r},${g},${b})`;
const formatRGBA = (
  {r, g, b}: {r: number; g: number; b: number},
  alpha: number,
) => `rgba(${r},${g},${b},${alpha})`;

/**
 * @param {string} input - A color in hexadecimal syntax. e.g. #fa6d01
 * @param {number} alpha - The desired opacity, from 0 to 1.
 * @returns {string} - The new color in rgba() or rgb() syntax.
 */
export const hexAlpha = (input: string, alpha: number) => {
  const newColor = hexToRGB(input);

  return typeof alpha === 'number' && alpha >= 0 && alpha <= 1
    ? formatRGBA(newColor, alpha)
    : formatRGB(newColor);
};
