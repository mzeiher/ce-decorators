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

import { Stage2FieldDecorator, FieldDecoratorDescriptor, FieldDecoratorResult, MethodDecoratorResult } from './stage2decorators';
import { CustomElement } from '../customelement';
import { getSingleton, getInstance } from '../servicemap';
import { InjectOptions } from '../injectoptions';

export function Inject(options: InjectOptions): Stage2FieldDecorator<CustomElement, typeof CustomElement> {
  return (descriptor: FieldDecoratorDescriptor): FieldDecoratorResult<CustomElement, typeof CustomElement> | MethodDecoratorResult<CustomElement, typeof CustomElement> => {
    if (descriptor.kind === 'field') {
      return {
        kind: "method",
        descriptor: {
          configurable: true,
          enumerable: false,
          get: function (this: CustomElement): object {
            if (options.singleton) {
              return getSingleton(options.type);
            } else {
              return getInstance(this, descriptor.key, options.type);
            }
          },
        },
        key: descriptor.key,
        placement: 'own'
      }
    } else {
      throw new Error('only fields can be decorated with event');
    }
  }
}

