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
import { makeTemplateString, needShadyDOM, supportsAdoptingStyleSheets } from '../utils';
import { render, shadyRender, html } from '../lit-html';

/**
 * render shadowroot of component
 * @param this 
 * @param elementToRender 
 */
export function renderToShadowDOM(this: CustomElement, elementToRender: ShadowRoot) {
  if (this._templateCache === null) {
    const { cssStyles, tag, shadyCSSStyleSheetAdopted, templateCache } = getComponentProperties(this.constructor as typeof CustomElement);
    if (window.ShadyCSS && !window.ShadyCSS.nativeShadow) {
      if (!shadyCSSStyleSheetAdopted) {
        window.ShadyCSS.ScopingShim.prepareAdoptedCssText(cssStyles.map((value) => value.cssText), tag);
        getComponentProperties(this.constructor as typeof CustomElement).shadyCSSStyleSheetAdopted = true;
      }
      this._templateCache = templateCache || makeTemplateString(['', ''], ['', '']);
    } else if (supportsAdoptingStyleSheets) {
      this.shadowRoot.adoptedStyleSheets = <Array<CSSStyleSheet>>cssStyles;
      this._templateCache = templateCache || makeTemplateString(['', ''], ['', '']);
    } else {
      const styleString = cssStyles.map((value) => value.cssText).reduce((prevValue, currentValue) => prevValue + '\n' + currentValue);
      this._templateCache = templateCache || makeTemplateString([`<style>${styleString}</style>`, ''], [`<style>${styleString}</style>`, '']);
    }
    if (!templateCache) {
      getComponentProperties(this.constructor as typeof CustomElement).templateCache = this._templateCache;
    }
  }
  if (needShadyDOM()) {
    shadyRender(html(this._templateCache,
      this.render()),
      elementToRender,
      { scopeName: getComponentProperties(this.constructor as typeof CustomElement)!.tag, eventContext: this });
  } else {
    render(html(this._templateCache, this.render()), elementToRender, { eventContext: this });
  }
}
