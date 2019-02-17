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

import { CustomElement } from '../customelement';
import { getComponentProperties } from '../componentproperties';
import { makeTemplateString } from '../utils';
import { render } from '../lit-html';

/**
 * Renders the subtree to a lightdom element
 * @param this 
 * @param elementToRender 
 */
export function renderToLightDOM(this: CustomElement, elementToRender: HTMLElement) {
  if (this._templateCache === null) {
    const { cssStyles, tag, shadyCSSStyleSheetAdopted, templateCache } = getComponentProperties(this.constructor as typeof CustomElement);
    if (!shadyCSSStyleSheetAdopted) {
      const styleSheet = document.createElement('style');
      const styleString = cssStyles.map((value) => value.cssText).reduce((prevValue, currentValue) => prevValue + currentValue);
      styleSheet.textContent = styleString.replace(/((:host\(([^\(]*)\))|(:host))/g, (_token, ...args) => {
        return `${tag}${args[2] ? args[2] : ''}`;
      });
      document.querySelector('head').appendChild(styleSheet);
    }
    this._templateCache = templateCache || makeTemplateString(['', ''], ['', '']);
    getComponentProperties(this.constructor as typeof CustomElement).templateCache = this._templateCache;
  }
  render(this.render(), elementToRender, { eventContext: this });
}
