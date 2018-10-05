import { Stage2FieldDecorator, FieldDecoratorDescriptor } from './stage2decorators';

export function traceS2(): Stage2FieldDecorator<Object, typeof Object> {
  return (descriptor: FieldDecoratorDescriptor) => {
    if (descriptor.kind === 'field') {
      const key = `___${descriptor.key.toString()}`;
      return {
        extras: [
          {
            key: key,
            kind: 'field',
            placement: 'own',
            initializer: descriptor.initializer,
            descriptor: {
              configurable: true,
              enumerable: false,
              writable: true,
            }
          }
        ],
        key: descriptor.key,
        kind: 'method',
        placement: 'own',
        descriptor: {
          configurable: true,
          enumerable: false,
          get: function (this: Object) {
            console.log(`[LOG] [${this.constructor.name}] setter called on property ${descriptor.key.toString()}`);
            return (<any>this)[key];
          },
          set: function (this: Object, value: any) {
            console.log(`[LOG] [${this.constructor.name}] setter called on property ${descriptor.key.toString()} with value ${value}`);
            (<any>this)[key] = value
          }
        }
      }
    } else {
      return {
        kind: 'method',
        descriptor: descriptor.descriptor.value ? {
          configurable: true,
          enumerable: false,
          value: function (...args:any[]) {
            console.log(`[LOG] [${this.constructor.name}] method ${descriptor.key.toString()} calles with args`, [...args]);
            descriptor.descriptor.value.apply(this, [...args]);
          }
        } : {
          configurable: true,
          enumerable: false,
          get: function (this: Object) {
            console.log(`[LOG] [${this.constructor.name}] setter called on property ${descriptor.key.toString()}`);
            return descriptor.descriptor.get.apply(this);
          },
          set: function (this: Object, value: any) {
            console.log(`[LOG] [${this.constructor.name}] setter called on property ${descriptor.key.toString()} with value ${value}`);
            descriptor.descriptor.set.apply(this, [value]);
          }
        },
        key: descriptor.key,
        placement: 'own',
        extras: []
      }
    }
  }
}
