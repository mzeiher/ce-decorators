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

import { LazyCustomElement, CustomElement, Event, EventEmitter, Prop, Watch, State } from './../../index';
import { html, classMap, TemplateResult } from './../../lit-html';


export declare class TestWithMultiplePropertiesWithTypeStage2BaseLazy extends LazyCustomElement {
  baseProperty:string;
  render():TemplateResult;
}

export declare class TestWithMultiplePropertiesWithTypeStage2Lazy extends TestWithMultiplePropertiesWithTypeStage2BaseLazy {

  getPropertyStringTest: string;

  setPropertyStringTest: string;

  getPropertyBooleanTest: boolean;

  setPropertyBooleanTest: boolean

  getPropertyObjectTest: object;
  
  setPropertyObjectTest: object;

  stringProperty: string;

  stringPropertyWithInitializer: string;

  booleanProperty: boolean;

  booleanPropertyWithInitializer: boolean;

  numberProperty: number;

  numberPropertyWithInitializer: number ;

  objectProperty: {};

  objectPropertyWithInitializer: {};

  arrayProperty: any[];

  arrayPropertyWithInitializer: any[];

  stringPropertyWithNoReflection: string;

  numberPropertyWithNoReflection: number;

  booleanPropertyWithNoReflection: boolean;

  objectPropertyWithReflection: object;

  arrayPropertyWithReflection: Array<number>;

  interceptableProperty:string;

  functionProperty: () => void;
  regexpProperty: RegExp;
  
  onlyAttributeConverterProperty: string;
  attributePropertyConverterProperty: string;

  deprecatedProperty: string;

  deprecatedPropertyGetSet:string;

  deprecatedMethod(): void;
  
  changeEvent: EventEmitter<string>;

  test: EventEmitter<string>;

  stringEvent: EventEmitter<string>

  shouldHaveClass:boolean;

  private internalPropertyString: string;
  private internalPropertyString2: string;

  private internalPropertyBoolean: boolean;
  private internalPropertyBoolean2: boolean;

  private internalPropertyObject: object;
  private internalPropertyObject2: object;

  stringWatcher(oldValue: string, newValue: string): void;

  numberWatcher(oldValue: number, newValue: number): void;

  booleanWatcher(oldValue: boolean, newValue: boolean): void;

  objectWatcher(oldValue: object, newValue: object): void;

  arrayWatcher(oldValue: Array<any>, newValue: Array<any>): void;

  watchGuard(_oldValue: any, _newValue: any): void;

  render(): TemplateResult;
}
