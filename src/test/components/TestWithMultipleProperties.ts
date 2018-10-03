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

import { CustomElement } from '../../customelement.stage2';
import { Component } from './../../component';
import { Prop, State } from './../../prop';
import { Watch } from './../../watch'
import { Event } from './../../event';

import {
  html,
  // TemplateResult
} from 'lit-html';
import {
  classMap
} from 'lit-html/directives/classMap';
import { EventEmitter } from '../../event.stage2';

@Component({
  tag: 'test-with-multiple-properties-base',
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
  }`
})
export class TestWithMultiplePropertiesBase extends CustomElement {

  @Prop({ type: String })
  baseProperty = 'test';

  render() {
    return html`<div>${this.baseProperty}</div>`
  }
}

@Component({
  tag: 'test-with-multiple-properties',
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
  `
})
export class TestWithMultipleProperties extends TestWithMultiplePropertiesBase {

  @Prop({
    type: String
  })
  get getPropertyStringTest() {
    return this.internalPropertyString;
  }

  set getPropertyStringTest(value) {
    this.internalPropertyString = value;
  }

  get setPropertyStringTest() {
    return this.internalPropertyString2;
  }

  @Prop({
    type: String
  })
  set setPropertyStringTest(value) {
    this.internalPropertyString2 = value;
  }

  @Prop({
    type: Boolean
  })
  get getPropertyBooleanTest() {
    return this.internalPropertyBoolean;
  }

  set getPropertyBooleanTest(value) {
    this.internalPropertyBoolean = value;
  }

  get setPropertyBooleanTest() {
    return this.internalPropertyBoolean2;
  }

  @Prop({
    type: Boolean
  })
  set setPropertyBooleanTest(value) {
    this.internalPropertyBoolean2 = value;
  }

  @Prop({
    type: Object
  })
  get getPropertyObjectTest() {
    return this.internalPropertyObject;
  }

  set getPropertyObjectTest(value) {
    this.internalPropertyObject = value;
  }

  get setPropertyObjectTest() {
    return this.internalPropertyObject2;
  }

  @Prop({
    type: Object
  })
  set setPropertyObjectTest(value) {
    this.internalPropertyObject2 = value;
  }

  @Prop({
    type: String
  })
  stringProperty: string;

  @Prop({
    type: String
  })
  stringPropertyWithInitializer = 'test';

  @Prop({
    type: Boolean
  })
  booleanProperty: boolean;

  @Prop({
    type: Boolean
  })
  booleanPropertyWithInitializer = true;

  @Prop({
    type: Number
  })
  numberProperty: number;

  @Prop({
    type: Number
  })
  numberPropertyWithInitializer = 0;

  @Prop({
    type: Object
  })
  objectProperty: object;

  @Prop({
    type: Object
  })
  objectPropertyWithInitializer = {
    test: 'default'
  };

  @Prop({
    type: Array
  })
  arrayProperty:Array<any>;

  @Prop({
    type: Array
  })
  arrayPropertyWithInitializer = [0, 0, 0];

  @Prop({
    reflectAsAttribute: false,
    type: String
  })
  stringPropertyWithNoReflection = '';

  @Prop({
    reflectAsAttribute: false,
    type: Number
  })
  numberPropertyWithNoReflection = 0;

  @Prop({
    reflectAsAttribute: false,
    type: Boolean
  })
  booleanPropertyWithNoReflection = false;

  @Prop({
    reflectAsAttribute: true,
    type: Object
  })
  objectPropertyWithReflection = {};

  @Prop({
    reflectAsAttribute: true,
    type: Array
  })
  arrayPropertyWithReflection:Array<any> = [];

  @Event('change')
  changeEvent:EventEmitter<string>;

  @Event('test')
  test:EventEmitter<string>;

  @State()
  shouldHaveClass = false;

  internalPropertyString = '';
  internalPropertyString2 = '';

  internalPropertyBoolean = false;
  internalPropertyBoolean2 = false;

  internalPropertyObject = {};
  internalPropertyObject2 = {};

  @Watch('stringProperty')
  stringWatcher(oldValue:string, newValue:string) {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('numberProperty')
  numberWatcher(oldValue:number, newValue:number) {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('booleanProperty')
  booleanWatcher(oldValue:boolean, newValue:boolean) {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('objectProperty')
  objectWatcher(oldValue:object, newValue:object) {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('arrayProperty')
  arrayWatcher(oldValue:Array<any>, newValue: Array<any>) {
    this.watchGuard(oldValue, newValue);
  }

  watchGuard(_oldValue:any, _newValue:any) {
    console.log(`${_oldValue} - ${_newValue}`);
  }

  render() {
    return html`<div class=${classMap({ hasclass: this.shouldHaveClass })}>${this.baseProperty}</div>
                <div>${this.stringPropertyWithDefault}</div>
                <div>${this.numberPropertyWithDefault}</div>
                <div>${this.booleanPropertyWithDefault}</div>
                <div>${JSON.stringify(this.objectPropertyWithDefault)}</div>
                <div>${JSON.stringify(this.arrayPropertyWithDefault)}</div>`;
  }
}
