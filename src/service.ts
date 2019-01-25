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

import { Inject as InjectS2 } from './stage2/inject';
import { CustomElement } from './customelement';
import { isStage2FieldDecorator, applyStage2ToLegacyFieldDecorator } from './stage2/stage2decorators';
import { InjectOptions } from './injectoptions';

/**
 * fixed prop decorator
 */
export type FixedPropertyDecorator = (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => any; // tslint:disable-line

/**
 * Simple dependency injection decorator
 *
 * @param newInstance (boolean) determines if a new instance should be created
 */
export function Inject(options: InjectOptions = { singleton: true, type: Object }): FixedPropertyDecorator { // tslint:disable-line
  return (target: typeof CustomElement, propertyKey: string | symbol, descriptor?: PropertyDescriptor): PropertyDescriptor | any => { // tslint:disable-line
    if (isStage2FieldDecorator(target)) {
      return InjectS2(options)(<any>target); // tslint:disable-line
    } else {
      return applyStage2ToLegacyFieldDecorator<CustomElement, typeof CustomElement>(target, propertyKey, descriptor, InjectS2(options));
    }
  };
}
