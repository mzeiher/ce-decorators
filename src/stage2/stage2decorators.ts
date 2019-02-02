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

/**
 * FieldDecoratorDescriptor
 */
export interface FieldDecoratorDescriptor {
  kind: 'field' | 'method' | 'accessor';
  key: string | symbol;
  placement: 'static' | 'prototype' | 'own';
  descriptor: PropertyDescriptor;
  initializer: () => string | boolean | number | Object | symbol;
  initialize(): () => string | boolean | number | Object | symbol;
}

/**
 * MethodDecoratorDesciptor
 */
export interface MethodDecoratorDesciptor {
  kind: 'method';
  key: string | symbol;
  placement: 'static' | 'prototype' | 'own';
  descriptor: PropertyDescriptor;
}

/**
 * ClassDecoratorDescriptor
 */
export interface ClassDecoratorDescriptor {
  kind: 'class';
  elements: Array<FieldDecoratorDescriptor | MethodDecoratorDesciptor>;
}

/**
 * FieldDecoratorResult
 */
export interface FieldDecoratorResult<T, C> {
  kind: 'field' | 'method' | 'accessor';
  key: string | symbol;
  placement: 'static' | 'prototype' | 'own';
  descriptor: PropertyDescriptor;
  initializer?: () => any; // tslint:disable-line:no-any old implementation
  initialize?: () => any; // tslint:disable-line:no-any
  extras?: Array<FieldDecoratorResult<T, C>>;
  finisher?: (target: C) => void;
}

/**
 * MethodDecoratorResult
 */
export interface MethodDecoratorResult<T, C> {
  kind: 'method';
  key: string | symbol;
  placement: 'static' | 'prototype' | 'own';
  descriptor: PropertyDescriptor;
  extras?: Array<FieldDecoratorResult<T, C>>;
  finisher?: (target: C) => void;
}

/**
 * ClassDecoratorResult
 */
export interface ClassDecoratorResult<T> {
  elements: Array<FieldDecoratorDescriptor | MethodDecoratorDesciptor>;
  constructor?: T;
  kind: 'class';
  finisher?: (target: T) => void | (new () => any); // tslint:disable-line:no-any
}

/**
 * Stage2FieldDecorator
 */
export type Stage2FieldDecorator<T, C> = (descriptor: FieldDecoratorDescriptor) => FieldDecoratorResult<T, C> | MethodDecoratorResult<T, C>;
/**
 * Stage2MethodDecorator
 */
export type Stage2MethodDecorator<T, C> = (descriptor: MethodDecoratorDesciptor) => MethodDecoratorResult<T, C>;
/**
 * Stage2ClassDecorator
 */
export type Stage2ClassDecorator<T> = (descriptor: ClassDecoratorDescriptor) => ClassDecoratorResult<T>;

/**
 * isStage2ClassDecorator
 * @param element 
 */
export function isStage2ClassDecorator(element: any) { // tslint:disable-line:no-any
  return element!.kind === 'class'; // tslint:disable-line
}

/**
 * isStage2FieldDecorator
 * @param element 
 */
export function isStage2FieldDecorator(element: any) { // tslint:disable-line:no-any
  return element!.kind === 'field' || element!.kind === 'method'; // tslint:disable-line
}

/**
 * isStage2MethodDecorator
 * @param element 
 */
export function isStage2MethodDecorator(element: any) { // tslint:disable-line:no-any
  return element!.kind === 'method'; // tslint:disable-line
}

/**
 * applyLegacyToStage2ClassDecorator
 */
export function applyStage2toLegacyClassDecorator<C>(target: C, decorator: Stage2ClassDecorator<C>): C | null {
  const classDescriptor: ClassDecoratorDescriptor = {
    kind: 'class',
    elements: [], // tslint:disable-line:no-any
  };
  const result = decorator(classDescriptor);
  let newConstructor: any = undefined; // tslint:disable-line
  if (result.finisher) {
    if (result.constructor) {
      newConstructor = result.finisher((<any>result.constructor)); // tslint:disable-line:no-any
    } else {
      newConstructor = result.finisher(<any>target); // tslint:disable-line:no-any
    }
  }

  return newConstructor || result.constructor || target; // tslint:disable-line
}

/**
 * applyLegacyToStage2FieldDecorator
 */
export function applyStage2ToLegacyFieldDecorator<T, C>(target: C,
                                                        propertyKey: string | symbol,
                                                        descriptor: PropertyDescriptor, decorator: Stage2FieldDecorator<T, C>): PropertyDescriptor {
  const fieldDecoratorDescriptor: FieldDecoratorDescriptor = {
    key: propertyKey,
    // tslint:disable-next-line
    initializer: descriptor ? (<any>descriptor)['initializer'] : undefined, // in babel case there is an initializer
    // tslint:disable-next-line
    initialize: descriptor ? (<any>descriptor)['initializer'] : undefined, // in babel case there is an initializer
    kind: descriptor ? descriptor.get || descriptor.set || typeof descriptor.value === 'function' ? 'method' : 'field' : 'field',
    descriptor: descriptor ? descriptor : { configurable: true, enumerable: false, value: null },
    placement: 'own',
  };
  const result = decorator(fieldDecoratorDescriptor);

  if (result.extras && result.extras.length > 0) {
    result.extras.forEach((value) => Object.defineProperty((<any>target).constructor.prototype, value.key, {// tslint:disable-line
      configurable: true,
      enumerable: false,
      value: fieldDecoratorDescriptor.initialize ? fieldDecoratorDescriptor.initialize() : undefined,
      writable: true,
    }));
  }
  if (result.finisher) {
    result.finisher(<any>target.constructor); // tslint:disable-line
  }
  return result.descriptor;
}

/**
 * applyLegacyToStage2MethodDecorator
 */
export function applyStage2ToLegacyMethodDecorator<T, C>(target: C,
                                                         propertyKey: string | symbol,
                                                         descriptor: TypedPropertyDescriptor<any>, // tslint:disable-line:no-any
                                                         decorator: Stage2MethodDecorator<T, C>): TypedPropertyDescriptor<any> | void { // tslint:disable-line:no-any
  const methodDecoratorDescriptor: MethodDecoratorDesciptor = {
    descriptor: <any>descriptor, // tslint:disable-line:no-any
    key: propertyKey,
    kind: 'method',
    placement: 'prototype',
  };
  const result = decorator(methodDecoratorDescriptor);

  if (result.extras && result.extras.length > 0) {
    result.extras.forEach((value) => Object.defineProperty((<any>target).constructor.prototype, value.key, value.descriptor)); // tslint:disable-line
  }

  if (result.finisher) {
    result.finisher(<any>target.constructor); // tslint:disable-line:no-any
  }
  return result.descriptor;
}
