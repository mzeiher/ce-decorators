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

import { Component, CustomElement, Event, EventEmitter, Prop, Watch, State } from './../../index';
import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/classMap';

@Component({
  tag: 'test-with-multiple-properties-with-type-ts',
  style: `
  :host {
    background-color: #ababab;
    padding: 10px;
    display: block;
    box-sizing: border-box;
  }

  :host > div:nth-of-type(1) {
    background-color: #fff;
  }

  :host > div:nth-of-type(2) {
    background-color: #ff0;
  }

  :host > div:nth-of-type(3) {
    background-color: #f0f;
  }

  :host > div:nth-of-type(4) {
    background-color: #f00;
  }

  :host > div:nth-of-type(5) {
    background-color: #0ff;
  }
  `
})
export class TestWithMultiplePropertiesWithTypeTS extends CustomElement {

  @Prop({ type: String })
  get getPropertyStringTest(): string {
    return this.internalPropertyString;
  }

  set getPropertyStringTest(value: string) {
    this.internalPropertyString = value;
  }

  get setPropertyStringTest(): string {
    return this.internalPropertyString2;
  }

  @Prop({ type: String })
  set setPropertyStringTest(value: string) {
    this.internalPropertyString2 = value;
  }

  @Prop({ type: Boolean })
  get getPropertyBooleanTest(): boolean {
    return this.internalPropertyBoolean;
  }

  set getPropertyBooleanTest(value: boolean) {
    this.internalPropertyBoolean = value;
  }

  get setPropertyBooleanTest(): boolean {
    return this.internalPropertyBoolean2;
  }

  @Prop({ type: Boolean })
  set setPropertyBooleanTest(value: boolean) {
    this.internalPropertyBoolean2 = value;
  }

  @Prop({ type: Object })
  get getPropertyObjectTest(): object {
    return this.internalPropertyObject;
  }

  set getPropertyObjectTest(value: object) {
    this.internalPropertyObject = value;
  }

  get setPropertyObjectTest(): object {
    return this.internalPropertyObject2;
  }

  @Prop({ type: Object })
  set setPropertyObjectTest(value: object) {
    this.internalPropertyObject2 = value;
  }

  @Prop({ type: String })
  stringProperty: string;

  @Prop({
    defaultValue: 'test',
    type: String
  })
  stringPropertyWithDefault: string;

  @Prop({ type: String })
  stringPropertyWithInitializer: string = 'test';

  @Prop({ type: Boolean })
  booleanProperty: boolean;

  @Prop({
    defaultValue: true,
    type: Boolean
  })
  booleanPropertyWithDefault: boolean;

  @Prop({ type: Boolean })
  booleanPropertyWithInitializer: boolean = true;

  @Prop({ type: Number })
  numberProperty: number;

  @Prop({
    defaultValue: 0,
    type: Number
  })
  numberPropertyWithDefault: number;

  @Prop({ type: Number })
  numberPropertyWithInitializer: number = 0;

  @Prop({ type: Object })
  objectProperty: {};

  @Prop({
    defaultValue: { test: 'default' },
    type: Object
  })
  objectPropertyWithDefault: {};

  @Prop({ type: Object })
  objectPropertyWithInitializer: {} = { test: 'default' };

  @Prop({ type: Array })
  arrayProperty: any[];

  @Prop({
    defaultValue: [0, 0, 0],
    type: Array
  })
  arrayPropertyWithDefault: any[];

  @Prop({ type: Array })
  arrayPropertyWithInitializer: any[] = [0, 0, 0];

  @Prop({ reflectAsAttribute: false })
  stringPropertyWithNoReflection: string = '';

  @Prop({ reflectAsAttribute: false })
  numberPropertyWithNoReflection: number = 0;

  @Prop({ reflectAsAttribute: false })
  booleanPropertyWithNoReflection: boolean = false;

  @Prop({ reflectAsAttribute: true })
  objectPropertyWithReflection: object = {};

  @Prop({ reflectAsAttribute: true })
  arrayPropertyWithReflection: Array<number> = [];

  @Event('change')
  changeEvent: EventEmitter<string>;

  @Event()
  test: EventEmitter<string>;

  @State()
  shouldHaveClass = false;

  private internalPropertyString: string = '';
  private internalPropertyString2: string = '';

  private internalPropertyBoolean: boolean = false;
  private internalPropertyBoolean2: boolean = false;

  private internalPropertyObject: object = {};
  private internalPropertyObject2: object = {};

  @Watch('stringProperty')
  stringWatcher(oldValue: string, newValue: string): void {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('numberProperty')
  numberWatcher(oldValue: number, newValue: number): void {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('booleanProperty')
  booleanWatcher(oldValue: boolean, newValue: boolean): void {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('objectProperty')
  objectWatcher(oldValue: object, newValue: object): void {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('arrayProperty')
  arrayWatcher(oldValue: Array<any>, newValue: Array<any>): void {
    this.watchGuard(oldValue, newValue);
  }

  watchGuard(_oldValue: any, _newValue: any): void {
  }

  protected render(): TemplateResult {
    return html`<div class=${classMap({ hasclass: this.shouldHaveClass })}>${this.stringPropertyWithDefault}</div>
                     <div>${this.numberPropertyWithDefault}</div>
                     <div>${this.booleanPropertyWithDefault}</div>
                     <div>${JSON.stringify(this.objectPropertyWithDefault)}</div>
                     <div>${JSON.stringify(this.arrayPropertyWithDefault)}</div>`;
  }
}
