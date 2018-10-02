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
import { componentS2 } from './../../component.stage2';
import { propS2 } from './../../prop.stage2';
import {
  html,
  // TemplateResult
} from 'lit-html';
import {
  classMap
} from 'lit-html/directives/classMap';

@componentS2({
  tag: 'test-with-multiple-properties-with-type-stage2-base'
})
export class TestWithMultiplePropertiesWithTypeStage2Base extends CustomElement {

  @propS2({type: String})
  baseProperty = 'test';
}

@componentS2({
  tag: 'test-with-multiple-properties-with-type-stage2',
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
export class TestWithMultiplePropertiesWithTypeStage2 extends TestWithMultiplePropertiesWithTypeStage2Base {

  @propS2({
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

  // @Prop({
  //   type: String
  // })
  set setPropertyStringTest(value) {
    this.internalPropertyString2 = value;
  }

  // @Prop({
  //   type: Boolean
  // })
  get getPropertyBooleanTest() {
    return this.internalPropertyBoolean;
  }

  set getPropertyBooleanTest(value) {
    this.internalPropertyBoolean = value;
  }

  get setPropertyBooleanTest() {
    return this.internalPropertyBoolean2;
  }

  // @Prop({
  //   type: Boolean
  // })
  set setPropertyBooleanTest(value) {
    this.internalPropertyBoolean2 = value;
  }

  // @Prop({
  //   type: Object
  // })
  get getPropertyObjectTest() {
    return this.internalPropertyObject;
  }

  set getPropertyObjectTest(value) {
    this.internalPropertyObject = value;
  }

  get setPropertyObjectTest() {
    return this.internalPropertyObject2;
  }

  // @Prop({
  //   type: Object
  // })
  set setPropertyObjectTest(value) {
    this.internalPropertyObject2 = value;
  }

  // @Prop({
  //   type: String
  // })
  stringProperty;

  // @Prop({
  //   defaultValue: 'test',
  //   type: String
  // })
  stringPropertyWithDefault;

  // @Prop({
  //   type: String
  // })
  stringPropertyWithInitializer = 'test';

  // @Prop({
  //   type: Boolean
  // })
  booleanProperty;

  // @Prop({
  //   defaultValue: true,
  //   type: Boolean
  // })
  booleanPropertyWithDefault;

  // @Prop({
  //   type: Boolean
  // })
  booleanPropertyWithInitializer = true;

  // @Prop({
  //   type: Number
  // })
  numberProperty;

  // @Prop({
  //   defaultValue: 0,
  //   type: Number
  // })
  numberPropertyWithDefault;

  // @Prop({
  //   type: Number
  // })
  numberPropertyWithInitializer = 0;

  // @Prop({
  //   type: Object
  // })
  objectProperty;

  // @Prop({
  //   defaultValue: {
  //     test: 'default'
  //   },
  //   type: Object
  // })
  objectPropertyWithDefault;

  // @Prop({
  //   type: Object
  // })
  objectPropertyWithInitializer = {
    test: 'default'
  };

  // @Prop({
  //   type: Array
  // })
  arrayProperty;

  // @Prop({
  //   defaultValue: [0, 0, 0],
  //   type: Array
  // })
  arrayPropertyWithDefault;

  // @Prop({
  //   type: Array
  // })
  arrayPropertyWithInitializer = [0, 0, 0];
  // @Prop({
  //   reflectAsAttribute: false,
  //   type: String
  // })
  stringPropertyWithNoReflection = '';

  // @Prop({
  //   reflectAsAttribute: false,
  //   type: Number
  // })
  numberPropertyWithNoReflection = 0;

  // @Prop({
  //   reflectAsAttribute: false,
  //   type: Boolean
  // })
  booleanPropertyWithNoReflection = false;

  // @Prop({
  //   reflectAsAttribute: true,
  //   type: Object
  // })
  objectPropertyWithReflection = {};

  // @Prop({
  //   reflectAsAttribute: true,
  //   type: Array
  // })
  arrayPropertyWithReflection = [];

  // @Event('change')
  changeEvent;

  // @Event('test')
  test;

  // @State()
  shouldHaveClass = false;

  internalPropertyString = '';
  internalPropertyString2 = '';

  internalPropertyBoolean = false;
  internalPropertyBoolean2 = false;

  internalPropertyObject = {};
  internalPropertyObject2 = {};

  // @Watch('stringProperty')
  stringWatcher(oldValue, newValue) {
    this.watchGuard(oldValue, newValue);
  }

  // @Watch('numberProperty')
  numberWatcher(oldValue, newValue) {
    this.watchGuard(oldValue, newValue);
  }

  // @Watch('booleanProperty')
  booleanWatcher(oldValue, newValue) {
    this.watchGuard(oldValue, newValue);
  }

  // @Watch('objectProperty')
  objectWatcher(oldValue, newValue) {
    this.watchGuard(oldValue, newValue);
  }

  // @Watch('arrayProperty')
  arrayWatcher(oldValue, newValue) {
    this.watchGuard(oldValue, newValue);
  }

  watchGuard(_oldValue, _newValue) {}

  render() {
    return html `<div class=${classMap({ hasclass: this.shouldHaveClass })}>${this.stringPropertyWithDefault}</div>
                     <div>${this.numberPropertyWithDefault}</div>
                     <div>${this.booleanPropertyWithDefault}</div>
                     <div>${JSON.stringify(this.objectPropertyWithDefault)}</div>
                     <div>${JSON.stringify(this.arrayPropertyWithDefault)}</div>`;
  }
}
