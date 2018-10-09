import { CustomElement } from "./customelement.stage2";

const map: Map<typeof CustomElement, PropertyInterceptor> = new Map();

export type PropertyInterceptor = Map<string, Array<() => void>>;

export function getPropertyInterceptor(target: typeof CustomElement, property: string): Array<() => void> {
  let properties: PropertyInterceptor | undefined = map.get(target);
  if (!properties) {
    properties = new Map();
    map.set(target, properties);
  }
  let propertyInterceptor = properties.get(property);
  if (!propertyInterceptor) {
    propertyInterceptor = [];
    properties.set(property, propertyInterceptor);
  }
  return propertyInterceptor;
}

export function getAllPropertyInterceptors(target: typeof CustomElement): PropertyInterceptor {
  let properties: PropertyInterceptor | undefined = map.get(target);
  if (!properties) {
    properties = new Map();
    map.set(target, properties);
  }
  return properties;
}
