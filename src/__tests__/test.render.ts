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
import { needShadyDOM } from '../shadycss';
import { TESTABLECLASSES } from './test.events';

declare var BABEL_COMPILE: boolean;

/* istanbul ignore next */
export default (constructorInstance: { new(): TESTABLECLASSES }, name: string) => {
  if (BABEL_COMPILE && (constructorInstance === TestWithMultipleProperties || constructorInstance === TestWithMultiplePropertiesLazy)) return;
  describe('render tests (' + name + ')', function () {
    let element: TESTABLECLASSES = null;
    beforeEach(function () {
      element = new constructorInstance();
    });
    afterEach(function () {
      if (element) {
        element = null;
      }
    });
    it('render on connected (' + name + ')', async function (done) {
      spyOn(<any>element, 'scheduleRender').and.callThrough();
      document.querySelector('body').appendChild(element);
      await element.waitForRender();
      expect((<any>element).scheduleRender).toHaveBeenCalled();
      document.querySelector('body').removeChild(element);
      done();
    });
    it('dom rendering tests (' + name + ')', async function (done) {
      document.querySelector('body').appendChild(element);
      element.baseProperty = 'test';
      element.stringPropertyWithInitializer = "foobar";
      element.numberPropertyWithInitializer = 1;
      element.booleanPropertyWithInitializer = true;
      element.objectPropertyWithInitializer = {};
      element.arrayPropertyWithInitializer = [];
      await element.waitForRender();
      const divs = element.shadowRoot.querySelectorAll('div');
      expect(divs[0].innerText).toEqual('test');
      expect(divs[1].innerText).toEqual('foobar');
      expect(divs[2].innerText).toEqual('1');
      expect(divs[3].innerText).toEqual('true');
      expect(divs[4].innerText).toEqual('{}');
      expect(divs[5].innerText).toEqual('[]');
      if (needShadyDOM()) {
        expect(divs[0].getAttribute('class')).toContain('style-scope');
        // expect(divs[0].getAttribute('class')).toContain('test-with-multiple-properties');
      }
      document.querySelector('body').removeChild(element);
      done();

    });
    it('effective dom rendering (' + name + ')', async function (done) {
      document.querySelector('body').appendChild(element);
      await element.waitForRender();
      const divs = element.shadowRoot.querySelectorAll('div');

      element.stringPropertyWithInitializer = "foobar";
      element.numberPropertyWithInitializer = 1;
      element.booleanPropertyWithInitializer = true;
      element.objectPropertyWithInitializer = {};
      element.arrayPropertyWithInitializer = [];
      await element.waitForRender();
      const newDivs = element.shadowRoot.querySelectorAll('div');
      newDivs.forEach((value: any, key: any) => {
        expect(value).toBe(divs[key]);
      });
      document.querySelector('body').removeChild(element);
      done();


    });
  });
}
