import test from 'ava';
import React from 'react';

import renderToStaticFaster from '../src';
import { renderToStaticMarkup } from 'react-dom/server';
import { filterAttrs } from '../src/consts';
import makeMockProps from './util';

function Component (props) {
    const { list } = props;
    return (
        <ul>
            {list.map((item, index) => {
                delete item.children;
                delete item.dangerouslySetInnerHTML;
                return <li {...{
                    ...item,
                    key: index
                }}></li>
            })}
        </ul>
    );
}

const list = [
    makeMockProps(filterAttrs, '1234'),
    makeMockProps(filterAttrs, true),
    makeMockProps(filterAttrs, false),
    makeMockProps(filterAttrs, null),
    makeMockProps(filterAttrs, undefined)
];

test('filterAttrs render', t => {
    t.is(
        renderToStaticFaster(() => <Component list={list}/>),
        renderToStaticMarkup(<Component list={list}/>)
    )
});