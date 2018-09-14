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
  private internalPropertyString: string = '';
  private internalPropertyString2: string = '';

  private internalPropertyBoolean: boolean = false;
  private internalPropertyBoolean2: boolean = false;

  private internalPropertyObject: object = {};
  private internalPropertyObject2: object = {};

  @Prop()
  public get getPropertyStringTest(): string {
    return this.internalPropertyString;
  }

  public set getPropertyStringTest(value: string) {
    this.internalPropertyString = value;
  }

  public get setPropertyStringTest(): string {
    return this.internalPropertyString2;
  }

  @Prop()
  public set setPropertyStringTest(value: string) {
    this.internalPropertyString2 = value;
  }

  @Prop()
  public get getPropertyBooleanTest(): boolean {
    return this.internalPropertyBoolean;
  }

  public set getPropertyBooleanTest(value: boolean) {
    this.internalPropertyBoolean = value;
  }

  public get setPropertyBooleanTest(): boolean {
    return this.internalPropertyBoolean2;
  }

  @Prop()
  public set setPropertyBooleanTest(value: boolean) {
    this.internalPropertyBoolean2 = value;
  }

  @Prop()
  public get getPropertyObjectTest(): object {
    return this.internalPropertyObject;
  }

  public set getPropertyObjectTest(value: object) {
    this.internalPropertyObject = value;
  }

  public get setPropertyObjectTest(): object {
    return this.internalPropertyObject2;
  }

  @Prop()
  public set setPropertyObjectTest(value: object) {
    this.internalPropertyObject2 = value;
  }

  @Prop()
  public stringProperty: string;

  @Prop({
    defaultValue: 'test'
  })
  public stringPropertyWithDefault: string;

  @Prop()
  public stringPropertyWithInitializer: string = 'test';

  @Prop()
  public booleanProperty: boolean;

  @Prop({
    defaultValue: true
  })
  public booleanPropertyWithDefault: boolean;

  @Prop()
  public booleanPropertyWithInitializer: boolean = true;

  @Prop()
  public numberProperty: number;

  @Prop({
    defaultValue: 0
  })
  public numberPropertyWithDefault: number;

  @Prop()
  public numberPropertyWithInitializer: number = 0;

  @Prop()
  public objectProperty: {};

  @Prop({
    defaultValue: { test: 'default' }
  })
  public objectPropertyWithDefault: {};

  @Prop()
  public objectPropertyWithInitializer: {} = { test: 'default' };

  @Prop()
  public arrayProperty: any[];

  @Prop({
    defaultValue: [0, 0, 0]
  })
  public arrayPropertyWithDefault: any[];

  @Prop()
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

  protected render(): void {
    this.renderToDom`<div>${this.stringPropertyWithDefault}</div>
                     <div>${this.numberPropertyWithDefault}</div>
                     <div>${this.booleanPropertyWithDefault}</div>
                     <div>${JSON.stringify(this.objectPropertyWithDefault)}</div>
                     <div>${JSON.stringify(this.arrayPropertyWithDefault)}</div>`;
  }
}
