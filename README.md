# CE-DECORATORS
ce-decorators is a typescript library for custom element development. It's powered by the great [lit-html](https://polymer.github.io/lit-html/guide/writing-templates.html) for effective DOM updates. The decorator API is similar to stenciljs but without the need of a special compiler, just the ts-compiler is needed.

I just created the small ibrary for my own needs but I'd like to invite everyone to use it if it suits.
The decorators are compatible with IE11 (needs babel transpile), Chrome, FF, Edge, Safari and the mobile Safari and Chrome Browser.

For IE11, Firefox, Safari Browsers you need the `@webcomponents/webcomponentjs` polyfill (for ShadowDOM and ShadyCSS), if you taget ES5 you also need either babel or the `custom-elements-es5-adapter.js` from the webcomponentjs project. If you target IE11 you also need `core-js` for the `Map` and `WeakMap` polyfill. Unfortunatelly, lit-html is ES6 so you need @babel/preset-env to compile it down to ES5.

The decorators will take care of style registering if the ShadyCSS scoping shim is needed, attribute-property reflection with type transformation from attribute to property and vice versa and there is a small cheap "dependecy injection" functionality built in via the @Inject decorator. All in just 10kb (22kb with lit-html bundled)

# But why???
I'm lazy and I don't like to write much boilerplate code, furthermore you have intellisense since all properties are named and have type.

# Install/Compability
`npm install ce-decorators`
important! you need the following compiler settings in your tsconfig.json
```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true
```
after that you can import the decorators
```javascript
import { Component, Prop ..} from 'ce-decorators'
```
If you want to target ES5 Browser you have to let babel do the heavy lifting.

## with babel
for babel you need the following dependencies (at the moment only stage-0 proposal decorators are supported)
```json
"@babel/plugin-proposal-class-properties": "^7.0.0",
"@babel/plugin-proposal-decorators": "^7.0.0",
"@babel/preset-env": "^7.0.0",
"@babel/preset-typescript": "^7.0.0", (optional only when using typescript)
```

in the babel config you just have to enable the two plugins:
```javascript
plugins: [
  ["@babel/plugin-proposal-decorators", { legacy: true/false}],
  ["@babel/plugin-proposal-class-properties", { "loose" : true }]
]
```

Both decorator specification (Stage-0 and Stage-2 are supported)

If you use the decorators with babel you have to specify the typ for Prop and Inject otherwise it won't work 🙁

# Sample
```typescript
import { Component, CutomElement, Prop, Watch Event, EventEmitter, State } from 'ce-decorators'
import { html } from 'lit-html'

@Component({
    tag: 'my-custom-element'
    style: `
    :host {
        background-color : #f0f;
    }
    `
})
export class MyCustomElement extends CustomElement {

  @Prop()
  propertyOne: string = "default value"; // register a property propertyOne with a reflection to attribute property-one

  @Event()
  change: EventEmitter<string>; // will trigger a custom event with name "change" (name can be overriden by decorator argument)

  @State()
  private myState:boolean = false; // only visible to the instance, will not reflect but trigger a re-render

  @Watch('propertyOne') // watches for changes in propertyOne (changes withing this method to properties will not be reflected, please use intercept)
  propertyOneChanged(oldValue:string, newValue:string) {
    console.log('propertyOne Changed');
  }

  @Interceptor('propertyOne') // watches for changes of propertyOne and change the value, the changed value will be reflected
  propertyOneInterceptor(oldValue:string, newValue:string) {
      return newValue + "test";
  }

  @Inject() // will inject a object from type MyService
  myService: MyService;

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
* constructor
* resolve promise returned by waitForConstruction() on custom element (awaitable)
* \<append to dom\>
* componentConnected()
* \<if property changed or first connect (deffered in microtask)\>
* componentWillRender() property changes within this function will be taken into account in the rendering step
* render() 
* componentDidRender()
* resolve promise returned by waitForRender() on custom element (awaitable)
* \<if property or attribute changed (deffered in microtask)\>
* render() deffered in microtask
* \<remove/detach from dom\>
* componentDisconnected()

```typescript
const element = new MyCustomElement();
await element.waitForForConstruction();

element.propertyOne = 'test'; // will be reflected as property-one attribute
document.querySelector('body').appenChild(element);
    // element.componentConnected() called
await element.waitForRender();
    // element.componentWilRender() called
    // element.render() called
    // element.componentDidRender() called
document.querySelector('body').removeChild(element);
    // element.componentDisconnected() called
```

because render calls are deffered in a microtask setting multiple attributes/properties within one task will result in just one render.

## Property udpates
* set property myProperty
* if reflectToAttribute set property my-property and call attributeChangedCallback
* notify watchers
* deffer render() to microtask (so if multiple attributes/properties are set in the same task, render is only called once)

# Usage with Angular
For angular you need to activate the `CUSTOM_ELEMENTS_SCHEMA` after that custom elements can be used like angfular components

in the component
```javascript
import './my-custom-element'
```
in the template
```html
<my-custom-element [propertyOne]="this.propertyOne" attribute-one="this.attributeOne" (change)="$evt => handleEvent($evt)">
</my-custom-element>
```
# Usage with react
In react you need to pass everything as attributes
```jsx
import 'my-custom-element';

render(<my-custom-element property-one="{propertyOne}"></my-custom-element>)
```
