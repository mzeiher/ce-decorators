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
  tag: 'test-with-multiple-properties',
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
export class TestWithMultipleProperties extends CustomElement {

  @Prop()
  get getPropertyStringTest(): string {
    return this.internalPropertyString;
  }

  set getPropertyStringTest(value: string) {
    this.internalPropertyString = value;
  }

  get setPropertyStringTest(): string {
    return this.internalPropertyString2;
  }

  @Prop()
  set setPropertyStringTest(value: string) {
    this.internalPropertyString2 = value;
  }

  @Prop()
  get getPropertyBooleanTest(): boolean {
    return this.internalPropertyBoolean;
  }

  set getPropertyBooleanTest(value: boolean) {
    this.internalPropertyBoolean = value;
  }

  get setPropertyBooleanTest(): boolean {
    return this.internalPropertyBoolean2;
  }

  @Prop()
  set setPropertyBooleanTest(value: boolean) {
    this.internalPropertyBoolean2 = value;
  }

  @Prop()
  get getPropertyObjectTest(): object {
    return this.internalPropertyObject;
  }

  set getPropertyObjectTest(value: object) {
    this.internalPropertyObject = value;
  }

  get setPropertyObjectTest(): object {
    return this.internalPropertyObject2;
  }

  @Prop()
  set setPropertyObjectTest(value: object) {
    this.internalPropertyObject2 = value;
  }

  @Prop()
  stringProperty: string;

  @Prop({
    defaultValue: 'test'
  })
  stringPropertyWithDefault: string;

  @Prop()
  stringPropertyWithInitializer: string = 'test';

  @Prop()
  booleanProperty: boolean;

  @Prop({
    defaultValue: true
  })
  booleanPropertyWithDefault: boolean;

  @Prop()
  booleanPropertyWithInitializer: boolean = true;

  @Prop()
  numberProperty: number;

  @Prop({
    defaultValue: 0
  })
  numberPropertyWithDefault: number;

  @Prop()
  numberPropertyWithInitializer: number = 0;

  @Prop()
  objectProperty: {};

  @Prop({
    defaultValue: { test: 'default' }
  })
  objectPropertyWithDefault: {};

  @Prop()
  objectPropertyWithInitializer: {} = { test: 'default' };

  @Prop()
  arrayProperty: any[];

  @Prop({
    defaultValue: [0, 0, 0]
  })
  arrayPropertyWithDefault: any[];

  @Prop()
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
