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
import { TestWithMultiplePropertiesLazy } from './components/TestWithMultiplePropertiesLazy';
import { TESTABLECLASSES } from './test.events';

declare var BABEL_COMPILE: boolean;

/* istanbul ignore next */
export default (constructorInstance: { new(): TESTABLECLASSES }, name: string) => {
  if (BABEL_COMPILE && (constructorInstance === TestWithMultipleProperties || constructorInstance === TestWithMultiplePropertiesLazy)) return;
  describe('lifecycle tests (' + name + ')', function () {
    it('lifecycle of (' + name + ')', async function (done) {
      let element: TESTABLECLASSES = new constructorInstance();
      const componentConnectedSpy = spyOn(element, 'componentConnected').and.callThrough();
      const componentDisconnectedSpy = spyOn(element, 'componentDisconnected').and.callThrough();
      const componentWillRenderSpy = spyOn(element, 'componentWillRender').and.callThrough();
      const componentDidRenderSpy = spyOn(element, 'componentDidRender').and.callThrough();

      await element.waitForConstruction();
      document.querySelector('body').appendChild(element);
      await element.waitForRender();
      document.querySelector('body').removeChild(element);
      window.setTimeout(() => {

        expect(componentConnectedSpy).toHaveBeenCalled()
        expect(componentDisconnectedSpy).toHaveBeenCalled()
        expect(componentWillRenderSpy).toHaveBeenCalled()
        expect(componentDidRenderSpy).toHaveBeenCalled()

        done();
      },100);
    });
  });
}
