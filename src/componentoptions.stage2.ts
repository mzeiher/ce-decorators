import { CustomElement } from "./customelement.stage2";
import { ComponentOptions } from './component.stage2';

const map: Map<typeof CustomElement, ComponentOptions> = new Map();

export function getComponentOptions(target: typeof CustomElement): ComponentOptions {
  return map.get(target)
}
export function setComponentOptions(target: typeof CustomElement, options: ComponentOptions): void {
  map.set(target, options);
}
