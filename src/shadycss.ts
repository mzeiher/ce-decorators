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

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

 /**
  * shadycss interface
  */
export interface ShadyCSSInterface {
  nativeCss: boolean;
  nativeShadow: boolean;

  prepareTemplate(templateElement: HTMLTemplateElement, elementName: string, elementExtension?: string): void;
  prepareTemplateStyles(templateElement: HTMLTemplateElement, elementName: string, elementExtension?: string): void;
  styleElement(element: HTMLElement): void;
  styleSubtree(element: HTMLElement, overrideProperties?: boolean): void;
  styleDocument(overrideProperties: boolean): void;
  getComputedStyleValue(element: HTMLElement, propertyName: string): string;
}

export declare var ShadyCSS: ShadyCSSInterface;

/**
 * helper for shadydom
 */
export function needShadyDOM(): boolean {
  // tslint:disable-next-line:no-any
  return (<any>window).ShadyCSS && !ShadyCSS.nativeShadow;
}
