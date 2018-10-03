import { CustomElement } from "./customelement.stage2";

const map: Map<typeof CustomElement, PropertyWatcher> = new Map();

export type PropertyWatcher = Map<string, Array<() => void>>;

export function getPropertyWatcher(target: typeof CustomElement, property: string): Array<() => void> {
  let properties: PropertyWatcher | undefined = map.get(target);
  if (!properties) {
    properties = new Map();
    map.set(target, properties);
  }
  let propertyWatcher = properties.get(property);
  if (!propertyWatcher) {
    propertyWatcher = [];
    properties.set(property, propertyWatcher);
  }
  return propertyWatcher;
}

export function getAllPropertyWatcher(target: typeof CustomElement): PropertyWatcher {
  let properties: PropertyWatcher | undefined = map.get(target);
  if (!properties) {
    properties = new Map();
    map.set(target, properties);
  }
  return properties;
}
