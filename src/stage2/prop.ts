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

import { Stage2FieldDecorator, MethodDecoratorResult, FieldDecoratorDescriptor, FieldDecoratorResult } from './stage2decorators';
import { CustomElement, IndexableElement } from '../customelement';
import { getClassProperties } from '../classproperties';
import { PROPERTY_STATE } from '../propertystate';
import { PropertyOptions } from '../propertyoptions';

/**
 * stage-2 state decorators
 */
export function State(): Stage2FieldDecorator<CustomElement, typeof CustomElement> {
  return Prop({ reflectAsAttribute: false, type: undefined });
}

/**
 * stage-2 prop decorator
 * @param _options 
 */
export function Prop(_options: PropertyOptions): Stage2FieldDecorator<CustomElement, typeof CustomElement> {
  return (descriptor: FieldDecoratorDescriptor): FieldDecoratorResult<CustomElement, typeof CustomElement> | MethodDecoratorResult<CustomElement, typeof CustomElement> => {

    const key = typeof descriptor.key === 'symbol' ? Symbol() : `__${descriptor.key}`;
    if (descriptor.kind === 'field') {

      return {
        kind: 'method',
        descriptor: {
          configurable: true,
          enumerable: false,
          get(this: CustomElement) {
            return (<any>this)[key]; // tslint:disable-line:no-any
          },
          set(this: CustomElement, value: any) { // tslint:disable-line:no-any
            if (this._propertyState === PROPERTY_STATE.UPDATE_PROPERTY) {
              (<any>this)[key] = value; // tslint:disable-line:no-any
            } else {
              (this.constructor as typeof CustomElement)._fromProperty(descriptor.key.toString(), (<IndexableElement>this)[descriptor.key.toString()], value, this);
            }
          },
        },
        key: descriptor.key,
        placement: 'own',
        extras: [{
          placement: 'own',
          initializer: descriptor.initializer,
          key,
          descriptor: {
            enumerable: false,
            configurable: true,
            writable: true,
          },
          kind: 'field',
        }],
        finisher: (target: typeof CustomElement) => {
          if (!CustomElement.isPrototypeOf(target)) {
            throw new Error(`${target.name} the property must be within a class which extends CustomElement`);
          }
          if (!_options) {
            _options = {};
          }
          if (!_options.type) {
            _options.type = (<any>Reflect).getMetadata('design:type', target.prototype, descriptor.key.toString()); // tslint:disable-line
          }
          getClassProperties(target).set(descriptor.key, _options);
        },
      };
    } else {
      return {
        kind: 'method',
        descriptor: {
          configurable: true,
          enumerable: false,
          get(this: CustomElement) {
            return descriptor.descriptor.get.apply(this);
          },
          set(this: CustomElement, value: any) { // tslint:disable-line:no-any
            if (this._propertyState === PROPERTY_STATE.UPDATE_PROPERTY) {
              descriptor.descriptor.set.apply(this, [value]);
            } else {
              (this.constructor as typeof CustomElement)._fromProperty(descriptor.key.toString(), (<IndexableElement>this)[descriptor.key.toString()], value, this);
            }
          },
        },
        key: descriptor.key,
        placement: 'own',
        initializer: descriptor.initializer,
        finisher: (target: typeof CustomElement) => {
          if (!CustomElement.isPrototypeOf(target)) {
            throw new Error(`${target.name} the property must be within a class which extends CustomElement`);
          }
          if (!_options) {
            _options = {};
          }
          getClassProperties(target).set(descriptor.key, _options);
        },
      };
    }
  };
}
