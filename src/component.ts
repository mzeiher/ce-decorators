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
import { isStage2ClassDecorator, applyStage2toLegacyClassDecorator } from './stage2/stage2decorators';
import { Component as ComponentS2 } from './stage2/component';
import { ComponentOptions } from './componentoptions';

/**
 * Component decorator, defines a new component to be used as a custom element compatible with stage-0, TS and stage-2 decorator implementations
 *
 * @param options (ComponentOptions) options to initialize the component
 */
export function Component(options: ComponentOptions): ClassDecorator { // tslint:disable-line:function-name
  return (target: any): any => { // tslint:disable-line:no-any
    if (isStage2ClassDecorator(target)) {
      return ComponentS2(options)(<any>target); // tslint:disable-line:no-any
    } else {
      return applyStage2toLegacyClassDecorator<typeof CustomElement>(target, ComponentS2(options)); // tslint:disable-line:no-unsafe-any
    }
  };
}
