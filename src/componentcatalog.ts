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

import { PropertyOptions } from './prop.stage2';
import { getComponentProperties, getAllComponents } from './componentproperties.stage2';
import { getClassProperties } from './classproperties.stage2';
import { getClassEvents } from './classevents.stage2';

/**
 * ComponentOptions type
 */
export interface ComponentOptions {
  properties: { [name: string]: PropertyOptions };
  events: Array<string>;
}

/**
 * Componets type
 */
export interface Components {
  [tag: string]: ComponentOptions;
}

/**
 * return a catalog of all controls registered with ce-decorators
 */
export function getComponentCatalog(): Components {
  const components = getAllComponents();
  const catalog: Components = {};
  components.forEach((value) => {
    const componentProperties = getComponentProperties(value);

    const properties: { [name: string]: PropertyOptions } = {};
    Array.from(getClassProperties(value).entries()).forEach(([name, options]) => {
      properties[name.toString()] = options;
    });

    const events: Array<string> = Array.from(getClassEvents(value).values());

    catalog[componentProperties.tag] = {
      properties,
      events,
    };
  });
  return catalog;
}
