import { Stage2ClassDecorator, ClassDecoratorDescriptor, ClassDecoratorResult } from './stage2decorators';
import { CustomElement } from './customelement.stage2';
import { getClassProperties } from './classproperties.stage2';
import { PropertyOptions } from './prop.stage2';
import { setComponentOptions, getComponentOptions } from './componentoptions.stage2';
import { getAllPropertyWatcher, getPropertyWatcher } from './watchmap.stage2';
// import { CustomElement } from './element';

export interface ComponentOptions {
  tag: string;
  style?: string;
  inheritStyle?: boolean;
}

export function componentS2(options: ComponentOptions): Stage2ClassDecorator<typeof CustomElement> {
  return (descriptor: ClassDecoratorDescriptor): ClassDecoratorResult<typeof CustomElement> => {
    return {
      elements: descriptor.elements,
      constructor: undefined,
      kind: 'class',
      finisher: (target) => {
        const prototype: any = Object.getPrototypeOf(target) as typeof CustomElement;
        const prototypeClassProperties = getClassProperties(prototype);
        if (prototypeClassProperties) {
          const targetClassProperties = getClassProperties(target);
          prototypeClassProperties.forEach((value: PropertyOptions, key: string | symbol) => {
            targetClassProperties.set(key, value);
          })
        }
        if(options.inheritStyle) {
          options.style = getComponentOptions(prototype).style || '' + options.style;
        }
        const prototypeWatcher = getAllPropertyWatcher(prototype);
        if(prototypeWatcher.size > 0) {
          Array.from(prototypeWatcher.entries()).forEach(value => {
            getPropertyWatcher(target, value["0"]).push(...value["1"]);
          });
        }
        setComponentOptions(target, options);
        window.customElements.define(options.tag, target);
      }
    }
  }
}
