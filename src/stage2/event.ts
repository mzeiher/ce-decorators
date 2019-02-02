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
import { getClassEvents } from '../classevents';
import { EventEmitter } from '../eventemitter';
import { EventOptions } from '../eventoptions';

/**
 * stage-2 decorator for events
 * @param name 
 */
export function Event(options?: EventOptions | string): Stage2FieldDecorator<CustomElement, typeof CustomElement> { // tslint:disable-line
  return (descriptor: FieldDecoratorDescriptor): FieldDecoratorResult<CustomElement, typeof CustomElement> | MethodDecoratorResult<CustomElement, typeof CustomElement> => {
    let optionsObject: EventOptions = <EventOptions>options;
    if (typeof options === 'undefined') {
      optionsObject = { name: descriptor.key.toString() };
    } else if (typeof options === 'string') { // legacy mode
      optionsObject = { name: <string>options };
    } else if (typeof optionsObject.options === 'undefined') {
      optionsObject.options = { cancelable: false, bubbles: true };
    }
    if (descriptor.kind === 'field') {
      return {
        kind: 'method',
        descriptor: {
          configurable: true,
          enumerable: false,
          get(this: CustomElement): EventEmitter<any> { // tslint:disable-line:no-any
            return {
              emit: (value: any): void => { // tslint:disable-line:no-any
                const customEvent: CustomEvent = new CustomEvent(optionsObject.name, { ...optionsObject.options, detail: value });
                this.dispatchEvent(customEvent);
              },
            };
          },
        },
        key: descriptor.key,
        placement: 'own',
        finisher: (target) => {
          getClassEvents(target).set(descriptor.key.toString(), name || descriptor.key.toString());
        },
      };
    } else {
      throw new Error('only fields can be decorated with event');
    }
  };
}
