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

declare var BABEL_COMPILE: boolean;

export type TESTABLECLASSES = TestWithMultipleProperties |
  TestWithMultiplePropertiesWithType |
  TestWithMultiplePropertiesWithTypeStage2 |
  TestWithMultiplePropertiesWithTypeTS |
  TestWithMultiplePropertiesLazy |
  TestWithMultiplePropertiesWithTypeLazy |
  TestWithMultiplePropertiesWithTypeStage2Lazy |
  TestWithMultiplePropertiesWithTypeTSLazy;

const propertyTemplate = (ctor: { new(): TESTABLECLASSES }, property: string, message: string) => `[DEPRECATED] [${ctor.name}] property ${property} is deprecated: ${message || ''}`;
const methodTemplate = (ctor: { new(): TESTABLECLASSES }, method: string, message: string) => `[DEPRECATED] [${ctor.name}] method ${method} is deprecated: ${message || ''}`;
const setterTemplate = (ctor: { new(): TESTABLECLASSES }, property: string, message: string) => `[DEPRECATED] [${ctor.name}] setter ${property} is deprecated: ${message || ''}`;
const getterTemplate = (ctor: { new(): TESTABLECLASSES }, property: string, message: string) => `[DEPRECATED] [${ctor.name}] getter ${property} is deprecated: ${message || ''}`;

/* istanbul ignore next */
export default (constructorInstance: { new(): TESTABLECLASSES }, name: string) => {
  if (BABEL_COMPILE && (constructorInstance === TestWithMultipleProperties || constructorInstance === TestWithMultiplePropertiesLazy)) return;
  describe('deprecated tests (' + name + ')', function () {
    it('deprecated decorator (' + name + ')', async function (done) {
      const element = new constructorInstance();
      await element.waitForConstruction();

      let lastMessage = '';
      spyOn(console, "warn").and.callFake(function (message: string) { lastMessage = message; });

      element.deprecatedProperty = '';
      expect(lastMessage).toEqual(propertyTemplate(constructorInstance, 'deprecatedProperty', 'Custom Message'));
      
      element.deprecatedProperty;
      expect(lastMessage).toEqual(propertyTemplate(constructorInstance, 'deprecatedProperty', 'Custom Message'));

      element.stringProperty = element.deprecatedPropertyGetSet;
      expect(lastMessage).toEqual(getterTemplate(constructorInstance, 'deprecatedPropertyGetSet', ''));

      element.deprecatedPropertyGetSet = 'blaaa'
      expect(lastMessage).toEqual(setterTemplate(constructorInstance, 'deprecatedPropertyGetSet', ''));
      
      element.deprecatedMethod();
      expect(lastMessage).toEqual(methodTemplate(constructorInstance, 'deprecatedMethod', ''));

      done();
    });
  });
}
