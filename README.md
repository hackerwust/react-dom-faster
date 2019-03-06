# react-dom-faster

### **Render React Component to HTML, without VDOM**
alternative reactDomServer.renderToStaticMarkup, the spend time just 1/5 of renderToStaticMarkup

## Installation
Via npm:

`npm install --save react-dom-faster`

---

## Usage
```js
import React from 'react';
import { render } from 'react-dom-faster';

class Hello extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        const { list } = this.props;
        return (
            <ul>
                {list.map(item => <li>{item}</li>)}
            </ul>
        )
    }
}
render(() => <Hello list={[1, 2, 3]}>);
```
The above outputs the following HTML:
```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```
