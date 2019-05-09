import test from 'ava';
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
                {[1, 2, 3, 4]}
            </div>
        );
    }
}


test('class component render', t => {
    const list = [1, 2, 3];
    t.is(
        renderToStaticFaster(() => <ClassComponent list={list}/>),
        renderToStaticMarkup(<ClassComponent list={list}/>)
    )
});