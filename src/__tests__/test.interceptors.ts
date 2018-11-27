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

import { TESTABLECLASSES } from './test.events';
import { TestWithMultipleProperties } from './components/TestWithMultipleProperties';
import { TestWithMultiplePropertiesLazy } from './components/TestWithMultiplePropertiesLazy';

/* tslint:disable */


declare var BABEL_COMPILE: boolean;

/* istanbul ignore next */
export default (constructorInstance: { new(): TESTABLECLASSES }, name: string) => {
  if (BABEL_COMPILE && (constructorInstance === TestWithMultipleProperties || constructorInstance === TestWithMultiplePropertiesLazy)) return;
  describe('interceptor tests (' + name + ')', function () {
    it('string watcher test (' + name + ')', async function (done) {
      let element: TESTABLECLASSES = new constructorInstance();
      await element.waitForConstruction();
      element.interceptableProperty = 'test';
      expect(element.interceptableProperty).toEqual('testtest');
      expect(element.getAttribute('interceptable-property')).toEqual('testtest');
      done();
    });
  });
}