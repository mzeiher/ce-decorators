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
import { ComponentOptions } from './componentoptions';

const map: Map<typeof CustomElement, ExtendedComponentOptions> = new Map();

/**
 * CSSStyleSheetAlike if adoptedStylsheeets are not supported
 */
export interface CSSStyleSheetAlike {
  cssText: string;
}

/**
 * extended options for better style handling
 */
export interface ExtendedComponentOptions extends ComponentOptions {
  cssStyles: Array<CSSStyleSheet | CSSStyleSheetAlike>;
  styleSheetAdopted: boolean;
}

/**
 * return componentproperties
 * @param target 
 */
export function getComponentProperties(target: typeof CustomElement): ExtendedComponentOptions {
  return map.get(target);
}

/**
 * set component properties
 * @param target 
 * @param options 
 */
export function setComponentProperties(target: typeof CustomElement, options: ExtendedComponentOptions): void {
  map.set(target, options);
}

/**
 * return all components defined with ce-decorators
 */
export function getAllComponents(): Array<typeof CustomElement> {
  return Array.from(map.keys());
}
