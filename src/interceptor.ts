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
import { isStage2MethodDecorator, applyStage2ToLegacyMethodDecorator } from './stage2/stage2decorators';
import { Interceptor as InterceptorS2 } from './stage2/interceptor';

/**
 * Registers a interceptor for property changes
 *
 * @param property property to intercept
 */
export function Interceptor(property: string): MethodDecorator { // tslint:disable-line
  // tslint:disable-next-line
  return (target: typeof CustomElement, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> | any | void => {
    if (isStage2MethodDecorator(target)) {
      return InterceptorS2(property)(<any>target); // tslint:disable-line
    } else {
      return applyStage2ToLegacyMethodDecorator(target, propertyKey, descriptor, InterceptorS2(property));
    }
  };
}
