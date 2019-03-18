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
import { TESTABLECLASSES } from './test.events';

/* istanbul ignore next */
export default (constructorInstance: { new(): TESTABLECLASSES  }, name: string) => {
  describe('state tests (' + name + ')', function () {
    let element: TESTABLECLASSES = null;
    beforeEach(function () {
      element = new constructorInstance();
    });
    afterEach(function () {
      if (element) {
        element = null;
      }
    });
    it('state change tests (' + name + ')', async function (done) {
      document.querySelector('body').appendChild(element);
      await element.waitForRender();
      expect((element.shadowRoot || element).querySelector('div').classList.contains('hasclass')).toBeFalsy();
      element.shouldHaveClass = true;
      await element.waitForRender();
      expect((element.shadowRoot || element).querySelector('div').classList.contains('hasclass')).toBeTruthy();
      document.querySelector('body').removeChild(element);
      done();
    });
  });
}
