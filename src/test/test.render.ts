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
import { TestWithMultiplePropertiesWithType } from './components/TestWithMultiplePropertiesWithType';
import { TestWithMultiplePropertiesWithTypeTS } from './components/TestWithMultiplePropertiesWithTypeTS';
import { TestWithMultiplePropertiesWithTypeStage2 } from './components/TestWithMultiplePropertiesWithType.stage2';

declare var BABEL_COMPILE: boolean;

/* istanbul ignore next */
export default (constructorInstance: { new(): TestWithMultipleProperties | TestWithMultiplePropertiesWithType | TestWithMultiplePropertiesWithTypeStage2 | TestWithMultiplePropertiesWithTypeTS }, name:string) => {
  if (BABEL_COMPILE && constructorInstance === TestWithMultipleProperties) return;
  describe('render tests (' + name + ')', function () {
    let element: TestWithMultipleProperties | TestWithMultiplePropertiesWithType | TestWithMultiplePropertiesWithTypeStage2 | TestWithMultiplePropertiesWithTypeTS = null;
    beforeEach(function () {
      element = new constructorInstance();
    });
    afterEach(function () {
      if (element) {
        element = null;
      }
    });
    it('render on connected (' + name + ')', function (done) {
      spyOn(<any>element, 'scheduleRender').and.callThrough();
      document.querySelector('body').appendChild(element);
      window.setTimeout(() => { //we have to wait for the microtask of render to be done
        expect((<any>element).scheduleRender).toHaveBeenCalled();
        document.querySelector('body').removeChild(element);
        done();
      }, 0)
    });
    it('dom rendering tests (' + name + ')', function (done) {
      document.querySelector('body').appendChild(element);
      element.stringPropertyWithDefault = "foobar";
      element.numberPropertyWithDefault = 1;
      window.setTimeout(() => { //we have to wait for the microtask of render to be done
        const divs = element.shadowRoot.querySelectorAll('div');
        expect(divs[1].innerText).toEqual('foobar');
        expect(divs[2].innerText).toEqual('1');
        if (needShadyDOM()) {
          expect(divs[0].getAttribute('class')).toContain('style-scope');
          // expect(divs[0].getAttribute('class')).toContain('test-with-multiple-properties');
        }
        document.querySelector('body').removeChild(element);
        done();
      }, 0);
    });
    it('effective dom rendering (' + name + ')', function (done) {
      document.querySelector('body').appendChild(element);
      window.setTimeout(() => { //we have to wait for the microtask of render to be done
        const divs = element.shadowRoot.querySelectorAll('div');

        element.stringPropertyWithDefault = "foo";
        element.numberPropertyWithDefault = 1;
        element.booleanProperty = true;
        element.objectPropertyWithDefault = {};
        element.arrayPropertyWithDefault = [];
        window.setTimeout(() => {
          const newDivs = element.shadowRoot.querySelectorAll('div');
          newDivs.forEach((value:any, key:any) => {
            expect(value).toBe(divs[key]);
          });
          document.querySelector('body').removeChild(element);
          done();
        }, 0);
      }, 0);
    });
  });
}
