import test from 'ava';
import React from 'react';

import renderToStaticFaster from '../src';
import { renderToStaticMarkup } from 'react-dom/server';

function SomeSpecialCase (props) {
    const { list } = props;
    return (
        <div>
            <ul className="container" data-list={`list-item-${list.length}`}>
                {list.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
            <p dangerouslySetInnerHTML={{__html: '<div className="coantiner-div">this is dangerous div</div>'}}></p>
            {/* comment */}
            {}
            {0}
            &lt;&gt;&'"
            {'string'}
            {null}
            {undefined}
            {true}
            {() => {}}
            {NaN}
            {Symbol('b')}
            <React.Fragment>
                <div>this is React.Fragment</div>
            </React.Fragment>
        </div>
    )
}

test('some special case render, like className, dangerousSetInnerHTML', t => {
    const list = [1, 2, 3];
    t.is(
        renderToStaticFaster(() => <SomeSpecialCase list={list}/>),
        renderToStaticMarkup(<SomeSpecialCase list={list}/>)
    )
});