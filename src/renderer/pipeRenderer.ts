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

import { CustomElement } from '../customelement';
import { renderComponent } from './renderComponent';

const componentsToRender: Array<CustomElement> = [];
let currentAnimationFrame: number | null = null;

const frameBudget = 1000 / 60;

/**
 * remove component from render queue
 * @param component 
 */
export function removeComponentFromRenderPipeline(component: CustomElement) {
  componentsToRender.splice(componentsToRender.indexOf(component), 1);
}

/**
 * add ocmponent to render queue
 * @param component 
 */
export function addComponentToRenderPipeline(component: CustomElement) {
  if (componentsToRender.indexOf(component) < 0) {
    componentsToRender.push(component);
  }
  scheduleNextRAFRender();
}

function scheduleNextRAFRender() {
  if (currentAnimationFrame === null) {
    currentAnimationFrame = window.requestAnimationFrame(() => {
      let currentFrameBudget = frameBudget;
      do {
        const component = componentsToRender.splice(0, 1)[0];
        if (!component) break;
        const start = performance.now();

        renderComponent.apply(component);

        const renderTime = performance.now() - start;
        currentFrameBudget = currentFrameBudget - renderTime;
      } while (currentFrameBudget > 0);
      currentAnimationFrame = null;
      scheduleNextRAFRender();
    });
  }
}
