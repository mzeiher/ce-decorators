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

import { CustomElement } from './customelement';
import { Prop as PropS2, State as StateS2 } from './stage2/prop';
import { isStage2FieldDecorator, applyStage2ToLegacyFieldDecorator } from './stage2/stage2decorators';
import { PropertyOptions } from './propertyoptions';

/**
 * fixed decorator for babels initializer
 */
export type FixedPropertyDecorator = (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => any; // tslint:disable-line:no-any

/**
 * Property decorator, handles attribute reflection and type checking
 *
 * @param options initializer options for the property
 */
export function Prop(options?: PropertyOptions): FixedPropertyDecorator { // tslint:disable-line:function-name
  return (target: typeof CustomElement, propertyKey: string | symbol, descriptor?: PropertyDescriptor): PropertyDescriptor | any => { // tslint:disable-line:no-any
    if (isStage2FieldDecorator(target)) {
      if (options && !options.type) {
        throw new Error(`type not defined for property`);
      }
      return PropS2(options)(<any>target); // tslint:disable-line:no-any
    } else {
      if (!options || !options.type) {
        if (!options) { options = {}; }
        options.type = (<any>Reflect).getMetadata('design:type', target, propertyKey.toString()); // tslint:disable-line
      }
      return applyStage2ToLegacyFieldDecorator<CustomElement, typeof CustomElement>(target, propertyKey, descriptor, PropS2(options));
    }
  };
}

/**
 * State decorator, handles re-rendering but without attribute reflection
 */
export function State(): FixedPropertyDecorator { // tslint:disable-line:function-name
  return (target: typeof CustomElement, propertyKey: string | symbol, descriptor?: PropertyDescriptor): PropertyDescriptor | any => { // tslint:disable-line:no-any
    if (isStage2FieldDecorator(target)) {
      return StateS2()(<any>target); // tslint:disable-line:no-any
    } else {
      return applyStage2ToLegacyFieldDecorator<CustomElement, typeof CustomElement>(target, propertyKey, descriptor, StateS2());
    }
  };
}
