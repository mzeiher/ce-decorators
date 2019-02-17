import { CustomElement } from '../customelement';

const componentsToRender: Array<CustomElement> = [];
let currentAnimationFrame: number | null = null;

let componentsInRenderBatch: number = 25;
const frameBudget = 1000 / 60;
let currentAverageRenderTime: number = frameBudget / componentsInRenderBatch;

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
  componentsToRender.push(component);
  scheduleNextRAFRender();
}

function scheduleNextRAFRender() {
  if (currentAnimationFrame === null) {
    currentAnimationFrame = window.requestAnimationFrame(() => {
      let i = 0;
      while (i < componentsInRenderBatch) {
        const component = componentsToRender.splice(0, 1)[0];
        if (!component) break;
        const start = performance.now();
        component.renderComponent();
        currentAverageRenderTime = ((performance.now() - start) + currentAverageRenderTime) / 2;
        componentsInRenderBatch = Math.round(frameBudget / currentAverageRenderTime);
        i++;
      }
      currentAnimationFrame = null;
      scheduleNextRAFRender();
    });
  }
}
