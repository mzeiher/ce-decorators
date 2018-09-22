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

import { Component, CustomElement, Event, EventEmitter, Prop, Watch } from './../../index';
import { html, TemplateResult } from 'lit-html';

@Component({
  tag: 'test-with-multiple-properties-with-type',
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
export class TestWithMultiplePropertiesWithType extends CustomElement {
  private internalPropertyString: string = '';
  private internalPropertyString2: string = '';

  private internalPropertyBoolean: boolean = false;
  private internalPropertyBoolean2: boolean = false;

  private internalPropertyObject: object = {};
  private internalPropertyObject2: object = {};

  @Prop({type: String})
  public get getPropertyStringTest(): string {
    return this.internalPropertyString;
  }

  public set getPropertyStringTest(value: string) {
    this.internalPropertyString = value;
  }

  public get setPropertyStringTest(): string {
    return this.internalPropertyString2;
  }

  @Prop({type: String})
  public set setPropertyStringTest(value: string) {
    this.internalPropertyString2 = value;
  }

  @Prop({type: Boolean})
  public get getPropertyBooleanTest(): boolean {
    return this.internalPropertyBoolean;
  }

  public set getPropertyBooleanTest(value: boolean) {
    this.internalPropertyBoolean = value;
  }

  public get setPropertyBooleanTest(): boolean {
    return this.internalPropertyBoolean2;
  }

  @Prop({type: Boolean})
  public set setPropertyBooleanTest(value: boolean) {
    this.internalPropertyBoolean2 = value;
  }

  @Prop({type: Object})
  public get getPropertyObjectTest(): object {
    return this.internalPropertyObject;
  }

  public set getPropertyObjectTest(value: object) {
    this.internalPropertyObject = value;
  }

  public get setPropertyObjectTest(): object {
    return this.internalPropertyObject2;
  }

  @Prop({type: Object})
  public set setPropertyObjectTest(value: object) {
    this.internalPropertyObject2 = value;
  }

  @Prop({type: String})
  public stringProperty: string;

  @Prop({
    defaultValue: 'test',
    type: String
  })
  public stringPropertyWithDefault: string;

  @Prop({type: String})
  public stringPropertyWithInitializer: string = 'test';

  @Prop({type: Boolean})
  public booleanProperty: boolean;

  @Prop({
    defaultValue: true,
    type: Boolean
  })
  public booleanPropertyWithDefault: boolean;

  @Prop({type: Boolean})
  public booleanPropertyWithInitializer: boolean = true;

  @Prop({type: Number})
  public numberProperty: number;

  @Prop({
    defaultValue: 0,
    type: Number
  })
  public numberPropertyWithDefault: number;

  @Prop({type: Number})
  public numberPropertyWithInitializer: number = 0;

  @Prop({type: Object})
  public objectProperty: {};

  @Prop({
    defaultValue: { test: 'default' },
    type: Object
  })
  public objectPropertyWithDefault: {};

  @Prop({type: Object})
  public objectPropertyWithInitializer: {} = { test: 'default' };

  @Prop({type: Array})
  public arrayProperty: any[];

  @Prop({
    defaultValue: [0, 0, 0],
    type: Array
  })
  public arrayPropertyWithDefault: any[];

  @Prop({type: Array})
  public arrayPropertyWithInitializer: any[] = [0, 0, 0];

  @Event('change')
  public changeEvent: EventEmitter<string>;

  @Event()
  public test: EventEmitter<string>;

  @Watch('stringProperty')
  public stringWatcher(oldValue: string, newValue: string): void {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('numberProperty')
  public numberWatcher(oldValue: number, newValue: number): void {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('booleanProperty')
  public booleanWatcher(oldValue: boolean, newValue: boolean): void {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('objectProperty')
  public objectWatcher(oldValue: object, newValue: object): void {
    this.watchGuard(oldValue, newValue);
  }

  @Watch('arrayProperty')
  public arrayWatcher(oldValue: Array<any>, newValue: Array<any>): void {
    this.watchGuard(oldValue, newValue);
  }

  public watchGuard(_oldValue: any, _newValue: any): void {
  }

  protected render(): TemplateResult {
    return html`<div>${this.stringPropertyWithDefault}</div>
                     <div>${this.numberPropertyWithDefault}</div>
                     <div>${this.booleanPropertyWithDefault}</div>
                     <div>${JSON.stringify(this.objectPropertyWithDefault)}</div>
                     <div>${JSON.stringify(this.arrayPropertyWithDefault)}</div>`;
  }
}
