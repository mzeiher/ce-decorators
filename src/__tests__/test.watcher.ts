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
  describe('watcher tests (' + name + ')', function () {
    it('string watcher test (' + name + ')', function () {
      let element: TESTABLECLASSES = new constructorInstance();
      spyOn(<any>element, 'watchGuard').and.callThrough();
      element.stringProperty = "test";
      expect((<any>element).watchGuard).toHaveBeenCalledWith(undefined, 'test');
      element.setAttribute('string-property', "test2");
      expect((<any>element).watchGuard).toHaveBeenCalledWith('test', 'test2');
    });
    it('boolean watcher test (' + name + ')', function () {
      let element: TESTABLECLASSES = new constructorInstance();
      spyOn(<any>element, 'watchGuard').and.callThrough();
      element.booleanProperty = true;
      expect((<any>element).watchGuard).toHaveBeenCalledWith(undefined, true);
      element.booleanProperty = false;
      expect((<any>element).watchGuard).toHaveBeenCalledWith(true, false);
      element.setAttribute('boolean-property', 'true');
      expect((<any>element).watchGuard).toHaveBeenCalledWith(false, true);
      element.removeAttribute('boolean-property');
      expect((<any>element).watchGuard).toHaveBeenCalledWith(true, false);
    });
    it('number watcher test (' + name + ')', function () {
      let element: TESTABLECLASSES = new constructorInstance();
      spyOn(<any>element, 'watchGuard').and.callThrough();
      element.numberProperty = 0;
      expect((<any>element).watchGuard).toHaveBeenCalledWith(undefined, 0);
      element.setAttribute('number-property', "1");
      expect((<any>element).watchGuard).toHaveBeenCalledWith(0, 1);
    });
    it('object watcher test (' + name + ')', function () {
      let element: TESTABLECLASSES = new constructorInstance();
      spyOn(<any>element, 'watchGuard').and.callThrough();
      element.objectProperty = { test: "test" };
      expect((<any>element).watchGuard).toHaveBeenCalledWith(undefined, { test: "test" });
      element.setAttribute('object-property', '{"test" : "test2"}');
      expect((<any>element).watchGuard).toHaveBeenCalledWith({ test: "test" }, { test: "test2" });
    });
    it('array watcher test (' + name + ')', function () {
      let element: TESTABLECLASSES = new constructorInstance();
      spyOn(<any>element, 'watchGuard').and.callThrough();
      element.arrayProperty = [0, 1];
      expect((<any>element).watchGuard).toHaveBeenCalledWith(undefined, [0, 1]);
      element.setAttribute('array-property', "[2,3]");
      expect((<any>element).watchGuard).toHaveBeenCalledWith([0, 1], [2, 3]);
    });
  });
}
