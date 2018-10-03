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

import { CustomElement } from './customelement.stage2';
import { isStage2ClassDecorator, applyLegacyToStage2ClassDecorator } from './stage2decorators';
import { componentS2, ComponentOptions } from './component.stage2';

/**
 * Component decorator, defines a new component to be used as a custom element
 *
 * @param options (ComponentOptions) options to initialize the component
 */
export function Component(options: ComponentOptions): ClassDecorator { // tslint:disable-line:function-name
    return (target: any): any => {
      if(isStage2ClassDecorator(target)) {
        return componentS2(options)(<any>target);
      } else {
        return applyLegacyToStage2ClassDecorator<typeof CustomElement>(target, componentS2(options));
      }
    };
}
