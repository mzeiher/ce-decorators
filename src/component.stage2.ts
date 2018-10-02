import { Stage2ClassDecorator, ClassDecoratorDescriptor, ClassDecoratorResult } from './stage2decorators';
import { CustomElement } from './customelement.stage2';
import { getClassProperties } from './classproperties.stage2';
import { PropertyOptions } from './prop.stage2';
// import { CustomElement } from './element';

export interface ComponentOptions {
  tag: string;
  style?: string;
}

export function componentS2(_options: ComponentOptions): Stage2ClassDecorator<typeof CustomElement> {
  return (descriptor: ClassDecoratorDescriptor): ClassDecoratorResult<typeof CustomElement> => {
    return {
      elements: descriptor.elements,
      constructor: undefined,
      kind: 'class',
      finisher: (target) => {
        const prototype: any = Object.getPrototypeOf(target) as typeof CustomElement;
        const classProperties = getClassProperties(prototype);
        if (classProperties) {
          const targetClassProperties = getClassProperties(target);
          classProperties.forEach((value: PropertyOptions, key: string | symbol) => {
            targetClassProperties.set(key, value);
          })
        }
        window.customElements.define(_options.tag, target);
      }
    }
  }
}
