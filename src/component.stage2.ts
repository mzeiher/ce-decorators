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

import { Stage2ClassDecorator, ClassDecoratorDescriptor, ClassDecoratorResult } from './stage2decorators';
import { CustomElement } from './customelement.stage2';
import { getClassProperties } from './classproperties.stage2';
import { PropertyOptions } from './prop.stage2';
import { setComponentProperties, getComponentProperties } from './componentproperties.stage2';
import { getAllClassPropertyWatcher, getClassPropertyWatcher } from './classpropertywatcher.stage2';
import { getClassPropertyInterceptor, getAllClassPropertyInterceptors } from './classpropertyinterceptors.stage2';
import { getClassEvents } from './classevents.stage2';

/**
 * ComponentOptions
 */
export interface ComponentOptions {
  tag: string;
  style?: string;
  inheritStyle?: boolean;
  dependencies?: Array<typeof CustomElement>; // tslint:disable-line:no-any
}

/**
 * stage-2 implementation of the component decorator
 *
 * @param options ComponentOptions
 */
export function componentS2(options: ComponentOptions): Stage2ClassDecorator<typeof CustomElement> {
  return (descriptor: ClassDecoratorDescriptor): ClassDecoratorResult<typeof CustomElement> => {
    return {
      elements: descriptor.elements,
      constructor: undefined,
      kind: 'class',
      finisher: (target) => {
        if (!CustomElement.isPrototypeOf(target)) {
          throw new Error(`${target.name} must extend CustomElement`);
        }
        const prototype: typeof CustomElement = Object.getPrototypeOf(target) as typeof CustomElement;
        const prototypeClassProperties = getClassProperties(prototype);
        if (prototypeClassProperties) {
          const targetClassProperties = getClassProperties(target);
          prototypeClassProperties.forEach((value: PropertyOptions, key: string | symbol) => {
            targetClassProperties.set(key, value);
          });
        }
        if (options.inheritStyle) {
          options.style = (getComponentProperties(prototype).style || '') + options.style;
        }
        const prototypeWatcher = getAllClassPropertyWatcher(prototype);
        if (prototypeWatcher.size > 0) {
          Array.from(prototypeWatcher.entries()).forEach(([property, watcher]) => {
            getClassPropertyWatcher(target, property).push(...watcher);
          });
        }
        const prototypeInterceptor = getAllClassPropertyInterceptors(prototype);
        if (prototypeInterceptor.size > 0) {
          Array.from(prototypeInterceptor.entries()).forEach(([property, interceptor]) => {
            getClassPropertyInterceptor(target, property).push(...interceptor);
          });
        }
        const events = getClassEvents(prototype);
        if (events.size > 0) {
          Array.from(events.entries()).forEach(([event, option]) => {
            getClassEvents(target).set(event, option);
          });
        }

        setComponentProperties(target, options);
        window.customElements.define(options.tag, target);
      },
    };
  };
}
