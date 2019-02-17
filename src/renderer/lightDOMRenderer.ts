import { CustomElement } from '../customelement';
import { getComponentProperties } from '../componentproperties';
import { makeTemplateString } from '../utils';
import { render } from '../lit-html';

/**
 * Renders the subtree to a lightdom element
 * @param this 
 * @param elementToRender 
 */
export function renderToLightDOM(this: CustomElement, elementToRender: HTMLElement) {
  if (this._templateCache === null) {
    const { cssStyles, tag, styleSheetAdopted, templateCache } = getComponentProperties(this.constructor as typeof CustomElement);
    if (!styleSheetAdopted) {
      const styleSheet = document.createElement('style');
      const styleString = cssStyles.map((value) => value.cssText).reduce((prevValue, currentValue) => prevValue + currentValue);
      styleSheet.textContent = styleString.replace(/((:host\(([^\(]*)\))|(:host))/g, (_token, ...args) => {
        return `${tag}${args[2] ? args[2] : ''}`;
      });
      document.querySelector('head').appendChild(styleSheet);
    }
    this._templateCache = templateCache || makeTemplateString(['', ''], ['', '']);
    getComponentProperties(this.constructor as typeof CustomElement).templateCache = this._templateCache;
  }
  render(this.render(), elementToRender, { eventContext: this });
}
