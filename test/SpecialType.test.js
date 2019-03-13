import test from 'ava';
import React from 'react';

import renderToStaticFaster from '../src';
import { renderToStaticMarkup } from 'react-dom/server';

function Component () {
    return (
        <div>
            <p
                className="container"
                dangerouslySetInnerHTML={{__html: '<div className="son-div">this is dangerous div</div>'}}
            >
            </p>
            {}
            {0}
            &lt;&gt;&'"
            {'string'}
            {null}
            {undefined}
            {true}
            {() => {}}
            {NaN}
            {Symbol('test')}
            <React.Fragment>
                <div>
                    this is React.Fragment
                    <React.Fragment>
                       123
                    </React.Fragment>
                </div>
            </React.Fragment>
            <h1>
                <div>this is h1</div>
            </h1>
            <br/>
            <input type='text' />
        </div>
    )
}

test('some special type render, like Symbol type, React.Fragment', t => {
    t.is(
        renderToStaticFaster(() => <Component />),
        renderToStaticMarkup(<Component />)
    )
});