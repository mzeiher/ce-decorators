
/**
 * Copyright (c) 2018 Mathis Zeiher
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
import { PropertyType } from './prop.stage2';

/**
 * deserializes a string to a typed value
 * @param value value string to be transformed
 * @param type type transformer type for string value
 */
export function deserializeValue(value: string, type: PropertyType): null | string | object | number | boolean | any[] { // tslint:disable-line
  if ((value === null || value === undefined) && type !== Boolean) {
    return null;
  } else if (type === Boolean) {
    return value !== null;
  } else if (type === Number) {
    return parseFloat(value);
  } else if (type === String) {
    return value;
  } else if (type instanceof Object) {
    return JSON.parse(value);
  } else {
    return value;
  }
}

/**
 * serializes a value to a string
 * @param value value
 * @param type type
 */
export function serializeValue(value: any, type: PropertyType): string | null { // tslint:disable-line
  if (value === null || value === undefined) {
    return null;
  } else if (type === String) {
    return value;
  } else if (type instanceof Object) {
    return JSON.stringify(value);
  } else {
    return `${value}`;
  }
}

/**
 * transform a string from camel case to lower-case kebap case
 * @param str input string
 */
export function camelToKebapCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * transform a string from kebap to camel case
 * @param str input string
 */
export function kebapToCamelCase(str: string): string {
  return str.toLowerCase().replace(/-([a-zA-Z])/g, (...args: string[]): string => {
    return args[1].toUpperCase();
  });
}

/**
 * create a template string array
 */
export function makeTemplateString(template: string[], raw: string[]): TemplateStringsArray {
  Object.defineProperty(template, 'raw', { value: raw });

  return <any>template;
}
