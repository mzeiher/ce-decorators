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

export interface FieldDecoratorDescriptor {
  kind: 'field' | 'method';
  key: string | symbol;
  placement: 'static' | 'prototype' | 'own';
  descriptor: PropertyDescriptor;
  initializer: () => string | boolean | number | Object | symbol;
}

export interface MethodDecoratorDesciptor {
  kind: 'method';
  key: string | symbol;
  placement: 'static' | 'prototype' | 'own';
  descriptor: PropertyDescriptor;
}

export interface ClassDecoratorDescriptor {
  kind: 'class';
  elements: Array<FieldDecoratorDescriptor | MethodDecoratorDesciptor>;
}

export interface FieldDecoratorResult<T, C> {
  kind: 'field' | 'method';
  key: string | symbol;
  placement: 'static' | 'prototype' | 'own';
  descriptor: PropertyDescriptor;
  initializer?: () => any;
  extras?: Array<FieldDecoratorResult<T, C>>;
  finisher?: (target: C) => void;
}

export interface MethodDecoratorResult<T, C> {
  kind: 'method';
  key: string | symbol;
  placement: 'static' | 'prototype' | 'own';
  descriptor: PropertyDescriptor;
  extras?: Array<FieldDecoratorResult<T, C>>;
  finisher?: (target: C) => void;
}

export interface ClassDecoratorResult<T> {
  elements: Array<FieldDecoratorDescriptor | MethodDecoratorDesciptor>;
  constructor?: T;
  kind: 'class',
  finisher?: (target: T) => void | { new ():any};
}

export type Stage2FieldDecorator<T, C> = (descriptor: FieldDecoratorDescriptor) => FieldDecoratorResult<T, C> | MethodDecoratorResult<T, C>;
export type Stage2MethodDecorator<T, C> = (descriptor: MethodDecoratorDesciptor) => MethodDecoratorResult<T, C>;
export type Stage2ClassDecorator<T> = (descriptor: ClassDecoratorDescriptor) => ClassDecoratorResult<T>;

export function isStage2ClassDecorator(element: any) {
  return element!.kind === 'class';
}

export function isStage2FieldDecorator(element: any) {
  return element!.kind === 'field' || element!.kind === 'method';
}

export function isStage2MethodDecorator(element: any) {
  return element!.kind === 'method';
}

export function applyLegacyToStage2ClassDecorator<C>(target: C, decorator: Stage2ClassDecorator<C>): C | null {
  const classDescriptor: ClassDecoratorDescriptor = {
    kind: 'class',
    elements: []
  }
  const result = decorator(classDescriptor);
  let newConstructor: any = undefined;
  if (result.finisher) {
    if (result.constructor) {
      newConstructor = result.finisher((<any>result.constructor));
    }
    else {
      newConstructor = result.finisher(<any>target);
    }
  }

  return newConstructor || result.constructor || target;
}

export function applyLegacyToStage2FieldDecorator<T, C>(target: C, propertyKey: string | symbol, descriptor: PropertyDescriptor, decorator: Stage2FieldDecorator<T, C>): PropertyDescriptor {
  const fieldDecoratorDescriptor: FieldDecoratorDescriptor = {
    key: propertyKey,
    initializer: descriptor ? (<any>descriptor)['initializer'] : undefined, // in babel case there is an initializer
    kind: descriptor ? descriptor.get || descriptor.set || typeof descriptor.value === 'function' ? 'method' : 'field' : 'field',
    descriptor: descriptor ? descriptor : { configurable: true, enumerable: false, value: null },
    placement: 'own'
  }
  const result = decorator(fieldDecoratorDescriptor);

  if (result.extras && result.extras.length > 0) {
    result.extras.forEach(value => Object.defineProperty((<any>target).constructor.prototype, value.key, {
      configurable: true,
      enumerable: false,
      value: fieldDecoratorDescriptor.initializer ? fieldDecoratorDescriptor.initializer() : undefined,
      writable: true
    }));
  }
  if (result.finisher) {
    result.finisher(<any>target.constructor);
  }
  return result.descriptor;
}

export function applyLegacyToStage2MethodDecorator<T, C>(target: C, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>, decorator: Stage2MethodDecorator<T, C>): TypedPropertyDescriptor<any> | void {
  const methodDecoratorDescriptor: MethodDecoratorDesciptor = {
    descriptor: <any>descriptor,
    key: propertyKey,
    kind: 'method',
    placement: 'prototype'
  }
  const result = decorator(methodDecoratorDescriptor);

  if (result.extras && result.extras.length > 0) {
    result.extras.forEach(value => Object.defineProperty((<any>target).constructor.prototype, value.key, value.descriptor));
  }

  if (result.finisher) {
    result.finisher(<any>target.constructor);
  }
  return result.descriptor;
}
