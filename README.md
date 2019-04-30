# react-dom-faster

### **Render React Component to HTML, without VDOM**
alternative react-dom/server renderToStaticMarkup, but react-dom-faster is faster.
renderToStaticMarkup transform vdom to html, so spend much time.
react-dom-faster join the html of component without vdom, has high performance.

### Difference With renderToStaticMarkup
react-dom-faster does not make additional conversions for html attribute.

for example: 
renderToStaticMarkup transform 
```
<div hidden="true" loop="true" capture="true" download="true"></div>
```
to `<div hidden="" loop="" capture="" download=""></div>`


react-dom-faster transform
```
<div hidden="true" loop="true" capture="true" download="true"></div>
```
to `<div hidden="true" loop="true" capture="true" download="true"></div>`

---

## react-dom-faster vs renderToStaticMarkup
Environment： node(v11.9.0) react-dom(v16.8.3)

| jsx div(个) |  react-dom-faster time | renderToStaticMarkup time |
| ------ | :------: | :------: |
| 100 | ≈1ms | ≈3ms |
| 500 | ≈1.5ms | ≈4ms |
| 1000 | ≈2ms | ≈7.5ms |
| 5000 | ≈10ms | ≈25ms |

---

## Installation
Via npm:

`npm install --save react-dom-faster`

---

## Usage

#### Direct generate html from react component

```js
import React from 'react';
import renderToHtml from 'react-dom-faster';

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
        );
    }
}
// 注意renderToStaticMarkup 里面需要传入函数，函数返回组件
renderToHtml(() => <Hello list={[1, 2, 3]} />);
```
The above outputs the following HTML:
```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```

#### Render jsx to html
```json
// babel config
{
    "plugins": [
        [
            "@babel/plugin-transform-react-jsx",
            {"pragma": "h"}
        ]
    ]
}
```
```js
import { h } from 'react-dom-faster';
const list = [1, 2, 3];
const { html } = (
    <ul className='container' data-name='ul'>
       {list.map(item => <li>{item}</li>)}
    </ul>
);

```
The above outputs the following HTML:
```html
<ul class="container" data-name="ul">
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```
