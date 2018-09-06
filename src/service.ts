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

import { getInstance, getSingleton } from './servicemap';

/**
 * Simple dependency injection decorator
 *
 * @param newInstance (boolean) determines if a new instance should be created
 */
export function Inject(newInstance: boolean = false): PropertyDecorator {
  return ((scopedNewInstance: boolean): PropertyDecorator => (target: Object, propertyKey: string | symbol): void => {
    const type = ReflectPoorlyFill.getMetadata('design:type', target, propertyKey.toString()); // tslint:disable-line

    Object.defineProperty(target, propertyKey, {
      // tslint:disable-next-line:no-function-expression
      get: function (this: Object): any {
        if (scopedNewInstance) {
          return getInstance(this, propertyKey, type);
        } else {
          return getSingleton(type);
        }
      }
    });
  })(newInstance);
}
