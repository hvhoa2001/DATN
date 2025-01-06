import BigNumber from "bignumber.js";
export type TruncateStringOptions = {
  /**
   * The number of characters will be taken from begin. This value cannot be negative.
   */
  first?: number;
  /**
   * The number of characters will be taken from last. This value cannot be negative.
   */
  last?: number;
};
/**
 * Truncate a string
 * @param {string} s The input string
 * @param {TruncateStringOptions} options Includes options to customize the results returned
 * @returns if options is not provided, the original string will
 *          be returned, otherwise return the truncated string.
 */

export interface FormatNumberOptions<F> {
  /**
   * Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
   */
  fractionDigits?: number;
  /**
   * A fallback react tree to show when a number is invalid.
   * @default N/A
   */
  fallback?: F;
  /**
   * The string used to separate number.
   */
  delimiter?: string;
  /**
   * Allow zero after decimal point.
   * @default false
   */
  padZero?: boolean;
  /**
   * A string that will be appended to the beginning of the returned result.
   */
  prefix?: string;
  /**
   * A string that will be appended to the ending of the returned result.
   */
  suffix?: string;
}

/**
 * Check if a value is numeric or not
 */
export function isNumeric(value: any): value is number | string {
  return !isNaN(value) && !isNaN(parseFloat(value));
}

/**
 * Cast a value to BigNumber (bignumber.js) instance.
 * @param {*} value - The value
 * @returns An instance of BigNumber.
 */
export function BN(value: any): BigNumber {
  return new BigNumber(value);
}

export function toUSD(
  amount?: BigNumber.Value,
  price?: BigNumber.Value
): string {
  return BN(amount).times(BN(price)).toString();
}

export function numberWithDelimiter(
  x: BigNumber.Value,
  delimiter = ","
): string {
  if (!isNumeric(x)) {
    throw new Error("Must provide a correct number");
  }
  const [natural, decimal] = x.toString().split(".");
  let out = natural.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
  if (decimal) {
    out += "." + decimal;
  }
  return out;
}

export function formatNumber<F = any>(
  number: any,
  options?: FormatNumberOptions<F>
): string | F {
  const {
    fallback = "N/A",
    fractionDigits,
    delimiter,
    padZero,
    prefix = "",
    suffix = "",
  } = options ?? {};
  if (!isNumeric(number)) {
    return fallback;
  }
  let n = String(number);
  if (isNumeric(fractionDigits)) {
    n = BN(n).toFixed(fractionDigits);
  }
  if (!padZero && n.split(".").length > 1) {
    n = n.replace(/0*$/g, ""); // remove last zeros after decimal point
  }
  return prefix + numberWithDelimiter(n, delimiter) + suffix;
}

export function formatTime(
  timeStampS: number | undefined,
  {
    date,
    time,
  }: {
    date?: boolean;
    time?: boolean;
  }
) {
  return new Date(Number(timeStampS || 0) * 1000)
    .toLocaleString(undefined, {
      ...(date && { year: "numeric", month: "numeric", day: "numeric" }),
      ...(time && { hour: "2-digit", minute: "2-digit", hour12: true }),
    })
    .replaceAll("am", "AM")
    .replaceAll("pm", "PM");
}

export function truncateString(
  s: string,
  options: TruncateStringOptions = {}
): string {
  if (options.first === undefined && options.last === undefined) return s;
  if (
    (options.first && options.first < 0) ||
    (options.last && options.last < 0)
  ) {
    throw new Error("Invalid parameter(s)");
  }
  let _s = "";
  if (options.first) {
    _s = s.slice(0, options.first);
  }
  _s += "...";
  if (options.last) {
    _s += s.slice(-options.last);
  }
  return _s;
}
export function formatAddress(address: string, first = 6, last = 4): string {
  if (!address) {
    return "";
  }
  return truncateString(address, { first, last });
}
