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
const origReflect: any = (<any>window).Reflect || {}; // tslint:disable-line:no-any

type MetadataMap = Map<string, any>; // tslint:disable-line:no-any
type PropMap = Map<string | symbol, MetadataMap>;
type TargetMap = Map<Object, PropMap>;
type DecoratorFunc = (target: Object, propertyKey: string | symbol, more: any) => any | PropertyDescriptor; // tslint:disable-line:no-any

const reflectMap: TargetMap = new Map();

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

function decorate(decorators: Array<DecoratorFunc>, target: Object, propertyKey: string | symbol, description: any): any | void { // tslint:disable-line:no-any
  if (typeof origReflect === 'object' && typeof origReflect.decorate === 'function' && origReflect.decorate !== decorate) { // tslint:disable-line:no-unsafe-any
    origReflect.decorate(decorators, target, propertyKey, description); // tslint:disable-line:no-unsafe-any
  }
  const desciptor: any = decorators.reverse() // tslint:disable-line:no-any
    .reduce<PropertyDescriptor>((prevValue, currentValue) => (currentValue(target, propertyKey, prevValue) || prevValue), description); // tslint:disable-line
  return desciptor || description;
}

function metadata(metadataKey: string, metaDataValue: any): (target: Object, property: string | symbol) => void { // tslint:disable-line:no-any
  if (typeof origReflect === 'object' && typeof origReflect.metadata === 'function' && origReflect.metadata !== metadata) { // tslint:disable-line:no-unsafe-any
    return origReflect.metadata(metadataKey, metaDataValue); // tslint:disable-line:no-unsafe-any
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

function getMetadata(metadataKey: string, target: Object, propertyKey?: string | symbol): any { // tslint:disable-line:no-any
  if (typeof origReflect === 'object' && typeof origReflect.getMetadata === 'function' && origReflect.getMetadata !== getMetadata) { // tslint:disable-line:no-unsafe-any
    return origReflect.getMetadata(metadataKey, target, propertyKey); // tslint:disable-line:no-unsafe-any
  } else {

    return getOrCreateMetadataMap(getOrCreatePropMap(reflectMap, target), propertyKey).get(metadataKey);
  }
}

if (!(<any>window).Reflect) { // tslint:disable-line:no-any
  (<any>window).Reflect = { decorate, getMetadata, metadata }; // tslint:disable-line:no-any
  (<any>window).ReflectPoorlyFill = { decorate, getMetadata, metadata }; // tslint:disable-line:no-any
} else {
  if (!(<any>window).Reflect.decorate) { // tslint:disable-line
    (<any>window).Reflect.decorate = decorate; // tslint:disable-line
  }
  if (!(<any>window).Reflect.getMetadata) { // tslint:disable-line
    (<any>window).Reflect.getMetadata = getMetadata; // tslint:disable-line
  }
  if (!(<any>window).Reflect.metadata) { // tslint:disable-line
    (<any>window).Reflect.metadata = metadata; // tslint:disable-line
  }
  (<any>window).ReflectPoorlyFill = { decorate, getMetadata, metadata }; // tslint:disable-line
}
