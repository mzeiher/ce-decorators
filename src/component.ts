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

import { render as litRender, html } from 'lit-html';
import { render as shadyRender } from 'lit-html/lib/shady-render';
import { CustomElement } from './element';
import { getPropertyOptions, PropDescriptor } from './propertymap';
import { needShadyDOM } from './shadycss';
import { STATE } from './state';
import { camelToKebapCase, deserializeValue, kebapToCamelCase, makeTemplate } from './utils';
import { getValue, ValueMapType } from './valuemap';
import { getWatcher } from './watchmap';

export type CustomElementClassType = { new(...args: any[]): CustomElement, prototype: CustomElement, observedAttributes: string[] };// tslint:disable-line
export type PropertyDecorator = <Clazz extends CustomElement>(target: Clazz, propertyKey: string | symbol) => void;
export type CustomElementClassDecorator = <Clazz extends CustomElementClassType>(target: Clazz) => Clazz; // tslint:disable-line

export interface ComponentOptions {
  tag: string;
  style?: string;
}

/**
 * Component decorator, defines a new component to be used as a custom element
 *
 * @param options (ComponentOptions) options to initialize the component
 */
export function Component(options: ComponentOptions): CustomElementClassDecorator { // tslint:disable-line:function-name
  return ((scopedOptions: ComponentOptions): CustomElementClassDecorator => {
    return <Clazz extends CustomElementClassType>(target: Clazz): Clazz => {
      const observedAttributes: string[] = target.observedAttributes;

      // tslint:disable-next-line
      const propMap: Map<string, PropDescriptor> = getPropertyOptions(target.prototype);
      if (propMap) {
        const attributes: string[] = Array.from(propMap.keys()).map((camelToKebapCase));
        observedAttributes.push(...attributes);
      }
      Object.defineProperty(target, 'observedAttributes', {
        writable: false,
        value: observedAttributes
      });

      if (needShadyDOM() && options.style) {
        const template: HTMLTemplateElement = document.createElement('template');
        // tslint:disable-next-line:no-inner-html
        template.innerHTML = `<style>${options.style}</style>`;
        (<any>window).ShadyCSS.prepareTemplateStyles(template, options.tag);
      }
      const decoratedTarget: Clazz = class DecoratedClass extends target {

        // tslint:disable-next-line:no-any
        [idx: string]: any;

        // tslint:disable-next-line:no-any
        constructor(...args: any[]) {
          super(...args);
          const value: ValueMapType | undefined = getValue(this);

          if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });

            let cache: TemplateStringsArray | null = null;
            let cachedLiterals: TemplateStringsArray | null = null;

            // tslint:disable-next-line:no-any
            this.renderToDom = (literals: TemplateStringsArray, ...placeholder: any[]): void => {
              if (cachedLiterals !== literals) {
                cache = null; // invalidate cache for complete re-render
                cachedLiterals = literals;
              }
              if (cache === null) {
                if (!needShadyDOM() && options.style) { //on native shadowdom path literals with <style>
                  const firstLiteral: string = literals.raw[0];
                  const newLiterals: string[] = literals.raw.map((currentValue: string) => currentValue);
                  newLiterals[0] = `<style>${options.style}</style>${firstLiteral}`;
                  cache = makeTemplate(newLiterals, newLiterals);
                } else {
                  cache = literals;
                }
              }

              if (needShadyDOM()) {
                shadyRender(html(cache, ...placeholder), this.shadowRoot!, scopedOptions.tag);
              } else {
                litRender(html(cache, ...placeholder), this.shadowRoot!);
              }
            };
          }
          value!.state = STATE.CONSTRUCTED;
        }

        protected connectedCallback(): void {
          const value: ValueMapType | undefined = getValue(this);
          value!.state = STATE.CONNECTED;
          super.connectedCallback();
          this.render();
          if (needShadyDOM()) {
            (<any>window).ShadyCSS.styleElement(this);
          }
        }

        protected disconnectedCallback(): void {
          getValue(this)!.state = STATE.DISCONNECTED;
          super.disconnectedCallback();
        }

        protected render(): void {
          const valMap: ValueMapType | undefined = getValue(this);
          if (valMap!.dirty && valMap!.state === STATE.CONNECTED) {
            super.render();
            valMap!.dirty = false;
          }
        }
        protected attributeChangedCallback(attrName: string, oldVal: string, newVal: string): void {
          if (oldVal === newVal) {
            return;
          }
          const properties: Map<string, PropDescriptor> = getPropertyOptions(target.prototype) || null;
          if (properties) {
            const propertyKey: string = kebapToCamelCase(attrName);
            const prop: PropDescriptor | undefined = properties.get(propertyKey);
            if (prop) {
              if (prop.options.readonly) {
                throw new Error('property is readonly');
              }
              if (prop.type === Number || prop.type === String || prop.type === Boolean) {
                if (prop.type === Boolean) { // indicate that a boolean property is set so don't return default value
                  getValue(this)!.properties[propertyKey] = true;
                }
                const watcher: (() => void)[] | undefined = getWatcher(target.prototype, propertyKey);
                watcher!.forEach((callback: (oldValue: any, newValue: any) => void) => {
                  callback.apply(this, [deserializeValue(oldVal, prop.type), deserializeValue(newVal, prop.type)]);
                });

                getValue(this)!.dirty = true;
                if (prop.originalSetter) {
                  prop.originalSetter.apply(this, [deserializeValue(newVal, prop.type)]);
                }

                this.render();
              } else {
                this[propertyKey] = deserializeValue(newVal, prop.type);
              }
            }
          } else {
            super.attributeChangedCallback(attrName, oldVal, newVal);
          }
        }

      };

      window.customElements.define(scopedOptions.tag, decoratedTarget);

      return decoratedTarget;
    };
  })(options);
}
