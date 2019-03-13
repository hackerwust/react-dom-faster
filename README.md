# react-dom-faster

### **Render React Component to HTML, without VDOM**
alternative react-dom/server renderToStaticMarkup, but react-dom-faster is faster.
renderToStaticMarkup transform vdom to html, so spend much time.
react-dom-faster join the html of component without vdom, has high performance.

## react-dom-faster vs renderToStaticMarkup
Environment： node(v11.9.0) react-dom(v16.8.3)

| jsx div(个) |  react-dom-faster time | renderToStaticMarkup time |
| ------ | :------: | :------: |
| 100 | ≈1ms | ≈7ms |
| 500 | ≈2ms | ≈16ms |
| 5000 | ≈6ms | ≈53ms |

---

## Installation
Via npm:

`npm install --save react-dom-faster`

---

## Usage

#### Direct generate html from react component

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
        );
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
const html = (
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

