import test from 'ava';
import React from 'react';

import renderToStaticFaster from '../src';
import { renderToStaticMarkup } from 'react-dom/server';

function Panel () {
    return (<p>this is panel</p>);
}

function FunctionComponent (props) {
    const { list } = props;
    return (
        <div className='container'>
            <Panel />
            <ul className='function-list'>
                {list.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    );
}


test('function component render', t => {
    const list = [1, 2, 3];
    t.is(
        renderToStaticFaster(() => <FunctionComponent list={list}/>),
        renderToStaticMarkup(<FunctionComponent list={list}/>)
    )
});