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

import { CustomElement } from './customelement';
import { isStage2FieldDecorator, applyLegacyToStage2FieldDecorator } from './stage2/stage2decorators';
import { Event as Events2 } from './stage2/event';

/**
 * PropertyDecorator -> fixed for babel initializer
 */
export type FixedPropertyDecorator = (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => any; // tslint:disable-line:no-any

/**
 * Event decorator for an event emitter, compatible with stage-0, TS and stage-2 decorators
 *
 * @param name (string) optional: name of the event, if no state, property name will be used
 */
export function Event(name?: string): FixedPropertyDecorator { // tslint:disable-line:function-name
  return (target: typeof CustomElement, propertyKey: string | symbol, descriptor?: PropertyDescriptor): PropertyDescriptor | any => { // tslint:disable-line:no-any
    if (isStage2FieldDecorator(target)) {
      return Events2(name)(<any>target); // tslint:disable-line:no-any
    } else {
      return applyLegacyToStage2FieldDecorator<CustomElement, typeof CustomElement>(target, propertyKey, descriptor, Events2(name));
    }
  };
}
