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
import { Component, CustomElement, Prop, Watch } from '../../index';
import { TemplateResult, svg } from '../../lit-html';

const style = `:host {
  display: inline-block;
  box-sizing: border-box;
  height: 24px;
  width: 24px; }

  :host > svg {
    height: 100%;
    width: 100%; }
    `;

const one = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path fill-opacity=".3" d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v9.17h2L13 7v5.5h2l-1.07 2H17V5.33C17 4.6 16.4 4 15.67 4z"/>
                                  <path d="M11 20v-5.5H7v6.17C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V14.5h-3.07L11 20z"/></svg>`;
const two = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/></svg>';

/**
 * implementation of icon
 */
@Component({
  tag: 'static-template-component',
  style,
})
export class StaticTemplateComponent extends CustomElement {

  @Prop({
    reflectAsAttribute: false,
    type: String,
  })
  icon: string;

  private _iconCache: TemplateStringsArray = makeTemplateString(['<svg></svg>'], ['<svg></svg>']);
  // private _iconCache = svg`<svg></svg>`;
  render(): TemplateResult {
    // return this._iconCache;
    return svg(this._iconCache);
  }

  @Watch('icon')
  iconChange(_: string, newValue: string) {
    if (typeof newValue === 'string') {
      const splittedIcon = newValue.split('/');
      // let icon = svg`<svg></svg>`;
      let icon = '<svg></svg>';
      switch (splittedIcon[0]) {
        case 'one':
          icon = one;
          break;
        case 'two':
          icon = two;
          break;
        default:
          break;
      }
      this._iconCache = makeTemplateString([icon], [icon]);
      // this._iconCache = icon;
    }
  }

}

function makeTemplateString(template: Array<string>, raw: Array<string>): TemplateStringsArray {
  Object.defineProperty(template, 'raw', { value: raw });

  return <any>template; // tslint:disable-line
}
