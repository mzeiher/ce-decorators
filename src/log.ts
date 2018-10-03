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
import { isStage2MethodDecorator, isStage2FieldDecorator, applyLegacyToStage2FieldDecorator } from './stage2decorators';
import { logS2 } from './log.stage2';

/**
 * Registers a watcher for property changes
 *
 * @param property property to watch
 */
export function Log(): any {
  return (target: typeof Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> | any | void => {
    if(isStage2MethodDecorator(target) || isStage2FieldDecorator(target)) {
      return logS2()(<any>target);
    } else {
      return applyLegacyToStage2FieldDecorator(target, propertyKey, descriptor, logS2());
    }
  };
}
