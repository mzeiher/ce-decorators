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

import { CustomElement } from './customelement';
import { EventOptions } from './eventoptions';

const map: Map<typeof CustomElement, ClassEvents> = new Map();

/**
 * CLassEvent type
 */
export type ClassEvents = Map<string | symbol, EventOptions>;

/**
 * return events registered for the given class
 * 
 * @param target Class to get ClassEvents from 
 */
export function getClassEvents(target: typeof CustomElement): ClassEvents {
  let properties: ClassEvents | undefined = map.get(target);
  if (!properties) {
    properties = new Map();
    map.set(target, properties);
  }
  return properties;
}
