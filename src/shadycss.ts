/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
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

export function needShadyDOM(): boolean {
  // tslint:disable-next-line:no-any
  return (<any>window).ShadyCSS && !ShadyCSS.nativeShadow;
}
