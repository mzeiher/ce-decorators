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

import { PropertyType } from './propertyoptions';

/**
 * deserializes a string to a typed value
 * @param value value string to be transformed
 * @param type type transformer type for string value
 */
export function deserializeValue(value: string, type: PropertyType): null | string | object | number | boolean | any[] { // tslint:disable-line
  if ((value === null || value === undefined) && type !== Boolean) {
    return null;
  } else if (type === Boolean) {
    if (value === 'false') {
      return false;
    } else {
      return value !== null;
    }
  } else if (type === Number) {
    return parseFloat(value);
  } else if (type === String) {
    return value;
  } else if (type === RegExp) {
    const [, , _2, _3, _4 ] =  Array.from(/(\/(.*)\/([a-z]*))|(.+)/.exec(value));
    if (_4) {
      return new RegExp(_4);
    } else if (_2) {
      return new RegExp(_2, _3 || '');
    } else {
      return null;
    }
  } else if (type === Function) {
    const callback = eval('( function() {' + value + '} )'); // tslint:disable-line
    return callback;
  } else if (type instanceof Object) {
    return JSON.parse(value); // tslint:disable-line
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
    return value; // tslint:disable-line
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
  return str.toLowerCase().replace(/-([a-zA-Z])/g, (...args: Array<string>): string => {
    return args[1].toUpperCase();
  });
}

/**
 * create a template string array
 */
export function makeTemplateString(template: Array<string>, raw: Array<string>): TemplateStringsArray {
  Object.defineProperty(template, 'raw', { value: raw });

  return <any>template; // tslint:disable-line:no-any
}

/**
 * helper for shadydom
 */
export function needShadyDOM(): boolean {
  // tslint:disable-next-line:no-any
  return (<any>window).ShadyCSS && !window.ShadyCSS.nativeShadow;
}

/**
 * support for new adopting stylesheet functionality
 */
export const supportsAdoptingStyleSheets: boolean = ('adoptedStyleSheets' in Document.prototype) && ('replace' in CSSStyleSheet.prototype);
