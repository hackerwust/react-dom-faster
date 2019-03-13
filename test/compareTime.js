import React from 'react';

import renderToStaticFaster from '../src';
import { renderToStaticMarkup } from 'react-dom/server';

class Panel extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '面板'
        };
        this.show = false;
    }

    componentWillMount () {
        this.show = true;
    }

    render () {
        return (
            <div>
                <span>name:{this.state.name}</span>
                {this.show ? <span>show</span> : null}
            </div>
        );
    }
}

class ClassComponent extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        const { list } = this.props;
        return (
            <div className='container'>
                <Panel />
                <ul className='function-list'>
                    {list.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
        );
    }
}

const list = Array.from({length: 100}, (item, index) => index);

console.time('react-dom-faster render');
renderToStaticFaster(() => <ClassComponent list={list}/>);
console.timeEnd('react-dom-faster render');

console.time('renderToStaticMarkup render');
renderToStaticMarkup(<ClassComponent list={list}/>);
console.timeEnd('renderToStaticMarkup render');