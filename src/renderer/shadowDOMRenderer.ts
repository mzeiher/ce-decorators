import { CustomElement } from '../customelement';
import { getComponentProperties } from '../componentproperties';
import { makeTemplateString, needShadyDOM, supportsAdoptingStyleSheets } from '../utils';
import { render, shadyRender, html } from '../lit-html';

/**
 * render shadowroot of component
 * @param this 
 * @param elementToRender 
 */
export function renderToShadowDOM(this: CustomElement, elementToRender: ShadowRoot) {
  if (this._templateCache === null) {
    const { cssStyles, tag, styleSheetAdopted, templateCache } = getComponentProperties(this.constructor as typeof CustomElement);
    if (window.ShadyCSS && !window.ShadyCSS.nativeShadow) {
      if (!styleSheetAdopted) {
        window.ShadyCSS.ScopingShim.prepareAdoptedCssText(cssStyles.map((value) => value.cssText), tag);
        getComponentProperties(this.constructor as typeof CustomElement).styleSheetAdopted = true;
      }
      this._templateCache = templateCache || makeTemplateString(['', ''], ['', '']);
    } else if (supportsAdoptingStyleSheets) {
      this.shadowRoot.adoptedStyleSheets = <Array<CSSStyleSheet>>cssStyles;
      this._templateCache = templateCache || makeTemplateString(['', ''], ['', '']);
    } else {
      const styleString = cssStyles.map((value) => value.cssText).reduce((prevValue, currentValue) => prevValue + currentValue);
      this._templateCache = templateCache || makeTemplateString([`<style>${styleString}</style>`, ''], [`<style>${styleString}</style>`, '']);
    }
    getComponentProperties(this.constructor as typeof CustomElement).templateCache = this._templateCache;
  }
  if (needShadyDOM()) {
    shadyRender(html(this._templateCache,
      this.render()),
      elementToRender,
      { scopeName: getComponentProperties(this.constructor as typeof CustomElement)!.tag, eventContext: this });
  } else {
    render(html(this._templateCache, this.render()), elementToRender, { eventContext: this });
  }
}
