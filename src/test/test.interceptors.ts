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
import { TestWithMultiplePropertiesWithTypeTS } from './components/TestWithMultiplePropertiesWithTypeTS';
import { TestWithMultiplePropertiesWithTypeStage2 } from './components/TestWithMultiplePropertiesWithType.stage2';

declare var BABEL_COMPILE: boolean;

/* istanbul ignore next */
export default (constructorInstance: { new(): TestWithMultipleProperties | TestWithMultiplePropertiesWithType | TestWithMultiplePropertiesWithTypeStage2 | TestWithMultiplePropertiesWithTypeTS }, name: string) => {
  if (BABEL_COMPILE && constructorInstance === TestWithMultipleProperties) return;
  describe('interceptor tests (' + name + ')', function () {
    it('string watcher test (' + name + ')', async function (done) {
      let element: TestWithMultipleProperties | TestWithMultiplePropertiesWithType | TestWithMultiplePropertiesWithTypeStage2 | TestWithMultiplePropertiesWithTypeTS = new constructorInstance();
      await element.waitForConstruction();
      element.interceptableProperty = 'test';
      expect(element.interceptableProperty).toEqual('testtest');
      expect(element.getAttribute('interceptable-property')).toEqual('testtest');
      done();
    });
  });
}
