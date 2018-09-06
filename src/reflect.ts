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

 // reflect polyfill in case reflect-metadata package not installed
const origReflect: any = Reflect;

type MetadataMap = Map<string, any>;
type PropMap = Map<string | symbol, MetadataMap>;
type TargetMap = Map<Object, PropMap>;
type DecoratorFunc = (target: Object, propertyKey: string | symbol, more: any) => void;

const reflectMap: TargetMap = new Map();

namespace ReflectPoorlyFill {

  function getOrCreateMetadataMap(map: PropMap, property: string | symbol): MetadataMap {
    let metadataMap: MetadataMap = map.get(property);
    if (!metadataMap) {
      metadataMap = new Map();
      map.set(property, metadataMap);
    }

    return metadataMap;
  }

  function getOrCreatePropMap(map: TargetMap, target: Object): PropMap {
    let propMap: PropMap = map.get(target);
    if (!propMap) {
      propMap = new Map();
      map.set(target, propMap);
    }

    return propMap;
  }

  export function decorate(decorators: DecoratorFunc[], target: Object, propertyKey: string | symbol, description: any): any | void {
    if (typeof origReflect === 'object' && typeof origReflect.decorate === 'function' && origReflect.decorate !== decorate) {
      origReflect.decorate(decorators, target, propertyKey, description);
    }
    const desciptor: any = decorators.reverse()
      .map((value: DecoratorFunc) => value(target, propertyKey, description))
      .reduce((_prevValue: any, currentValue: any) => currentValue ? currentValue : null);

    return desciptor || description;
  }

  export function metadata(metadataKey: string, metaDataValue: any): (target: Object, property: string | symbol) => void {
    if (typeof origReflect === 'object' && typeof origReflect.metadata === 'function' && origReflect.metadata !== metadata) {
      return origReflect.metadata(metadataKey, metaDataValue);
    } else {

      return (target: Object, property: string | symbol): void => {
        if (!property) {
          property = '';
        }
        const propMap: PropMap = getOrCreatePropMap(reflectMap, target);
        getOrCreateMetadataMap(propMap, property).set(metadataKey, metaDataValue);
      };
    }
  }

  export function getMetadata(metadataKey: string, target: Object, propertyKey?: string | symbol): any {
    if (typeof origReflect === 'object' && typeof origReflect.getMetadata === 'function' && origReflect.getMetadata !== getMetadata) {
      return origReflect.getMetadata(metadataKey, target, propertyKey);
    } else {

      return getOrCreateMetadataMap(getOrCreatePropMap(reflectMap, target), propertyKey).get(metadataKey);
    }
  }

  if (!(<any>window).Reflect) {
    (<any>window).Reflect = { decorate, getMetadata, metadata };
    (<any>window).ReflectPoorlyFill = { decorate, getMetadata, metadata };
  } else if (!(<any>window).Reflect.decorate) {
    Object.assign((<any>window).Reflect, { decorate, getMetadata, metadata });
    (<any>window).ReflectPoorlyFill = { decorate, getMetadata, metadata };
  }

}
