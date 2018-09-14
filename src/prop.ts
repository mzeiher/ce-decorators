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
import { getPropertyOptions, PropDescriptor } from './propertymap';
import { camelToKebapCase, deserializeValue, serializeValue } from './utils';
import { getValue, ValueMapType } from './valuemap';
import { getWatcher } from './watchmap';
import { STATE } from './state';

export type PropertyType = Boolean | Number | String | Object | Array<any> | undefined;

export type FixedPropertyDecorator = (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => any;

export interface PropertyOptions {
  reflectAsAttribute?: boolean;
  readonly?: boolean;
  defaultValue?: number | string | boolean | object | null;
  type?: PropertyType; // tslint:disable-line
}

/**
 * Property decorator, handles attribute reflection and type checking
 *
 * @param options initializer options for the property
 */
export function Prop(options?: PropertyOptions): FixedPropertyDecorator { // tslint:disable-line:function-name
  return ((scopedOptions: PropertyOptions = {}): FixedPropertyDecorator => {
    return <Clazz extends CustomElement>(target: Clazz,
      propertyKey: string | symbol,
      descriptor?: PropertyDescriptor): PropertyDescriptor => {

      const attributeKey: string = camelToKebapCase(propertyKey.toString());

      if (!scopedOptions.type) {
        scopedOptions.type = ReflectPoorlyFill.getMetadata('design:type', target, propertyKey.toString()); // tslint:disable-line
      }

      const entry: Map<string, PropDescriptor> = getPropertyOptions(target);

      const propertyDescriptor: PropertyDescriptor = descriptor || {
        configurable: true,
        enumerable: false
      };

      const originalSetter: ((v: any) => void) | undefined = descriptor ? descriptor.set : undefined;

      propertyDescriptor.set = function (this: CustomElement, newValue: string | number | boolean | object | null): void {// tslint:disable-line
        if (scopedOptions.readonly) {
          throw new Error('property is readonly');
        }
        const valMap: ValueMapType | undefined = getValue(this);
        valMap!.dirty = true;
        if (valMap!.state === STATE.INIT) {
          scopedOptions.defaultValue = newValue;
        } else if (scopedOptions.type === Number || scopedOptions.type === String || scopedOptions.reflectAsAttribute) {
          const value: string | null = serializeValue(newValue, scopedOptions.type);
          if (value === null) {
            this.removeAttribute(attributeKey);
          } else {
            this.setAttribute(attributeKey, value);
          }
        } else if (scopedOptions.type === Boolean) {
          if (newValue) {
            this.setAttribute(attributeKey, 'true');
          } else {
            this.removeAttribute(attributeKey);
          }
          valMap!.properties[propertyKey.toString()] = true;
        } else {
          const oldValue: string | boolean | number | object = (<any>this)[propertyKey.toString()];
          const watcher: (() => void)[] | undefined = getWatcher(target, propertyKey.toString());
          watcher!.forEach((callback: (oldValue: any, newValue: any) => void) => {
            callback.apply(this, [oldValue, newValue]);
          });
          if (originalSetter) {
            originalSetter.apply(this, [newValue]);
          } else {
            valMap!.properties[propertyKey.toString()] = newValue;
          }
          this.render();
        }
      };

      if (!descriptor && !propertyDescriptor.get) {
        propertyDescriptor.get = function (this: CustomElement): string | number | boolean | object | null { // tslint:disable-line
          const valMap: ValueMapType | undefined = getValue(this);
          if (scopedOptions.type === Number || scopedOptions.type === String || scopedOptions.reflectAsAttribute) {
            return deserializeValue(this.getAttribute(attributeKey) || `${(scopedOptions.defaultValue !== undefined ? scopedOptions.defaultValue : null)}`, scopedOptions.type); // tslint:disable-line
          } else if (scopedOptions.type === Boolean) { // special case get from property to determine default value
            if (valMap!.properties[propertyKey.toString()] !== undefined) {
              return this.hasAttribute(attributeKey);
            } else {
              return scopedOptions.defaultValue !== undefined ? scopedOptions.defaultValue : null;
            }
          } else {
            return valMap!.properties[propertyKey.toString()] ||
              (scopedOptions.defaultValue !== undefined ? scopedOptions.defaultValue : null);
          }
        };
      }

      if (!entry.has(propertyKey.toString())) {
        entry.set(propertyKey.toString(), {
          descriptor: propertyDescriptor,
          type: scopedOptions.type,
          options: scopedOptions,
          originalSetter: originalSetter
        });
      }

      return propertyDescriptor;

    };
  })(options);
}
