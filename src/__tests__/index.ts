
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

import testProperties from "./test.properties";
import testRender from './test.render';
import testWatcher from './test.watcher';
import testEvents from './test.events';
import testService from './test.service';
import testStates from './test.states';
import { ServiceTest } from './services/ServiceObject';
import { ServiceTestWithType } from './services/ServiceObjectWithType';
import { TestWithMultipleProperties } from './components/TestWithMultipleProperties';
import { TestWithMultiplePropertiesWithType } from './components/TestWithMultiplePropertiesWithType';
import { TestWithMultiplePropertiesWithTypeTS } from './components/TestWithMultiplePropertiesWithTypeTS';
import { TestWithMultiplePropertiesWithTypeStage2 } from './components/TestWithMultiplePropertiesWithType.stage2';
import { TestWithMultiplePropertiesLazy } from './components/TestWithMultiplePropertiesLazy';
import { TestWithMultiplePropertiesWithTypeLazy } from './components/TestWithMultiplePropertiesWithTypeLazy';
import { TestWithMultiplePropertiesWithTypeTSLazy } from './components/TestWithMultiplePropertiesWithTypeTSLazy';
import { TestWithMultiplePropertiesWithTypeStage2Lazy } from './components/TestWithMultiplePropertiesWithTypeLazy.stage2';
import testInterceptors from './test.interceptors';
import testLifecycle from './test.lifecycle';
import testDeprecated from './test.deprecated';
import { TestWithMultiplePropertiesNoShadow } from './components/TestWithMultiplePropertiesNoShadow';
import testTemplatestrings from './test.templatestrings';

/* istanbul ignore next */
describe('root', function () {
  beforeAll(function (done) {
    if ((<any>window).WebComponents.ready) {
      done();
    } else {
      window.addEventListener('WebComponentsReady', function (_e) {
        done();
      })
    }
  });
  testTemplatestrings();
  [
    { class: TestWithMultipleProperties, name: 'TestWithMultipleProperties' },
    { class: TestWithMultiplePropertiesNoShadow, name: 'TestWithMultiplePropertiesNoShadow' },
    { class: TestWithMultiplePropertiesWithTypeTS, name: 'TestWithMultiplePropertiesWithTypeTS' },
    { class: TestWithMultiplePropertiesWithType, name: 'TestWithMultiplePropertiesWithType' },
    { class: TestWithMultiplePropertiesWithTypeStage2, name: 'TestWithMultiplePropertiesWithTypeStage2' },
    { class: TestWithMultiplePropertiesLazy, name: 'TestWithMultiplePropertiesLazy' },
    { class: TestWithMultiplePropertiesWithTypeTSLazy, name: 'TestWithMultiplePropertiesWithTypeTSLazy' },
    { class: TestWithMultiplePropertiesWithTypeLazy, name: 'TestWithMultiplePropertiesWithTypeLazy' },
    { class: TestWithMultiplePropertiesWithTypeStage2Lazy, name: 'TestWithMultiplePropertiesWithTypeStage2Lazy' }
  ].forEach((value) => {
    testEvents(value.class, value.name);
    testProperties(value.class, value.name)
    testRender(value.class, value.name);
    testStates(value.class, value.name);
    testWatcher(value.class, value.name);
    testInterceptors(value.class, value.name);
    testLifecycle(value.class, value.name);
    testDeprecated(value.class, value.name);
  });
  [{ class: ServiceTest, name: 'ServiceTest' },
  { class: ServiceTestWithType, name: 'ServiceTestWithType' }].forEach(value => testService(value.class, value.name));
});
