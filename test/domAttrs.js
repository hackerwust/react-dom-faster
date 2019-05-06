import test from 'ava';
import React from 'react';

import renderToStaticFaster from '../src';
import { renderToStaticMarkup } from 'react-dom/server';
import { domAttrs } from '../src/consts';
import makeMockProps from './util';

function Component (props) {
    const { list } = props;
    return (
        <ul>
            {list.map((item, index) => {
                return <li {...{
                    ...item,
                    key: index
                }}></li>
            })}
        </ul>
    );
}

const realDomAttrs = {};
for (let key in domAttrs) {
    realDomAttrs[domAttrs[key]] = domAttrs[key];
}
const list = [
    makeMockProps(realDomAttrs, '1234'),
    makeMockProps(realDomAttrs, true),
    makeMockProps(realDomAttrs, false),
    makeMockProps(realDomAttrs, null),
    makeMockProps(realDomAttrs, undefined)
];

test('domAttrs render', t => {
    t.is(
        renderToStaticFaster(() => <Component list={list}/>),
        renderToStaticMarkup(<Component list={list}/>)
    );
});