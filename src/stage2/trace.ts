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

import { Stage2FieldDecorator, FieldDecoratorDescriptor } from './stage2decorators';

/**
 * trace stage-2 decorator
 */
export function Trace(): Stage2FieldDecorator<Object, typeof Object> {
  return (descriptor: FieldDecoratorDescriptor) => {
    if (descriptor.kind === 'field') {
      const key = `___${descriptor.key.toString()}`;
      return {
        extras: [
          {
            key,
            kind: 'field',
            placement: 'own',
            initializer: descriptor.initializer,
            descriptor: {
              configurable: true,
              enumerable: false,
              writable: true,
            },
          },
        ],
        key: descriptor.key,
        kind: 'method',
        placement: 'own',
        descriptor: {
          configurable: true,
          enumerable: false,
          get(this: Object) {
            console.log(`[LOG] [${this.constructor.name}] setter called on property ${descriptor.key.toString()}`); // tslint:disable-line
            return (<any>this)[key]; // tslint:disable-line:no-any
          },
          set(this: Object, value: any) { // tslint:disable-line:no-any
            console.log(`[LOG] [${this.constructor.name}] setter called on property ${descriptor.key.toString()} with value ${value}`); // tslint:disable-line
            (<any>this)[key] = value; // tslint:disable-line:no-any
          },
        },
      };
    } else {
      return {
        kind: 'method',
        descriptor: descriptor.descriptor.value ? {
          configurable: true,
          enumerable: false,
          value(...args: Array<any>) { // tslint:disable-line:no-any
            console.log(`[LOG] [${this.constructor.name}] method ${descriptor.key.toString()} calles with args`, [...args]); // tslint:disable-line
            descriptor.descriptor.value.apply(this, [...args]); // tslint:disable-line
          },
        } : {
          configurable: true,
          enumerable: false,
          get(this: Object) {
            console.log(`[LOG] [${this.constructor.name}] setter called on property ${descriptor.key.toString()}`); // tslint:disable-line
            return descriptor.descriptor.get.apply(this);
          },
          set(this: Object, value: any) { // tslint:disable-line:no-any
            console.log(`[LOG] [${this.constructor.name}] setter called on property ${descriptor.key.toString()} with value ${value}`); // tslint:disable-line
            descriptor.descriptor.set.apply(this, [value]);
          },
        },
        key: descriptor.key,
        placement: 'own',
        extras: [] // tslint:disable-line
      };
    }
  };
}
