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

export type ClassType = { new(...args: any[]): Object };// tslint:disable-line

const singletonServiceRegistry: Map<ClassType, Object> = new Map();
const instanceServiceRegistry: WeakMap<Object, Map<string | symbol, Object>> = new WeakMap();

/**
 * return a singleton
 * @param type 
 */
export function getSingleton(type: ClassType): Object {
  if (!singletonServiceRegistry.has(type)) {
    singletonServiceRegistry.set(type, new (type)());
  }

  return <Object>singletonServiceRegistry.get(type);
}

/**
 * get instance
 * @param instance 
 * @param property 
 * @param type 
 */
export function getInstance(instance: Object, property: string | symbol, type: ClassType): any { // tslint:disable-line
  if (!instanceServiceRegistry.has(instance)) {
    instanceServiceRegistry.set(instance, new Map());
  }
  const map: Map<string | symbol, Object> = <Map<string | symbol, Object>>instanceServiceRegistry.get(instance);
  if (!map.has(property)) {
    map.set(property, new (type)());
  }

  return map.get(property);
}
