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

import { camelToKebapCase, kebapToCamelCase, deserializeValue, serializeValue, makeTemplateString } from './utils';
import { getClassProperties } from './classproperties.stage2';
import { COMPONENT_STATE } from './componentstate.stage2';
import { PROPERTY_STATE } from './propertystate.stage2';
import { PropertyOptions } from './prop.stage2';
import { TemplateResult } from 'lit-html';
import { render, html } from 'lit-html/lib/shady-render';
import { getComponentOptions } from './componentoptions.stage2';
import { getPropertyWatcher } from './watchmap.stage2';

export abstract class CustomElement extends HTMLElement {
  [index: string]: any;

  static _fromAttribute(this: typeof CustomElement, name: string, _oldValue: any, _newValue: any, _instance: CustomElement) {
    if (_instance._propertyState !== PROPERTY_STATE.REFLECTING) {
      const propertyName = kebapToCamelCase(name);
      const classProperty: PropertyOptions = getClassProperties(this).get(propertyName);

      if (classProperty.reflectAsAttribute === false) return;

      _instance._propertyState = PROPERTY_STATE.UPDATE_FROM_ATTRIBUTE;
      this._fromProperty(propertyName, deserializeValue(_oldValue, classProperty.type), deserializeValue(_newValue, classProperty.type), _instance);
    }
  }

  static _fromProperty(this: typeof CustomElement, propertyKey: string, _oldValue: any, _newValue: any, _instance: CustomElement) {
    if (_oldValue !== _newValue) {
      const classProperty: PropertyOptions = getClassProperties(this).get(propertyKey);
      const watcher = getPropertyWatcher(this, propertyKey);
      watcher.forEach(value => value.apply(_instance, [_oldValue, _newValue]));
      if (classProperty.reflectAsAttribute || classProperty.reflectAsAttribute === undefined) {
        if (classProperty.type === Boolean) {
          if (_instance._propertyState !== PROPERTY_STATE.UPDATE_FROM_ATTRIBUTE) {
            _instance._propertyState = PROPERTY_STATE.REFLECTING;
            if (_newValue) {
              _instance.setAttribute(camelToKebapCase(propertyKey), serializeValue(_newValue, classProperty.type));
            } else {
              _instance.removeAttribute(camelToKebapCase(propertyKey));
            }
          }
        } else if (classProperty.type === String || classProperty.type === Number || classProperty.reflectAsAttribute === true) {
          if (_instance._propertyState !== PROPERTY_STATE.UPDATE_FROM_ATTRIBUTE) {
            _instance._propertyState = PROPERTY_STATE.REFLECTING;
            _instance.setAttribute(camelToKebapCase(propertyKey), serializeValue(_newValue, classProperty.type));
          }
        }
      }
      _instance._propertyState = PROPERTY_STATE.UPDATE_PROPERTY;
      _instance[propertyKey] = _newValue;
      _instance._propertyState = PROPERTY_STATE.DIRTY;

      _instance.scheduleRender();
    }
  }
  static get observedAttributes(this: typeof CustomElement): string[] {
    return Array.from(getClassProperties(this).keys()).map(value => camelToKebapCase(value.toString()));
  }

  constructor() {
    super();
    this._componentState = COMPONENT_STATE.CONSTRUCTED;
    this.attachShadow({ mode: 'open' });
  }

  protected _componentState: COMPONENT_STATE = COMPONENT_STATE.INIT;
  protected _propertyState: PROPERTY_STATE = PROPERTY_STATE.DIRTY

  protected _renderScheduled: boolean = false;
  protected _templateCache: TemplateStringsArray = null;

  abstract render(): TemplateResult;

  scheduleRender() {
    if (this._componentState === COMPONENT_STATE.CONNECTED &&
      this._propertyState === PROPERTY_STATE.DIRTY &&
      !this._renderScheduled) {
      this._renderScheduled = true;
      Promise.resolve().then(() => {
        this._renderScheduled = false;
        if(this._templateCache === null) {
          const style = getComponentOptions(this.constructor as typeof CustomElement)!.style || '';
          this._templateCache = makeTemplateString([`<style>${style}</style>`, ''], [`<style>${style}</style>`, '']);
        }
        render(html(this._templateCache, this.render()), this.shadowRoot, '');
        this._propertyState = PROPERTY_STATE.RENDERED
      })
    }
  }

  connectedCallback() {
    this._componentState = COMPONENT_STATE.CONNECTED;
    this.scheduleRender();
  }

  disconnectedCallback() {
    this._componentState = COMPONENT_STATE.DISCONNECTED;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      (this.constructor as typeof CustomElement)._fromAttribute(name, oldValue, newValue, this);
    }
  }

}
