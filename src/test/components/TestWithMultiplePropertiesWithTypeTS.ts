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

import { CustomElement } from '../../customelement';
import { Component } from './../../component';
import { Prop, State } from './../../prop';
import { Watch } from './../../watch';
import { Event } from './../../event';

import {
  html,
  // TemplateResult
} from 'lit-html';
import {
  classMap,
} from 'lit-html/directives/classMap';
import { EventEmitter } from '../../eventemitter';
import { Interceptor } from '../../interceptor';

/**
 * test-with-multiple-properties-with-type-ts-base
 */
@Component({
  tag: 'test-with-multiple-properties-with-type-ts-base',
  style: `
  :host {
    background-color: #ababab;
    padding: 10px;
    display: block;
    box-sizing: border-box;
  }

  :host > div {
    line-height: 20px;
  }

  :host > div:nth-of-type(1) {
    background-color: #00f;
  }`,
})
export class TestWithMultiplePropertiesWithTypeTSBase extends CustomElement {

  @Prop({ type: String })
  baseProperty: string = 'test';

  render() {
    return html`<div>${this.baseProperty}</div>`;
  }
}

/**
 * test-with-multiple-properties-with-type-ts
 */
@Component({
  tag: 'test-with-multiple-properties-with-type-ts',
  inheritStyle: true,
  style: `
  :host {
    background-color: #ababab;
    padding: 10px;
    display: block;
    box-sizing: border-box;
  }

  :host > div:nth-of-type(2) {
    background-color: #0f0;
  }

  :host > div:nth-of-type(3) {
    background-color: #0ff;
  }

  :host > div:nth-of-type(4) {
    background-color: #f00;
  }

  :host > div:nth-of-type(5) {
    background-color: #f0f;
  }

  :host > div:nth-of-type(6) {
    background-color: #ff0;
  }
  `,
})
export class TestWithMultiplePropertiesWithTypeTS extends TestWithMultiplePropertiesWithTypeTSBase {

  @Prop({
    type: String,
  })
  get getPropertyStringTest(): string {
    return this.internalPropertyString;
  }

  set getPropertyStringTest(value: string) {
    this.internalPropertyString = value;
  }

  get setPropertyStringTest(): string {
    return this.internalPropertyString2;
  }

  @Prop({
    type: String,
  })
  set setPropertyStringTest(value: string) {
    this.internalPropertyString2 = value;
  }

  @Prop({
    type: Boolean,
  })
  get getPropertyBooleanTest(): boolean {
    return this.internalPropertyBoolean;
  }

  set getPropertyBooleanTest(value: boolean) {
    this.internalPropertyBoolean = value;
  }

  get setPropertyBooleanTest(): boolean {
    return this.internalPropertyBoolean2;
  }

  @Prop({
    type: Boolean,
  })
  set setPropertyBooleanTest(value: boolean) {
    this.internalPropertyBoolean2 = value;
  }

  @Prop({
    type: Object,
  })
  get getPropertyObjectTest(): object {
    return this.internalPropertyObject;
  }

  set getPropertyObjectTest(value: object) {
    this.internalPropertyObject = value;
  }

  get setPropertyObjectTest(): object {
    return this.internalPropertyObject2;
  }

  @Prop({
    type: Object,
  })
  set setPropertyObjectTest(value: object) {
    this.internalPropertyObject2 = value;
  }

  @Prop({
    type: String,
  })
  stringProperty: string;

  @Prop({
    type: String,
  })
  stringPropertyWithInitializer: string = 'test';

  @Prop({
    type: Boolean,
  })
  booleanProperty: boolean;

  @Prop({
    type: Boolean,
  })
  booleanPropertyWithInitializer: boolean = true;

  @Prop({
    type: Number,
  })
  numberProperty: number;

  @Prop({
    type: Number,
  })
  numberPropertyWithInitializer: number = 0;

  @Prop({
    type: Object,
  })
  objectProperty: object;

  @Prop({
    type: Object,
  })
  objectPropertyWithInitializer: object = {
    test: 'default',
  };

  @Prop({
    type: Array,
  })
  arrayProperty: Array<any>; // tslint:disable-line

  @Prop({
    type: Array,
  })
  arrayPropertyWithInitializer: Array<any> = [0, 0, 0]; // tslint:disable-line

  @Prop({
    reflectAsAttribute: false,
    type: String,
  })
  stringPropertyWithNoReflection: string = '';

  @Prop({
    reflectAsAttribute: false,
    type: Number,
  })
  numberPropertyWithNoReflection: number = 0;

  @Prop({
    reflectAsAttribute: false,
    type: Boolean,
  })
  booleanPropertyWithNoReflection: boolean = false;

  @Prop({
    reflectAsAttribute: true,
    type: Object,
  })
  objectPropertyWithReflection: object = {};

  @Prop({
    reflectAsAttribute: true,
    type: Array,
  })
  arrayPropertyWithReflection: Array<any> = []; // tslint:disable-line

  @Prop({
    type: String,
  })
  interceptableProperty: string = '';

  @Event('change')
  changeEvent: EventEmitter<string>;

  @Event('test')
  test: EventEmitter<string>;

  @State()
  shouldHaveClass: boolean = false;

  internalPropertyString: string = '';
  internalPropertyString2: string = '';

  internalPropertyBoolean: boolean = false;
  internalPropertyBoolean2: boolean = false;

  internalPropertyObject: object = {};
  internalPropertyObject2: object = {};

  @Interceptor('interceptableProperty')
  propertyInterceptor(_oldValue: string, newValue: string) {
    return newValue + newValue;
  }

  @Watch('stringProperty')
  stringWatcher(oldValue: string, newValue: string) {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('numberProperty')
  numberWatcher(oldValue: number, newValue: number) {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('booleanProperty')
  booleanWatcher(oldValue: number, newValue: number) {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('objectProperty')
  objectWatcher(oldValue: number, newValue: number) {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('arrayProperty')
  arrayWatcher(oldValue: number, newValue: number) {
    this.watchGuard(oldValue, newValue);
  }

  watchGuard(_oldValue: any, _newValue: any) {// tslint:disable-line
    console.log(`${_oldValue} - ${_newValue}`); // tslint:disable-line
  }

  render() {
    return html`<div class=${classMap({ hasclass: this.shouldHaveClass })}>${this.baseProperty}</div>
                <div>${this.stringPropertyWithInitializer}</div>
                <div>${this.numberPropertyWithInitializer}</div>
                <div>${this.booleanPropertyWithInitializer}</div>
                <div>${JSON.stringify(this.objectPropertyWithInitializer)}</div>
                <div>${JSON.stringify(this.arrayPropertyWithInitializer)}</div>`;
  }
}
