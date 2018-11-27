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

import { ServiceTest } from "./services/ServiceObject";
import { ServiceTestWithType } from './services/ServiceObjectWithType';
declare var BABEL_COMPILE: boolean;

/* istanbul ignore next */
export default (constructorInstance: { new(): ServiceTest | ServiceTestWithType }, name: string) => {
  if (BABEL_COMPILE && constructorInstance === ServiceTest) return;
  describe('service tests (' + name + ')', function () {
    it('singleton service test', function () {
      const service1: ServiceTest = new constructorInstance();
      const service2: ServiceTest = new constructorInstance();

      expect(service1.singletonService).toBe(service2.singletonService);
    });

    it('instance service test (' + name + ')', function () {
      const service1: ServiceTest = new constructorInstance();
      const service2: ServiceTest = new constructorInstance();

      expect(service1.instanceService).not.toBe(service2.instanceService);
    });

    it('nested singleton service test (' + name + ')', function () {
      const service1: ServiceTest = new constructorInstance();
      const service2: ServiceTest = new constructorInstance();

      expect(service1.singletonService.nestedSingletonService).toBe(service2.singletonService.nestedSingletonService);
      expect(service1.instanceService.nestedSingletonService).toBe(service2.instanceService.nestedSingletonService);
    });

    it('nested instance service test (' + name + ')', function () {
      const service1: ServiceTest = new constructorInstance();
      const service2: ServiceTest = new constructorInstance();

      expect(service1.instanceService.nestedInstanceService).not.toBe(service2.instanceService.nestedInstanceService, "different nested instances");
      expect(service1.singletonService.nestedInstanceService).toBe(service2.singletonService.nestedInstanceService, "same nested instances on singletons");
    });

  });
}
