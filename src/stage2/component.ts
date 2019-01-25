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
import { CustomElement } from '../customelement';
import { getClassProperties } from '../classproperties';
import { PropertyOptions } from '../propertyoptions';
import { setComponentProperties, getComponentProperties, ExtendedComponentOptions } from '../componentproperties';
import { getAllClassPropertyWatcher, getClassPropertyWatcher } from '../classpropertywatcher';
import { getClassPropertyInterceptor, getAllClassPropertyInterceptors } from '../classpropertyinterceptors';
import { getClassEvents } from '../classevents';
import { ComponentOptions } from '../componentoptions';
import { supportsAdoptingStyleSheets } from '../utils';

/**
 * stage-2 implementation of the component decorator
 *
 * @param options ComponentOptions
 */
export function Component(options: ComponentOptions): Stage2ClassDecorator<typeof CustomElement> { //tslint:disable-line
  return (descriptor: ClassDecoratorDescriptor): ClassDecoratorResult<typeof CustomElement> => {
    return {
      elements: descriptor.elements,
      constructor: undefined,
      kind: 'class',
      finisher: (target) => {
        if (!CustomElement.isPrototypeOf(target)) {
          throw new Error(`${target.name} must extend CustomElement`);
        }
        const componentExtendedOptions: ExtendedComponentOptions = { ...options, cssStyles: [], styleSheetAdopted: false };

        const prototype: typeof CustomElement = Object.getPrototypeOf(target) as typeof CustomElement;
        const prototypeClassProperties = getClassProperties(prototype);
        if (prototypeClassProperties) {
          const targetClassProperties = getClassProperties(target);
          prototypeClassProperties.forEach((value: PropertyOptions, key: string | symbol) => {
            targetClassProperties.set(key, value);
          });
        }
        const componentStyles = Array.isArray(options.style) ? options.style : [options.style || ''];
        const componentCSSStyles = componentStyles.map((value) => {
          if (supportsAdoptingStyleSheets) {
            const css = new CSSStyleSheet();
            css.replaceSync(value);
            return css;
          } else {
            return {
              cssText: value,
            };
          }
        });
        if (componentExtendedOptions.inheritStyle) {
          const parentStyle = getComponentProperties(prototype).cssStyles;
          componentExtendedOptions.cssStyles.push(...parentStyle);
          componentExtendedOptions.cssStyles.push(...componentCSSStyles);
        } else {
          componentExtendedOptions.cssStyles.push(...componentCSSStyles);
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

        setComponentProperties(target, componentExtendedOptions);
        window.customElements.define(options.tag, target);
      },
    };
  };
}
