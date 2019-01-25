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

import { isStage2MethodDecorator, isStage2FieldDecorator, applyStage2ToLegacyFieldDecorator } from './stage2/stage2decorators';
import { Deprecated as DeprecatedS2 } from './stage2/deprecated';
import { FixedPropertyDecorator } from './prop';

/**
 * Emits a deprecated warning
 */
export function Deprecated(message?: string): FixedPropertyDecorator { // tslint:disable-line
  return (target: typeof Object,
          propertyKey: string | symbol,
          descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> | any | void => { // tslint:disable-line:no-any
    if (isStage2MethodDecorator(target) || isStage2FieldDecorator(target)) {
      return DeprecatedS2(message)(<any>target); // tslint:disable-line:no-any
    } else {
      return applyStage2ToLegacyFieldDecorator(target, propertyKey, descriptor, DeprecatedS2(message));
    }
  };
}
