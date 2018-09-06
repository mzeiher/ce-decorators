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

import { CustomElement } from './element';

/**
 * base interface for event emitter
 */
export interface EventEmitter<T> {
  emit(payload: T): void;
}

export interface EventOptions {
  name?: string;
}

/**
 * Event decorator for an event emitter
 *
 * @param name (string) optional: name of the event, if no state, property name will be used
 */
export function Event(name?: string): PropertyDecorator { // tslint:disable-line:function-name
  return ((scopedOptions?: string): PropertyDecorator => {
    return <Clazz extends CustomElement>(target: Clazz, propertyKey: string | symbol): void => {

      const getter = function (this: CustomElement): EventEmitter<any> { // tslint:disable-line
        return {
          emit: (value: any): void => {
            const customEvent: CustomEvent = new CustomEvent(scopedOptions || propertyKey.toString().toLowerCase(),
                                                             { bubbles: true, detail: value });
            this.dispatchEvent(customEvent);
          }
        };
      };
      Object.defineProperty(target, propertyKey, {
        enumerable: true,
        get: getter
      });

    };
  })(name);
}
