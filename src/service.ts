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

import { InjectOptions, injectS2 } from './inject.stage2';
import { CustomElement } from './customelement.stage2';
import { isStage2FieldDecorator, applyLegacyToStage2FieldDecorator } from './stage2decorators';

export type FixedPropertyDecorator = (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => any;

/**
 * Simple dependency injection decorator
 *
 * @param newInstance (boolean) determines if a new instance should be created
 */
export function Inject(options: InjectOptions = { singleton: true, type: Object }): FixedPropertyDecorator {
  return (target: typeof CustomElement, propertyKey: string | symbol, descriptor?: PropertyDescriptor): PropertyDescriptor | any => {
    if (isStage2FieldDecorator(target)) {
      return injectS2(options);
    } else {
      return applyLegacyToStage2FieldDecorator<CustomElement, typeof CustomElement>(target, propertyKey, descriptor, injectS2(options));
    }
  };
}
