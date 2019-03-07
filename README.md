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
import renderToStaticMarkup from 'react-dom-faster';

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
// 注意renderToStaticMarkup 里面需要传入函数，函数返回组件
renderToStaticMarkup(() => <Hello list={[1, 2, 3]} />);
```
The above outputs the following HTML:
```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```
