# CE-DECORATORS
ce-decorators is a typescript library for custom element development. It is powered by [lit-html](https://polymer.github.io/lit-html/guide/writing-templates.html) for effective DOM updates. The decorator API is similar to stenciljs but without the need of a special compiler, just the ts-compiler is needed.

The decorators will take care of style registering if the ShadyCSS scoping shim is needed, attribute-property reflection with type transformation from attribute to property and vice versa. All in just 14kb (26kb with lit-html bundled).

## Custom elements
Custom elements are user defined HTML elements, which offer customized functionalities and styling. When used inide an HTML template it looks like this:
````html  
<custom-button primary>
 Click this Button
</custom-button>
````
In this example `custom-button` is the tag-name of the element, _primary_ is a specific attribute and _Click this button_ is a slot element passed in the element for further processing.


For detailed information about custom elements see
> https://developers.google.com/web/fundamentals/web-components/


## Compatibility
The library is compatible with IE11 (needs babel transpile), Chrome, FF, Edge, Safari and the mobile Safari and Chrome Browser.

For IE11 you need: `@webcomponents/webcomponentsjs` polyfills and Polyfills for `Symbol`, `Map`, `WeakMap` and Promises
For Edge you need: `@webcomponents/webcomponentsjs`
in FF, Safari and Chrome everything should just work.

If you compile all down to ES5 you need for all Brwosers the `custom-elements-es5-adapter.js`.



## Benefits
- No boilerplate code
- Code completion since all properties are named and have types

# Installation
`npm install ce-decorators`
important! you need the following compiler settings in your tsconfig.json
```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true
```

# Usage
```javascript
import { Component, Prop ..} from 'ce-decorators'
```

babel dependencies (for ES5):
```json
"@babel/plugin-proposal-class-properties": "^7.0.0",
"@babel/plugin-proposal-decorators": "^7.0.0",
"@babel/preset-env": "^7.0.0",
"@babel/preset-typescript": "^7.0.0", (optional only when using typescript)
```

babel config:
```javascript
plugins: [
  ["@babel/plugin-proposal-decorators", { legacy: true/false}],
  ["@babel/plugin-proposal-class-properties", { "loose" : true }]
]
```

Both decorator specification (Stage-0 and Stage-2 are supported).

If decorators are used with babel the data type for the Prop decorator has to be specified, otherwise attribute reflection won't work.

# Sample
```typescript
import { Component, CustomElement, Event, EventEmitter, Interceptor, Prop, State, Watch, html } from 'ce-decorators';

@Component({
  tag: 'my-custom-element',
  style: `
    :host {
        background-color : #f0f;
    }
    `,
})
export class MyCustomElement extends CustomElement {

  @Prop()
  propertyOne: string = 'default value'; // register a property propertyOne with a reflection to attribute property-one

  @Event()
  change: EventEmitter<string>; // will trigger a custom event with name "change" (name can be overriden by decorator argument)

  @State()
  private myState: boolean = false; // only visible to the instance, will not reflect but trigger a re-render

  @Watch('propertyOne') // watches for changes in propertyOne (changes to properties within this method will not be reflected, please use intercept for that case)
  propertyOneChanged(oldValue: string, newValue: string) {
    console.log('propertyOne Changed');
  }

  @Interceptor('propertyOne') // watches for changes of propertyOne and change the value, the changed value will be reflected and written
  propertyOneInterceptor(oldValue: string, newValue: string) {
    return newValue + 'test';
  }

  render() {
    return html`<div>${this.propertyOne}</div>`;
  }

  componentConnected() {
      console.log('element attached to the DOM');
  }

  componentDisconnected() {
      console.log('element dettached from the DOM');
  }

  componentWillRender() {
      console.log('render will be called')
  }

  componentDidRender() {
      console.log('render was called')
  }
}
```

# Lifecycle
## Construction/rendering
1. constructor call
1. resolve promise returned by waitForConstruction() on custom element (awaitable)
1. \<append to dom\>
1. componentConnected()
1. \<if a property changed or first connect deferred in microtask (in asnyc task if you use `LazyCustomElement`)\>
1. componentWillRender(): property changes within this function will be taken into account in the rendering step
1. render() 
1. componentDidRender(): can be used for post-processing runs in the same asnyctask/microtask as render
1. resolve promise returned by waitForRender() on custom element (awaitable)
1. \<if property or attribute changed (deferred in microtask)\>
1. render() deferred in microtask or in asnyc task if you use `LazyCustomElement`
1. \<remove/detach from dom\>
1. componentDisconnected()

## In code
```typescript
const element = new MyCustomElement();
await element.waitForForConstruction();

element.propertyOne = 'test'; // will be reflected as property-one attribute
document.querySelector('body').appenChild(element);
    // element.componentConnected() called
await element.waitForRender();
    // element.componentWillRender() called
    // element.render() called
    // element.componentFirstRender() called *only called on first render*
    // element.componentDidRender() called
document.querySelector('body').removeChild(element);
    // element.componentDisconnected() called
```

Because render calls are deferred into a microtask or async task, setting multiple attributes/properties consecutively will result in just one render call.

## Property updates
1. set property myProperty
1. run interceptors
1. if reflectToAttribute is set for _myProperty_ (or undefined, which is the default case), the property will be reflected as attribute _my-property_
1. notify watchers
1. deffer render() to microtask (so if multiple attributes/properties are set in the same task, render is only called once)

## LazyCustomElement
`LazyCustomElement` is an alternative to the default `CustomElement` which renders in an asnyc task (`setTimeout`) instead of a microtask .
# Usage

## Use with Angular
For angular `CUSTOM_ELEMENTS_SCHEMA` needs to be activated. Now custom elements can be used like angular components.

in the component:
```javascript
import './my-custom-element'
```
in the template:
```html
<my-custom-element [propertyOne]="this.propertyOne" attribute-one="this.attributeOne" (change)="$evt => handleEvent($evt)">
</my-custom-element>
```
## Use with react
In react you need to pass everything as attributes
```jsx
import 'my-custom-element';

render(<my-custom-element property-one="{propertyOne}"></my-custom-element>)
```
