import { CustomElement } from "./customelement.stage2";
import { PropertyOptions } from './prop.stage2';

const map: Map<typeof CustomElement, ClassProperties> = new Map();

export type ClassProperties = Map<string | symbol, PropertyOptions>;

export function getClassProperties(target: typeof CustomElement): ClassProperties {
  let properties: ClassProperties | undefined = map.get(target);
  if (!properties) {
    properties = new Map();
    map.set(target, properties);
  }
  return properties;
}
