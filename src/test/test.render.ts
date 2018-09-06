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
import { needShadyDOM } from '../shadycss';

/* istanbul ignore next */
export default () => {
  describe('render tests', function () {
    let element: TestWithMultipleProperties = null;
    beforeEach(function () {
      element = new TestWithMultipleProperties();
    });
    afterEach(function () {
      if (element) {
        element = null;
      }
    });
    it('render on connected', function () {
      spyOn(<any>element, 'renderToDom').and.callThrough();
      document.querySelector('body').appendChild(element);
      document.querySelector('body').removeChild(element);
      expect((<any>element).renderToDom).toHaveBeenCalled();
    });
    it('dom rendering tests', function () {
      document.querySelector('body').appendChild(element);
      element.stringPropertyWithDefault = "foobar";
      element.numberPropertyWithDefault = 1;
      const divs = element.shadowRoot.querySelectorAll('div');
      expect(divs[0].innerText).toEqual('foobar');
      expect(divs[1].innerText).toEqual('1');
      if (needShadyDOM()) {
        expect(divs[0].getAttribute('class')).toContain('style-scope');
        expect(divs[0].getAttribute('class')).toContain('test-with-multiple-properties');
      }
      document.querySelector('body').removeChild(element);
    });
    it('effective dom rendering', function () {
      document.querySelector('body').appendChild(element);
      const divs = element.shadowRoot.querySelectorAll('div');

      element.stringPropertyWithDefault = "foo";
      element.numberPropertyWithDefault = 1;
      element.booleanProperty = true;
      element.objectPropertyWithDefault = {};
      element.arrayPropertyWithDefault = [];

      const newDivs = element.shadowRoot.querySelectorAll('div');
      newDivs.forEach((value, key) => {
        expect(value).toBe(divs[key]);
      });
      document.querySelector('body').removeChild(element);
    });
  });
}
