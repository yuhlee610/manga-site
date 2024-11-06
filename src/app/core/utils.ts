/************************
 * FUNCTION DECLARATIONS
 ************************/

/**
 * Transform an array of strings to query string params of the form
 * `name[]=value1&name[]=value2` etc
 *
 * @param {string} name
 * @param {string[]} [array]
 * @returns {string} Formatted query string params
 */
const transformArrayForQueryString = function (name: string, array?: string[]) {
  let qs = '';

  if (array === undefined || array.length === 0) {
    return qs;
  }

  for (const s of array) {
    if (qs === '') {
      qs += `${name}[]=${s}`;
    } else {
      qs += `&${name}[]=${s}`;
    }
  }

  return qs;
};

/**
 * Build a query string from a request options object.
 *
 * @param {object} [options] A request options object to parse
 * @returns {string} The query string, including the starting '?' character
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
export const buildQueryStringFromOptions = function (options?: Record<string, any>) {
  const queryParams = [];

  if (options === undefined || Object.keys(options).length === 0) {
    return '';
  }

  for (const key of Object.keys(options)) {
    if (options[key] === undefined) continue;
    if (options[key] instanceof Array) {
      queryParams.push(transformArrayForQueryString(key, options[key]));
    } else if (options[key] instanceof Date) {
      // /** @type {Date} */
      const d = options[key];
      queryParams.push(`${key}=${d.toISOString().substring(0, d.toISOString().indexOf('.'))}`);
    } else if (key === 'order') {
      const order = options[key];

      for (const o of Object.keys(order)) {
        queryParams.push(`order[${o}]=${order[o]}`);
      }
    } else {
      queryParams.push(`${key}=${options[key]}`);
    }
  }

  const ret = `?${queryParams.join('&')}`;
  return ret === '?' ? '' : ret;
};
