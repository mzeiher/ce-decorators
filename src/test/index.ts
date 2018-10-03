
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
import { TestWithMultipleProperties } from './components/TestWithMultipleProperties';
import { TestWithMultiplePropertiesWithType } from './components/TestWithMultiplePropertiesWithType';
import { TestWithMultiplePropertiesWithTypeTS } from './components/TestWithMultiplePropertiesWithTypeTS';
import { TestWithMultiplePropertiesWithTypeStage2 } from './components/TestWithMultiplePropertiesWithType.stage2';
import { ServiceTest } from './services/ServiceObject';
import { ServiceTestWithType } from './services/ServiceObjectWithType';

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
  [
    { class: TestWithMultipleProperties, name: 'TestWithMultipleProperties' },
    { class: TestWithMultiplePropertiesWithTypeTS, name: 'TestWithMultiplePropertiesWithTypeTS' },
    { class: TestWithMultiplePropertiesWithType, name: 'TestWithMultiplePropertiesWithType' },
    { class: TestWithMultiplePropertiesWithTypeStage2, name: 'TestWithMultiplePropertiesWithTypeStage2' }
  ].forEach((value) => {
    testEvents(value.class, value.name);
    testProperties(value.class, value.name)
    testRender(value.class, value.name);
    testStates(value.class, value.name);
    testWatcher(value.class, value.name);
  });
  [{ class: ServiceTest, name: 'ServiceTest' },
  { class: ServiceTestWithType, name: 'ServiceTestWithType' }].forEach(value => testService(value.class, value.name));
});
