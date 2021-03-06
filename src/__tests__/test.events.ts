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

export type TESTABLECLASSES = TestWithMultipleProperties | 
TestWithMultiplePropertiesWithType | 
TestWithMultiplePropertiesWithTypeStage2 | 
TestWithMultiplePropertiesWithTypeTS |
TestWithMultiplePropertiesLazy | 
TestWithMultiplePropertiesWithTypeLazy | 
TestWithMultiplePropertiesWithTypeStage2Lazy | 
TestWithMultiplePropertiesWithTypeTSLazy;

/* istanbul ignore next */
export default (constructorInstance: { new(): TESTABLECLASSES }, name: string) => {
  describe('event tests (' + name + ')', function () {
    it('event emitter (' + name + ')', function (done) {
      const element = new constructorInstance();
      element.addEventListener('change', (event: CustomEvent) => {
        expect(event.detail).toEqual('test');
        done();
      });
      element.changeEvent.emit("test");
    });
    it('event emitter without name (' + name + ')', function (done) {
      const element = new constructorInstance();
      element.addEventListener('test', (event: CustomEvent) => {
        expect(event.detail).toEqual('test');
        done();
      });
      element.test.emit("test");
    });
    it('event emitter with string (' + name + ')', function (done) {
      const element = new constructorInstance();
      element.addEventListener('string', (event: CustomEvent) => {
        expect(event.detail).toEqual('test');
        done();
      });
      element.stringEvent.emit("test");
    });
  });
}
