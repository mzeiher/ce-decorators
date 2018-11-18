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

import { CustomElement } from './customelement.stage2';

const map: Map<typeof CustomElement, PropertyInterceptor> = new Map();

/**
 * PropertyInterceptor Type
 */
export type PropertyInterceptor = Map<string, Array<() => void>>;

/**
 * get all interceprors for a property of a class
 * 
 * @param target Class to get interceptors from
 * @param property property which will be intercepted
 */
export function getClassPropertyInterceptor(target: typeof CustomElement, property: string): Array<() => void> {
  let properties: PropertyInterceptor | undefined = map.get(target);
  if (!properties) {
    properties = new Map();
    map.set(target, properties);
  }
  let propertyInterceptor = properties.get(property);
  if (!propertyInterceptor) {
    propertyInterceptor = [];
    properties.set(property, propertyInterceptor);
  }
  return propertyInterceptor;
}

/**
 * get all interceptors for a class
 * 
 * @param target Class to get interceptors from
 */
export function getAllClassPropertyInterceptors(target: typeof CustomElement): PropertyInterceptor {
  let properties: PropertyInterceptor | undefined = map.get(target);
  if (!properties) {
    properties = new Map();
    map.set(target, properties);
  }
  return properties;
}
