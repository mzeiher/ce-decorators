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

/* tslint:disable */

import { TestWithMultipleProperties } from './components/TestWithMultipleProperties';
import { TestWithMultiplePropertiesWithType } from './components/TestWithMultiplePropertiesWithType';
import { TestWithMultiplePropertiesWithTypeStage2 } from './components/TestWithMultiplePropertiesWithType.stage2';
import { TestWithMultiplePropertiesWithTypeTS } from './components/TestWithMultiplePropertiesWithTypeTS';
import { TestWithMultiplePropertiesLazy } from './components/TestWithMultiplePropertiesLazy';
import { TestWithMultiplePropertiesWithTypeLazy } from './components/TestWithMultiplePropertiesWithTypeLazy';
import { TestWithMultiplePropertiesWithTypeStage2Lazy } from './components/TestWithMultiplePropertiesWithTypeLazy.stage2';
import { TestWithMultiplePropertiesWithTypeTSLazy } from './components/TestWithMultiplePropertiesWithTypeTSLazy';
import { TestWithMultiplePropertiesNoShadow } from './components/TestWithMultiplePropertiesNoShadow';

export type TESTABLECLASSES = TestWithMultipleProperties |
  TestWithMultiplePropertiesWithType |
  TestWithMultiplePropertiesWithTypeStage2 |
  TestWithMultiplePropertiesWithTypeTS |
  TestWithMultiplePropertiesLazy |
  TestWithMultiplePropertiesWithTypeLazy |
  TestWithMultiplePropertiesWithTypeStage2Lazy |
  TestWithMultiplePropertiesNoShadow |
  TestWithMultiplePropertiesWithTypeTSLazy;

/* istanbul ignore next */
export default (constructorInstance: { new(): TESTABLECLASSES }, name: string) => {
  describe('test caching behaviour (' + name + ')', function () {
    it('test caching behaviour (' + name + ')', async function (done) {
      const elements = [new constructorInstance(), new constructorInstance(), new constructorInstance(), new constructorInstance()];
      const promises: Array<PromiseLike<{}>> = [];
      elements.forEach((value) => {
        document.body.appendChild(value);
        promises.push(value.waitForRender());
      })

      await Promise.all(promises);

      expect((<any>elements[0])['_templateCache'] === (<any>elements[1])['_templateCache'] &&
      (<any>elements[0])['_templateCache'] === (<any>elements[2])['_templateCache'] &&
      (<any>elements[0])['_templateCache'] === (<any>elements[3])['_templateCache']).toBeTruthy();

      elements.forEach((value) => {
        document.body.removeChild(value);
      })
      done();
    });
  });
}
