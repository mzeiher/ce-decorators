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
import { getClassProperties } from './classproperties';
import { COMPONENT_STATE } from './componentstate.';
import { PROPERTY_STATE } from './propertystate';
import { PropertyOptions } from './propertyoptions';
import { getComponentProperties } from './componentproperties';
import { getClassPropertyWatcher } from './classpropertywatcher';
import { getClassPropertyInterceptor } from './classpropertyinterceptors';

import { TemplateResult } from 'lit-html';
import { render, html } from 'lit-html/lib/shady-render';

let componentsToRender: Array<CustomElement> = [];
let currentAnimationFrame: number | null = null;

/**
 * interface for an indexable element
 */
export interface IndexableElement {
  [index: string]: any; // tslint:disable-line
}

/**
 * define the render strategy for the control
 */
export const enum RENDER_STRATEGY {
  DEFAULT,
  LAZY,
  PIPELINE_EXPERIMENTAL,
}

// TODO: add frame budget and delay multiple renders to later frames :)
function addComponentToRenderPipeline(component: CustomElement) {
  componentsToRender.push(component);
  if (currentAnimationFrame === null) {
    currentAnimationFrame = window.requestAnimationFrame(() => {
      // var now = performance.now();
      componentsToRender.forEach((value) => {
        value.renderComponent();
        value['_renderScheduled'] = false; // tslint:disable-line
      });
      componentsToRender = [];
      currentAnimationFrame = null;
      // console.log(`rendered ${componentsToRender.length} components in ${performance.now()-now} ms`);
    });
  }
}

/**
 * Base class for all custom elements
 */
export abstract class CustomElement extends HTMLElement {

  /* tslint:disable-next-line */
  static _fromAttribute(this: typeof CustomElement, name: string, oldValue: any, newValue: any, instance: CustomElement) {
    if (instance._propertyState !== PROPERTY_STATE.REFLECTING) {
      const propertyName = kebapToCamelCase(name);
      const classProperty: PropertyOptions = getClassProperties(this).get(propertyName);

      oldValue = (<IndexableElement>instance)[propertyName];
      newValue = deserializeValue(newValue, classProperty.type); // tslint:disable-line:no-unsafe-any
      if (oldValue !== newValue) {
        instance._propertyState = PROPERTY_STATE.UPDATE_FROM_ATTRIBUTE;
        this._fromProperty(propertyName, oldValue, newValue, instance);
      }

    }
  }

  /* tslint:disable-next-line */
  static _fromProperty(this: typeof CustomElement, propertyKey: string, oldValue: any, newValue: any, instance: CustomElement) {
    if (oldValue !== newValue) {
      const classProperty: PropertyOptions = getClassProperties(this).get(propertyKey);

      const interceptor = getClassPropertyInterceptor(this, propertyKey);
      newValue = interceptor.reduce((value, func) => {
        return func.apply(instance, [oldValue, value]) || value;
      }, newValue);

      this._reflectAttributes(classProperty, instance, newValue, propertyKey);

      instance._propertyState = PROPERTY_STATE.UPDATE_PROPERTY;
      (<IndexableElement>instance)[propertyKey] = newValue;
      instance._propertyState = PROPERTY_STATE.DIRTY;

      const watcher = getClassPropertyWatcher(this, propertyKey);
      watcher.forEach((value) => value.apply(instance, [oldValue, newValue])); // tslint:disable-line:no-unsafe-any

      instance.scheduleRender();
    }
  }

  /* tslint:disable-next-line */
  private static _reflectAttributes(classProperty: PropertyOptions, instance: CustomElement, newValue: any, propertyKey: string) {
    if ((classProperty.reflectAsAttribute || classProperty.reflectAsAttribute === undefined) && instance._componentState !== COMPONENT_STATE.INIT) {
      if (classProperty.type === Boolean || classProperty.type === String || classProperty.type === Number || classProperty.reflectAsAttribute === true) {
        if (instance._propertyState !== PROPERTY_STATE.UPDATE_FROM_ATTRIBUTE) {
          instance._propertyState = PROPERTY_STATE.REFLECTING;
          if (newValue === false || newValue === null || newValue === undefined) {
            instance.removeAttribute(camelToKebapCase(propertyKey));
          } else {
            instance.setAttribute(camelToKebapCase(propertyKey), serializeValue(newValue, classProperty.type));
          }
        }
      }
    }
  }

  static get observedAttributes(this: typeof CustomElement): Array<string> { // filter out states -> type === undefined
    return Array.from(getClassProperties(this)).filter((value) => value[1].type !== undefined).map((value) => camelToKebapCase(value[0].toString()));
  }

  protected _renderStrategy: RENDER_STRATEGY = RENDER_STRATEGY.DEFAULT;
  protected _renderCallbackResolver: () => void = null;

  protected _componentState: COMPONENT_STATE = COMPONENT_STATE.INIT;
  protected _propertyState: PROPERTY_STATE = PROPERTY_STATE.DIRTY;

  protected _renderScheduled: boolean = false;
  protected _templateCache: TemplateStringsArray = null;
  protected _firstRender: boolean = true;

  private _renderCompletedCallbacks: Array<() => void> = [];
  private _constructedCompletedCallbacks: Array<() => void> = [];

  constructor() {
    super();
    Promise.resolve().then(() => {
      if (this._componentState === COMPONENT_STATE.INIT) {
        this._componentState = COMPONENT_STATE.CONSTRUCTED;
        this._constructedCompletedCallbacks.forEach((value) => value());
        this._constructedCompletedCallbacks = [];
      }
    });
  }

  /**
   * should return the DOM to be rendered
   */
  abstract render(): TemplateResult;

  /**
   * is called when the element is attached to the DOM
   */
  componentConnected() { } // tslint:disable-line

  /**
   * is called when the element is dettached from the DOM
   */
  componentDisconnected() { } // tslint:disable-line

  /** 
   * is called just before render() will be exexuted 
   */
  componentWillRender() { } // tslint:disable-line

  /** 
   * is called just after render() will be exexuted 
   */
  componentDidRender() { } // tslint:disable-line

  /** 
   * is called just after the first render()
   */
  componentFirstRender() { } // tslint:disable-line

  /**
   * return element whre the DOM from render will be rendered to
   */
  renderToElement(): Element | ShadowRoot {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    return this.shadowRoot;
  }

  /**
   * return a Promise which will be resolved after
   * construction of the element
   * 
   * @returns Promise<void> promise which will resolve after construction is complete
   */
  async waitForConstruction(): Promise<{}> {
    return new Promise((resolve) => {
      this._constructedCompletedCallbacks.push(resolve);
    });
  }

  /**
   * return a Promise which will be resolved after a
   * successfull render
   * 
   * @returns Promise<void>
   */
  async waitForRender(): Promise<{}> {
    return new Promise((resolve) => {
      this._renderCompletedCallbacks.push(resolve);
    });
  }

  /**
   * Schedule a new render (the render will only be scheduled) if
   * the componentstate is CONNECTED and propertystate is DIRTY
   * 
   * force will force a re-render
   * 
   * @param force force the re-render
   */
  scheduleRender(force: boolean = false) {
    if (((this._componentState === COMPONENT_STATE.CONNECTED &&
      this._propertyState === PROPERTY_STATE.DIRTY)) &&
      !this._renderScheduled) {
      this._renderScheduled = true;
      switch (this._renderStrategy) {
        case RENDER_STRATEGY.PIPELINE_EXPERIMENTAL:
          addComponentToRenderPipeline(this);
          break;
        case RENDER_STRATEGY.LAZY:
          if (!force) {
            new Promise((resolve) => {
              setTimeout(resolve);
              this._renderCallbackResolver = resolve;
            }).then(() => {
              this.renderComponent();
              this._renderCallbackResolver = null;
            });
            break;
          }
        default:
          Promise.resolve().then(() => {
            this.renderComponent();
          });
          break;
      }
    } else if (force) {
      if (this._renderScheduled) {
        if (this._renderCallbackResolver) {
          Promise.resolve().then(() => {
            this._renderCallbackResolver();
          });
          return;
        } else if (this._renderStrategy === RENDER_STRATEGY.PIPELINE_EXPERIMENTAL) {
          componentsToRender.splice(componentsToRender.indexOf(this), 1);
        } else {
          return; // render already scheduled as microtask
        }
      }
      Promise.resolve().then(() => {
        this.renderComponent();
      });
    }
  }

  /**
   * render the component to the DOM
   * you should never call this function directly, use scheduleRender(force)
   */
  renderComponent() {
    this.componentWillRender();
    this._renderScheduled = false;
    if (this._templateCache === null) {
      const style = getComponentProperties(this.constructor as typeof CustomElement)!.style || '';
      this._templateCache = makeTemplateString([`<style>${style ? style : ''}</style>`, ''], [`<style>${style ? style : ''}</style>`, '']);
    }
    render(html(this._templateCache,
      this.render()),
      this.renderToElement(),
      { scopeName: getComponentProperties(this.constructor as typeof CustomElement)!.tag, eventContext: this });
    this.componentDidRender();
    if (this._firstRender) {
      this.componentFirstRender();
      this._firstRender = false;
    }
    this._propertyState = PROPERTY_STATE.UPDATED;
    this._renderCompletedCallbacks.forEach((value) => value());
    this._renderCompletedCallbacks = [];
  }

  /**
   * build-in function please do not override
   */
  connectedCallback() {
    if (this._componentState === COMPONENT_STATE.INIT || this._componentState === COMPONENT_STATE.CONSTRUCTED) { // on first connected reflect attributes
      this._componentState = COMPONENT_STATE.CONNECTED;
      const _originalPropertyState = this._propertyState;
      this._propertyState = PROPERTY_STATE.REFLECTING;
      const properties = getClassProperties(this.constructor as typeof CustomElement);
      properties.forEach((value, key) => {
        const propValue = (<IndexableElement>this)[key.toString()];
        if (propValue || propValue === 0) {
          (this.constructor as typeof CustomElement)._reflectAttributes(value, this, propValue, key.toString());
        }
      });
      this._propertyState = _originalPropertyState;
    } else {
      this._componentState = COMPONENT_STATE.CONNECTED;
    }
    this.componentConnected();
    this.scheduleRender();
  }

  /**
   * build-in function please do not override
   */
  disconnectedCallback() {
    this._componentState = COMPONENT_STATE.DISCONNECTED;
    this.componentDisconnected();
  }

  /**
   * build-in function please do not override
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      (this.constructor as typeof CustomElement)._fromAttribute(name, oldValue, newValue, this);
    }
  }

}

/**
 * shorthand for lazy rendered custom element
 */
export abstract class LazyCustomElement extends CustomElement {
  constructor() {
    super();
    this._renderStrategy = RENDER_STRATEGY.LAZY;
  }
}
