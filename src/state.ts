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
import './reflect'; // tslint:disable-line

import { CustomElement } from './element';
import { getValue, ValueMapType } from './valuemap';
import { COMPONENT_STATE } from './componentstate';

export type PropertyType = Boolean | Number | String | Object | Array<any> | undefined;

export type FixedPropertyDecorator = (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => any;

/**
 * Property decorator, handles attribute reflection and type checking
 *
 * @param options initializer options for the property
 */
export function State(): FixedPropertyDecorator { // tslint:disable-line:function-name
  return <Clazz extends CustomElement>(_target: Clazz,
    propertyKey: string | symbol,
    descriptor?: PropertyDescriptor): PropertyDescriptor => {

    let defaultValue: undefined | null | string | number | object | boolean = undefined;
    // for babel transpiled decorators
    if (descriptor && (<any>descriptor)['initializer'] && typeof (<any>descriptor)['initializer'] === 'function') {
      defaultValue = ((<any>descriptor)['initializer'])();
    }

    const propertyDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: true,
    };

    const originalSetter: ((v: any) => void) | undefined = descriptor ? descriptor.set : undefined;

    propertyDescriptor.set = function (this: CustomElement, newValue: string | number | boolean | object | null): void {// tslint:disable-line
      const oldValue: string | boolean | number | object = (<any>this)[propertyKey.toString()];
      if (oldValue === newValue) {
        return;
      }
      const valMap: ValueMapType | undefined = getValue(this);
      valMap!.dirty = true;
      if (valMap!.state === COMPONENT_STATE.INIT) {
        defaultValue = newValue;
      } else {
        if (originalSetter) {
          originalSetter.apply(this, [newValue]);
        } else {
          valMap!.properties[propertyKey.toString()] = newValue;
        }
        this.render();
      }

    };

    if (!descriptor || !descriptor.get) {
      propertyDescriptor.get = function (this: CustomElement): string | number | boolean | object | null { // tslint:disable-line
        const valMap: ValueMapType | undefined = getValue(this);
        const value = valMap!.properties[propertyKey.toString()];
        return value !== undefined ? value : defaultValue;
      };
    } else {
      propertyDescriptor.get = descriptor.get;
    }

    return propertyDescriptor;

  };
}
