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
export default (constructorInstance: { new(): TESTABLECLASSES }, name: string) => {
  describe('property-tests (' + name + ')', function () {
    const element = new constructorInstance();
    const elementWithInitializer = new constructorInstance();
    beforeAll(function (done) {
      document.querySelector('body').appendChild(element);
      document.querySelector('body').appendChild(elementWithInitializer);
      window.setTimeout(() => {
        done();
      }, 0);
    })
    afterAll(function () {
      document.querySelector('body').removeChild(element);
      document.querySelector('body').removeChild(elementWithInitializer);
    })

    it('string-property (' + name + ')', function () {
      element.stringProperty = "test";
      expect(element.stringProperty).toEqual("test", "stringProperty set/get property");
      element.setAttribute('string-property', 'test2');
      expect(element.getAttribute('string-property')).toEqual("test2", "stringProperty set/get attribute");
      element.stringProperty = "test3";
      expect(element.getAttribute('string-property')).toEqual("test3", "stringProperty set property get attribute");
      element.setAttribute('string-property', 'test4');
      expect(element.stringProperty).toEqual("test4", "stringProperty set attribute get property");
    });
    it('number-property (' + name + ')', function () {
      element.numberProperty = 0;
      expect(element.numberProperty).toEqual(0, "numberProperty set/get property");
      element.setAttribute('number-property', '1');
      expect(element.getAttribute('number-property')).toEqual("1", "numberProperty set/get attribute");
      element.numberProperty = 2;
      expect(element.getAttribute('number-property')).toEqual("2", "numberProperty set property get attribute");
      element.setAttribute('number-property', '3');
      expect(element.numberProperty).toEqual(3, "numberProperty set attribute get property");
    });
    it('boolean-property (' + name + ')', function () {
      element.booleanProperty = true;
      expect(element.booleanProperty).toEqual(true, "Boolean Property set property");
      element.booleanProperty = false;
      expect(element.booleanProperty).toEqual(false, "Boolean Property set property");
      element.setAttribute('boolean-property', 'true');
      expect(element.booleanProperty).toEqual(true, "Boolean Property set with attribute");
      element.removeAttribute('boolean-property');
      expect(element.booleanProperty).toEqual(false, "Boolean Property set with attribute");
      element.setAttribute('boolean-property', 'true');
      expect(element.booleanProperty).toEqual(true, "Boolean Property set with attribute");
      element.setAttribute('boolean-property', 'false');
      expect(element.booleanProperty).toEqual(false, "Boolean Property set with attribute");
    });
    it('object-property (' + name + ')', function () {
      element.objectProperty = { test: "test" };
      expect(element.objectProperty).toEqual({ test: "test" }, "Object Property set property");
      element.setAttribute('object-property', '{ "test" : "test2"} ');
      expect(element.objectProperty).toEqual({ test: "test2" }, "Object Property set attribute");
    });
    it('array-property (' + name + ')', function () {
      element.arrayProperty = [0, 1, 2];
      expect(element.arrayProperty).toEqual([0, 1, 2], "Array Property set property");
      element.setAttribute('array-property', '[2,1,0]');
      expect(element.arrayProperty).toEqual([2, 1, 0], "Array Property set attribute");
    });

    it('string-property-with-initializer (' + name + ')', function () {
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
    it('number-property-with-initializer (' + name + ')', function () {
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
    it('boolean-property-with-initializer (' + name + ')', function () {
      expect(elementWithInitializer.booleanPropertyWithInitializer).toEqual(true, "booleanPropertyWithInitializer initializer valuebooleanPropertyWithInitializer");
      elementWithInitializer.booleanPropertyWithInitializer = true;
      expect(elementWithInitializer.booleanPropertyWithInitializer).toEqual(true, "booleanPropertyWithInitializer set property");
      elementWithInitializer.booleanPropertyWithInitializer = false;
      expect(elementWithInitializer.booleanPropertyWithInitializer).toEqual(false, "booleanPropertyWithInitializer set property");
      elementWithInitializer.setAttribute('boolean-property-with-initializer', 'true');
      expect(elementWithInitializer.booleanPropertyWithInitializer).toEqual(true, "booleanPropertyWithInitializer set with attribute");
      elementWithInitializer.removeAttribute('boolean-property-with-initializer');
      expect(elementWithInitializer.booleanPropertyWithInitializer).toEqual(false, "booleanPropertyWithInitializer set with attribute");
      elementWithInitializer.setAttribute('boolean-property-with-initializer', 'true');
      expect(elementWithInitializer.booleanPropertyWithInitializer).toEqual(true, "booleanPropertyWithInitializer set with attribute");
      elementWithInitializer.setAttribute('boolean-property-with-initializer', 'false');
      expect(elementWithInitializer.booleanPropertyWithInitializer).toEqual(false, "booleanPropertyWithInitializer set with attribute");
    });
    it('object-property-with-initializer (' + name + ')', function () {
      expect(elementWithInitializer.objectPropertyWithInitializer).toEqual({ test: "default" }, "objectPropertyWithInitializer initializer value");
      elementWithInitializer.objectPropertyWithInitializer = { test: "test" };
      expect(elementWithInitializer.objectPropertyWithInitializer).toEqual({ test: "test" }, "objectPropertyWithInitializer set property");
      elementWithInitializer.setAttribute('object-property-with-initializer', '{ "test" : "test2"} ');
      expect(elementWithInitializer.objectPropertyWithInitializer).toEqual({ test: "test2" }, "objectPropertyWithInitializer set attribute");
    });
    it('array-property-with-initializer (' + name + ')', function () {
      expect(elementWithInitializer.arrayPropertyWithInitializer).toEqual([0, 0, 0], "arrayPropertyWithInitializer set property");
      elementWithInitializer.arrayPropertyWithInitializer = [0, 1, 2];
      expect(elementWithInitializer.arrayPropertyWithInitializer).toEqual([0, 1, 2], "arrayPropertyWithInitializer set property");
      elementWithInitializer.setAttribute('array-property-with-initializer', '[2,1,0]');
      expect(elementWithInitializer.arrayPropertyWithInitializer).toEqual([2, 1, 0], "arrayPropertyWithInitializer set attribute");
    });
    it('get-property-test string (' + name + ')', function () {
      expect(element.getPropertyStringTest).toEqual('');
      element.getPropertyStringTest = "test";
      expect(element.getPropertyStringTest).toEqual('test');
      expect(element.hasAttribute('get-property-string-test')).toBeTruthy();
      element.setAttribute('get-property-string-test', 'testtest');
      expect(element.getPropertyStringTest).toEqual('testtest');
    });
    it('set-property-test string (' + name + ')', function () {
      expect(element.setPropertyStringTest).toEqual('');
      element.setPropertyStringTest = "test";
      expect(element.setPropertyStringTest).toEqual('test');
      expect(element.hasAttribute('set-property-string-test')).toBeTruthy();
      element.setAttribute('set-property-string-test', 'testtest');
      expect(element.setPropertyStringTest).toEqual('testtest');
    });
    it('get-property-test boolean (' + name + ')', function () {
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
      element.getPropertyBooleanTest = true;
      expect(element.getPropertyBooleanTest).toEqual(true);
      element.setAttribute('get-property-boolean-test', 'false')
      expect(element.getPropertyBooleanTest).toEqual(false);
    });
    it('set-property-test boolean (' + name + ')', function () {
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
      element.setPropertyBooleanTest = true;
      expect(element.setPropertyBooleanTest).toEqual(true);
      element.setAttribute('set-property-boolean-test', 'false')
      expect(element.setPropertyBooleanTest).toEqual(false);
    });
    it('get-property-test object (' + name + ')', function () {
      expect(element.getPropertyObjectTest).toEqual({});
      element.getPropertyObjectTest = { test: "test" };
      expect(element.getPropertyObjectTest).toEqual({ test: "test" });
      expect(element.hasAttribute('get-property-object-test')).toBeFalsy();
      element.setAttribute('get-property-object-test', '{"test" : "testtest"}');
      expect(element.getPropertyObjectTest).toEqual({ test: "testtest" });
    });
    it('set-property-test object (' + name + ')', function () {
      expect(element.setPropertyObjectTest).toEqual({});
      element.setPropertyObjectTest = { test: "test" };
      expect(element.setPropertyObjectTest).toEqual({ test: "test" });
      expect(element.hasAttribute('set-property-object-test')).toBeFalsy();
      element.setAttribute('set-property-object-test', '{"test" : "testtest"}');
      expect(element.setPropertyObjectTest).toEqual({ test: "testtest" });
    });
    it('stringPropertyWithNoReflection (' + name + ')', function () {
      expect(element.stringPropertyWithNoReflection).toEqual('');
      element.stringPropertyWithNoReflection = 'test';
      expect(element.stringPropertyWithNoReflection).toEqual('test');
      expect(element.hasAttribute('string-property-with-no-reflection')).toBeFalsy();
      element.setAttribute('string-property-with-no-reflection', 'testtest');
      expect(element.stringPropertyWithNoReflection).toEqual('testtest');
      expect(element.getAttribute('string-property-with-no-reflection')).toEqual('testtest');
    });
    it('numberPropertyWithNoReflection (' + name + ')', function () {
      expect(element.numberPropertyWithNoReflection).toEqual(0);
      element.numberPropertyWithNoReflection = 1;
      expect(element.numberPropertyWithNoReflection).toEqual(1);
      expect(element.hasAttribute('number-property-with-no-reflection')).toBeFalsy();
      element.setAttribute('number-property-with-no-reflection', '2');
      expect(element.numberPropertyWithNoReflection).toEqual(2);
      expect(element.getAttribute('number-property-with-no-reflection')).toEqual('2');
    });
    it('booleanPropertyWithNoReflection (' + name + ')', function () {
      expect(element.booleanPropertyWithNoReflection).toEqual(false);
      element.booleanPropertyWithNoReflection = true;
      expect(element.booleanPropertyWithNoReflection).toEqual(true);
      expect(element.hasAttribute('boolean-property-with-no-reflection')).toBeFalsy();
      element.booleanPropertyWithNoReflection = false;
      expect(element.booleanPropertyWithNoReflection).toEqual(false);
      element.setAttribute('boolean-property-with-no-reflection', 'true');
      expect(element.booleanPropertyWithNoReflection).toEqual(true);
      element.removeAttribute('boolean-property-with-no-reflection');
      expect(element.booleanPropertyWithNoReflection).toEqual(false);
      element.setAttribute('boolean-property-with-no-reflection', 'true');
      expect(element.booleanPropertyWithNoReflection).toEqual(true);
      element.setAttribute('boolean-property-with-no-reflection', 'false');
      expect(element.booleanPropertyWithNoReflection).toEqual(false);
    });
    it('objectPropertyWithReflection (' + name + ')', function () {
      expect(element.objectPropertyWithReflection).toEqual({});
      element.objectPropertyWithReflection = { "test": "test" };
      expect(element.getAttribute('object-property-with-reflection')).toEqual(JSON.stringify({ "test": "test" }));
      element.setAttribute('object-property-with-reflection', JSON.stringify({ "test": "testtest" }));
      expect(element.objectPropertyWithReflection).toEqual({ "test": "testtest" });
    });
    it('arrayPropertyWithReflection (' + name + ')', function () {
      expect(element.arrayPropertyWithReflection).toEqual([]);
      element.arrayPropertyWithReflection = [0, 1, 2];
      expect(element.getAttribute('array-property-with-reflection')).toEqual(JSON.stringify([0, 1, 2]));
      element.setAttribute('array-property-with-reflection', JSON.stringify([3, 4, 5]));
      expect(element.arrayPropertyWithReflection).toEqual([3, 4, 5]);
    });
    it('null-false-handlingtest', async function (done) {
      const element = new constructorInstance();
      document.querySelector('body').appendChild(element);
      await element.waitForRender();
      expect(element.stringPropertyWithInitializer).toEqual('test');
      expect(element.getAttribute('string-property-with-initializer')).toEqual('test');
      expect(element.booleanPropertyWithInitializer).toEqual(true);
      expect(element.getAttribute('boolean-property-with-initializer')).toEqual('true');
      expect(element.numberPropertyWithInitializer).toEqual(0);
      expect(element.getAttribute('number-property-with-initializer')).toEqual('0');
      expect(element.objectPropertyWithReflection).toEqual({});
      expect(element.getAttribute('object-property-with-reflection')).toEqual('{}');
      expect(element.arrayPropertyWithReflection).toEqual([]);
      expect(element.getAttribute('array-property-with-reflection')).toEqual('[]');

      element.stringPropertyWithInitializer = null;
      expect(element.hasAttribute('string-property-with-initializer')).toBeFalsy();
      element.numberPropertyWithInitializer = null;
      expect(element.hasAttribute('number-property-with-initializer')).toBeFalsy();
      element.booleanPropertyWithInitializer = false;
      expect(element.hasAttribute('boolean-property-with-initializer')).toBeFalsy();
      element.objectPropertyWithReflection = null;
      expect(element.hasAttribute('object-property-with-reflection')).toBeFalsy();
      element.arrayPropertyWithReflection = null;
      expect(element.hasAttribute('array-property-with-reflection')).toBeFalsy();

      element.stringPropertyWithInitializer = 'test';
      element.numberPropertyWithInitializer = 0;
      element.booleanPropertyWithInitializer = true;
      element.objectPropertyWithReflection = {};
      element.arrayPropertyWithReflection = [];
      expect(element.getAttribute('string-property-with-initializer')).toEqual('test');
      expect(element.getAttribute('number-property-with-initializer')).toEqual('0');
      expect(element.getAttribute('boolean-property-with-initializer')).toEqual('true');
      expect(element.getAttribute('object-property-with-reflection')).toEqual('{}');
      expect(element.getAttribute('array-property-with-reflection')).toEqual('[]');

      element.removeAttribute('string-property-with-initializer');
      element.removeAttribute('number-property-with-initializer');
      element.removeAttribute('boolean-property-with-initializer');
      element.removeAttribute('object-property-with-reflection');
      element.removeAttribute('array-property-with-reflection');
      expect(element.stringPropertyWithInitializer).toEqual(null);
      expect(element.numberPropertyWithInitializer).toEqual(null);
      expect(element.booleanPropertyWithInitializer).toEqual(false);
      expect(element.objectPropertyWithReflection).toEqual(null);
      expect(element.arrayPropertyWithReflection).toEqual(null);
      document.querySelector('body').removeChild(element);
      done();
    });
    it('regex test', async function(done) {
      const element = new constructorInstance();
      document.querySelector('body').appendChild(element);
      await element.waitForRender();
      element.regexpProperty = /test/;
      expect(element.regexpProperty.test('test')).toBeTruthy();
      element.setAttribute('regexp-property', '/foo/');
      expect(element.regexpProperty.test('foo')).toBeTruthy();
      document.querySelector('body').removeChild(element);
      done();
    });
    it('converter test', async function(done) {
      const element = new constructorInstance();
      document.querySelector('body').appendChild(element);
      await element.waitForRender();

      expect(element.onlyAttributeConverterProperty).toEqual('');
      expect(element.getAttribute('only-attribute-converter-property')).toEqual(null);

      element.onlyAttributeConverterProperty = 'test';
      expect(element.onlyAttributeConverterProperty).toEqual('test');
      expect(element.getAttribute('only-attribute-converter-property')).toEqual('test');

      element.setAttribute('only-attribute-converter-property', 'testtest');
      expect(element.getAttribute('only-attribute-converter-property')).toEqual('testtest');
      expect(element.onlyAttributeConverterProperty).toEqual('fromAttributetesttest');

      expect(element.attributePropertyConverterProperty).toEqual('');
      expect(element.getAttribute('attribute-property-converter-property')).toEqual(null);

      element.attributePropertyConverterProperty = 'test';
      expect(element.attributePropertyConverterProperty).toEqual('test');
      expect(element.getAttribute('attribute-property-converter-property')).toEqual('toAttributetest');

      element.setAttribute('attribute-property-converter-property', 'testtest');
      expect(element.attributePropertyConverterProperty).toEqual('fromAttributetesttest');
      expect(element.getAttribute('attribute-property-converter-property')).toEqual('testtest');

      document.querySelector('body').removeChild(element);
      done();
    });
  });
}
