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

/* istanbul ignore next */
export default () => {
  describe('property-tests', function () {
    const element = new TestWithMultipleProperties();
    const elementWithDefault = new TestWithMultipleProperties();
    const elementWithInitializer = new TestWithMultipleProperties();
    it('string-property', function () {
      element.stringProperty = "test";
      expect(element.stringProperty).toEqual("test", "stringProperty set/get property");
      element.setAttribute('string-property', 'test2');
      expect(element.getAttribute('string-property')).toEqual("test2", "stringProperty set/get attribute");
      element.stringProperty = "test3";
      expect(element.getAttribute('string-property')).toEqual("test3", "stringProperty set property get attribute");
      element.setAttribute('string-property', 'test4');
      expect(element.stringProperty).toEqual("test4", "stringProperty set attribute get property");
    });
    it('number-property', function () {
      element.numberProperty = 0;
      expect(element.numberProperty).toEqual(0, "numberProperty set/get property");
      element.setAttribute('number-property', '1');
      expect(element.getAttribute('number-property')).toEqual("1", "numberProperty set/get attribute");
      element.numberProperty = 2;
      expect(element.getAttribute('number-property')).toEqual("2", "numberProperty set property get attribute");
      element.setAttribute('number-property', '3');
      expect(element.numberProperty).toEqual(3, "numberProperty set attribute get property");
    });
    it('boolean-property', function () {
      element.booleanProperty = true;
      expect(element.booleanProperty).toEqual(true, "Boolean Property set property");
      element.booleanProperty = false;
      expect(element.booleanProperty).toEqual(false, "Boolean Property set property");
      element.setAttribute('boolean-property', 'true');
      expect(element.booleanProperty).toEqual(true, "Boolean Property set with attribute");
      element.removeAttribute('boolean-property');
      expect(element.booleanProperty).toEqual(false, "Boolean Property set with attribute");
    });
    it('object-property', function () {
      element.objectProperty = { test: "test" };
      expect(element.objectProperty).toEqual({ test: "test" }, "Object Property set property");
      element.setAttribute('object-property', '{ "test" : "test2"} ');
      expect(element.objectProperty).toEqual({ test: "test2" }, "Object Property set attribute");
    });
    it('array-property', function () {
      element.arrayProperty = [0, 1, 2];
      expect(element.arrayProperty).toEqual([0, 1, 2], "Array Property set property");
      element.setAttribute('array-property', '[2,1,0]');
      expect(element.arrayProperty).toEqual([2, 1, 0], "Array Property set attribute");
    });

    it('string-property-with-default', function () {
      expect(elementWithDefault.stringPropertyWithDefault).toEqual("test", "stringPropertyWithDefault default value");
      elementWithDefault.stringPropertyWithDefault = "testtest";
      expect(elementWithDefault.stringPropertyWithDefault).toEqual("testtest", "stringPropertyWithDefault set/get property");
      elementWithDefault.setAttribute('string-property-with-default', 'test2');
      expect(elementWithDefault.getAttribute('string-property-with-default')).toEqual("test2", "stringPropertyWithDefault set/get attribute");
      elementWithDefault.stringPropertyWithDefault = "test3";
      expect(elementWithDefault.getAttribute('string-property-with-default')).toEqual("test3", "stringPropertyWithDefault set property get attribute");
      elementWithDefault.setAttribute('string-property-with-default', 'test4');
      expect(elementWithDefault.stringPropertyWithDefault).toEqual("test4", "stringPropertyWithDefault set attribute get property");
    });
    it('number-property-with-default', function () {
      expect(elementWithDefault.numberPropertyWithDefault).toEqual(0, "numberPropertyWithDefault default value");
      elementWithDefault.numberPropertyWithDefault = 1;
      expect(elementWithDefault.numberPropertyWithDefault).toEqual(1, "numberPropertyWithDefault set/get property");
      elementWithDefault.setAttribute('number-property-with-default', '1');
      expect(elementWithDefault.getAttribute('number-property-with-default')).toEqual("1", "numberPropertyWithDefault set/get attribute");
      elementWithDefault.numberPropertyWithDefault = 2;
      expect(elementWithDefault.getAttribute('number-property-with-default')).toEqual("2", "numberPropertyWithDefault set property get attribute");
      elementWithDefault.setAttribute('number-property-with-default', '3');
      expect(elementWithDefault.numberPropertyWithDefault).toEqual(3, "numberPropertyWithDefault set attribute get property");
    });
    it('boolean-property-with-default', function () {
      expect(elementWithDefault.booleanPropertyWithDefault).toEqual(true, "booleanPropertyWithDefault default valuebooleanPropertyWithDefault");
      elementWithDefault.booleanPropertyWithDefault = true;
      expect(elementWithDefault.booleanPropertyWithDefault).toEqual(true, "booleanPropertyWithDefault set property");
      elementWithDefault.booleanPropertyWithDefault = false;
      expect(elementWithDefault.booleanPropertyWithDefault).toEqual(false, "booleanPropertyWithDefault set property");
      elementWithDefault.setAttribute('boolean-property-with-default', 'true');
      expect(elementWithDefault.booleanPropertyWithDefault).toEqual(true, "booleanPropertyWithDefault set with attribute");
      elementWithDefault.removeAttribute('boolean-property-with-default');
      expect(elementWithDefault.booleanPropertyWithDefault).toEqual(false, "booleanPropertyWithDefault set with attribute");
    });
    it('object-property-with-default', function () {
      expect(elementWithDefault.objectPropertyWithDefault).toEqual({ test: "default" }, "objectPropertyWithDefault default value");
      elementWithDefault.objectPropertyWithDefault = { test: "test" };
      expect(elementWithDefault.objectPropertyWithDefault).toEqual({ test: "test" }, "objectPropertyWithDefault set property");
      elementWithDefault.setAttribute('object-property-with-default', '{ "test" : "test2"} ');
      expect(elementWithDefault.objectPropertyWithDefault).toEqual({ test: "test2" }, "objectPropertyWithDefault set attribute");
    });
    it('array-property-with-default', function () {
      expect(elementWithDefault.arrayPropertyWithDefault).toEqual([0, 0, 0], "arrayPropertyWithDefault set property");
      elementWithDefault.arrayPropertyWithDefault = [0, 1, 2];
      expect(elementWithDefault.arrayPropertyWithDefault).toEqual([0, 1, 2], "arrayPropertyWithDefault set property");
      elementWithDefault.setAttribute('array-property-with-default', '[2,1,0]');
      expect(elementWithDefault.arrayPropertyWithDefault).toEqual([2, 1, 0], "arrayPropertyWithDefault set attribute");
    });
    it('string-property-with-initializer', function () {
      expect(elementWithInitializer.stringPropertyWithInitializer).toEqual("test", "stringPropertyWithInitializer initializer value");
      elementWithInitializer.stringPropertyWithInitializer = "testtest";
      expect(elementWithInitializer.stringPropertyWithInitializer).toEqual("testtest", "stringPropertyWithInitializer set/get property");
      elementWithInitializer.setAttribute('string-property-with-initializer', 'test2');
      expect(elementWithInitializer.getAttribute('string-property-with-initializer')).toEqual("test2", "stringPropertyWithInitializer set/get attribute");
      elementWithInitializer.stringPropertyWithInitializer = "test3";
      expect(elementWithInitializer.getAttribute('string-property-with-initializer')).toEqual("test3", "stringPropertyWithInitializer set property get attribute");
      elementWithInitializer.setAttribute('string-property-with-initializer', 'test4');
      expect(elementWithInitializer.stringPropertyWithInitializer).toEqual("test4", "stringPropertyWithInitializer set attribute get property");
    });
    it('number-property-with-initializer', function () {
      expect(elementWithInitializer.numberPropertyWithInitializer).toEqual(0, "numberPropertyWithInitializer initializer value");
      elementWithInitializer.numberPropertyWithInitializer = 1;
      expect(elementWithInitializer.numberPropertyWithInitializer).toEqual(1, "numberPropertyWithInitializer set/get property");
      elementWithInitializer.setAttribute('number-property-with-initializer', '1');
      expect(elementWithInitializer.getAttribute('number-property-with-initializer')).toEqual("1", "numberPropertyWithInitializer set/get attribute");
      elementWithInitializer.numberPropertyWithInitializer = 2;
      expect(elementWithInitializer.getAttribute('number-property-with-initializer')).toEqual("2", "numberPropertyWithInitializer set property get attribute");
      elementWithInitializer.setAttribute('number-property-with-initializer', '3');
      expect(elementWithInitializer.numberPropertyWithInitializer).toEqual(3, "numberPropertyWithInitializer set attribute get property");
    });
    it('boolean-property-with-initializer', function () {
      expect(elementWithInitializer.booleanPropertyWithInitializer).toEqual(true, "booleanPropertyWithInitializer initializer valuebooleanPropertyWithInitializer");
      elementWithInitializer.booleanPropertyWithInitializer = true;
      expect(elementWithInitializer.booleanPropertyWithInitializer).toEqual(true, "booleanPropertyWithInitializer set property");
      elementWithInitializer.booleanPropertyWithInitializer = false;
      expect(elementWithInitializer.booleanPropertyWithInitializer).toEqual(false, "booleanPropertyWithInitializer set property");
      elementWithInitializer.setAttribute('boolean-property-with-initializer', 'true');
      expect(elementWithInitializer.booleanPropertyWithInitializer).toEqual(true, "booleanPropertyWithInitializer set with attribute");
      elementWithInitializer.removeAttribute('boolean-property-with-initializer');
      expect(elementWithInitializer.booleanPropertyWithInitializer).toEqual(false, "booleanPropertyWithInitializer set with attribute");
    });
    it('object-property-with-initializer', function () {
      expect(elementWithInitializer.objectPropertyWithInitializer).toEqual({ test: "default" }, "objectPropertyWithInitializer initializer value");
      elementWithInitializer.objectPropertyWithInitializer = { test: "test" };
      expect(elementWithInitializer.objectPropertyWithInitializer).toEqual({ test: "test" }, "objectPropertyWithInitializer set property");
      elementWithInitializer.setAttribute('object-property-with-initializer', '{ "test" : "test2"} ');
      expect(elementWithInitializer.objectPropertyWithInitializer).toEqual({ test: "test2" }, "objectPropertyWithInitializer set attribute");
    });
    it('array-property-with-initializer', function () {
      expect(elementWithInitializer.arrayPropertyWithInitializer).toEqual([0, 0, 0], "arrayPropertyWithInitializer set property");
      elementWithInitializer.arrayPropertyWithInitializer = [0, 1, 2];
      expect(elementWithInitializer.arrayPropertyWithInitializer).toEqual([0, 1, 2], "arrayPropertyWithInitializer set property");
      elementWithInitializer.setAttribute('array-property-with-initializer', '[2,1,0]');
      expect(elementWithInitializer.arrayPropertyWithInitializer).toEqual([2, 1, 0], "arrayPropertyWithInitializer set attribute");
    });
    it('get-property-test string', function() {
      expect(element.getPropertyStringTest).toEqual('');
      element.getPropertyStringTest = "test";
      expect(element.getPropertyStringTest).toEqual('test');
      expect(element.hasAttribute('get-property-string-test')).toBeTruthy();
      element.setAttribute('get-property-string-test', 'testtest');
      expect(element.getPropertyStringTest).toEqual('testtest');
    });
    it('set-property-test string', function() {
      expect(element.setPropertyStringTest).toEqual('');
      element.setPropertyStringTest = "test";
      expect(element.setPropertyStringTest).toEqual('test');
      expect(element.hasAttribute('set-property-string-test')).toBeTruthy();
      element.setAttribute('set-property-string-test', 'testtest');
      expect(element.setPropertyStringTest).toEqual('testtest');
    });
    it('get-property-test boolean', function() {
      expect(element.getPropertyBooleanTest).toEqual(false);
      element.getPropertyBooleanTest = true;
      expect(element.getPropertyBooleanTest).toEqual(true);
      expect(element.hasAttribute('get-property-boolean-test')).toBeTruthy();
      element.removeAttribute('get-property-boolean-test');
      expect(element.getPropertyBooleanTest).toEqual(false);
      element.getPropertyBooleanTest = true;
      expect(element.hasAttribute('get-property-boolean-test')).toBeTruthy();
      element.getPropertyBooleanTest = false;
      expect(element.hasAttribute('get-property-boolean-test')).toBeFalsy();
    });
    it('set-property-test boolean', function() {
      expect(element.setPropertyBooleanTest).toEqual(false);
      element.setPropertyBooleanTest = true;
      expect(element.setPropertyBooleanTest).toEqual(true);
      expect(element.hasAttribute('set-property-boolean-test')).toBeTruthy();
      element.removeAttribute('set-property-boolean-test');
      expect(element.setPropertyBooleanTest).toEqual(false);
      element.setPropertyBooleanTest = true;
      expect(element.hasAttribute('set-property-boolean-test')).toBeTruthy();
      element.setPropertyBooleanTest = false;
      expect(element.hasAttribute('set-property-boolean-test')).toBeFalsy();
    });
    it('get-property-test object', function() {
      expect(element.getPropertyObjectTest).toEqual({});
      element.getPropertyObjectTest = {test : "test"};
      expect(element.getPropertyObjectTest).toEqual({test : "test"});
      expect(element.hasAttribute('get-property-object-test')).toBeFalsy();
      element.setAttribute('get-property-object-test', '{"test" : "testtest"}');
      expect(element.getPropertyObjectTest).toEqual({test : "testtest"});
    });
    it('set-property-test object', function() {
      expect(element.setPropertyObjectTest).toEqual({});
      element.setPropertyObjectTest = {test : "test"};
      expect(element.setPropertyObjectTest).toEqual({test : "test"});
      expect(element.hasAttribute('set-property-object-test')).toBeFalsy();
      element.setAttribute('set-property-object-test', '{"test" : "testtest"}');
      expect(element.setPropertyObjectTest).toEqual({test : "testtest"});
    });
  });
}
