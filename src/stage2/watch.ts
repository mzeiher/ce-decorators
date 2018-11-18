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

import { Stage2MethodDecorator, MethodDecoratorDesciptor, MethodDecoratorResult } from './stage2decorators';
import { CustomElement } from '../customelement';
import { getClassPropertyWatcher } from '../classpropertywatcher';

/**
 * stage 2 property watch decorator
 * @param propertyKey 
 */
export function Watch(propertyKey: string): Stage2MethodDecorator<CustomElement, typeof CustomElement> {
  return (descriptor: MethodDecoratorDesciptor): MethodDecoratorResult<CustomElement, typeof CustomElement> => {
    return {
      ...descriptor,
      finisher: (target: typeof CustomElement) => {
        if (!CustomElement.isPrototypeOf(target)) {
          throw new Error(`${target.name} the property must be within a class which extends CustomElement`);
        }
        getClassPropertyWatcher(target, propertyKey).push(descriptor.descriptor.value); // tslint:disable-line
      },
    };
  };

}
