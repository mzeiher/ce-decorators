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

import { LazyCustomElement } from '../../customelement';
import { Component } from './../../component';
import { Prop, State } from './../../prop';
import { Watch } from './../../watch';
import { Event } from './../../event';
import { Deprecated } from '../../deprecated';

import {
  html,
  // TemplateResult
} from 'lit-html';
import {
  classMap,
} from 'lit-html/directives/class-map';
import { EventEmitter } from '../../eventemitter';
import { Interceptor } from '../../interceptor';

/**
 * test-with-multiple-properties-base
 */
@Component({
  tag: 'test-with-multiple-properties-base-lazy',
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
export class TestWithMultiplePropertiesBaseLazy extends LazyCustomElement {

  @Prop({ type: String })
  baseProperty: string = 'test';

  render() {
    return html`<div>${this.baseProperty}</div>`;
  }
}

/**
 * test-with-multiple-properties
 */
@Component({
  tag: 'test-with-multiple-properties-lazy',
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
export class TestWithMultiplePropertiesLazy extends TestWithMultiplePropertiesBaseLazy {

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

  @Prop()
  stringPropertyWithInitializer: string = 'test';

  @Prop()
  booleanProperty: boolean;

  @Prop()
  booleanPropertyWithInitializer: boolean = true;

  @Prop()
  numberProperty: number;

  @Prop()
  numberPropertyWithInitializer: number = 0;

  @Prop()
  objectProperty: object;

  @Prop()
  objectPropertyWithInitializer: object = {
    test: 'default',
  };

  @Prop()
  arrayProperty: Array<any>; // tslint:disable-line

  @Prop()
  arrayPropertyWithInitializer: Array<any> = [0, 0, 0]; // tslint:disable-line

  @Prop({ reflectAsAttribute: false })
  stringPropertyWithNoReflection: string = '';

  @Prop({ reflectAsAttribute: false })
  numberPropertyWithNoReflection: number = 0;

  @Prop({ reflectAsAttribute: false })
  booleanPropertyWithNoReflection: boolean = false;

  @Prop({ reflectAsAttribute: true })
  objectPropertyWithReflection: object = {};

  @Prop({ reflectAsAttribute: true })
  arrayPropertyWithReflection: Array<any> = []; // tslint:disable-line

  @Prop()
  interceptableProperty: string = '';

  @Deprecated('Custom Message')
  deprecatedProperty: string = 'test';

  @Deprecated()
  get deprecatedPropertyGetSet():string {
    return 'test';
  }

  set deprecatedPropertyGetSet(_value: string) {
  }

  @Deprecated()
  deprecatedMethod() {

  }

  @Event({ name: 'change' })
  changeEvent: EventEmitter<string>;

  @Event()
  test: EventEmitter<string>;

  @Event('string')
  stringEvent: EventEmitter<string>
  
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

  watchGuard(_oldValue: any, _newValue: any) { // tslint:disable-line
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
