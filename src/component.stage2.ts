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
import { setComponentOptions, getComponentOptions } from './componentoptions.stage2';
import { getAllPropertyWatcher, getPropertyWatcher } from './watchmap.stage2';

export interface ComponentOptions {
  tag: string;
  style?: string;
  inheritStyle?: boolean;
}

export function componentS2(options: ComponentOptions): Stage2ClassDecorator<typeof CustomElement> {
  return (descriptor: ClassDecoratorDescriptor): ClassDecoratorResult<typeof CustomElement> => {
    return {
      elements: descriptor.elements,
      constructor: undefined,
      kind: 'class',
      finisher: (target) => {
        const prototype: any = Object.getPrototypeOf(target) as typeof CustomElement;
        const prototypeClassProperties = getClassProperties(prototype);
        if (prototypeClassProperties) {
          const targetClassProperties = getClassProperties(target);
          prototypeClassProperties.forEach((value: PropertyOptions, key: string | symbol) => {
            targetClassProperties.set(key, value);
          })
        }
        if(options.inheritStyle) {
          options.style = getComponentOptions(prototype).style || '' + options.style;
        }
        const prototypeWatcher = getAllPropertyWatcher(prototype);
        if(prototypeWatcher.size > 0) {
          Array.from(prototypeWatcher.entries()).forEach(value => {
            getPropertyWatcher(target, value["0"]).push(...value["1"]);
          });
        }
        setComponentOptions(target, options);
        window.customElements.define(options.tag, target);
      }
    }
  }
}
