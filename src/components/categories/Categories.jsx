import React, {memo} from 'react';

import {html} from '../../helpers';

import './Categories.scss';

const bem = html.bem('Categories');

const Categories = ({categories = []}) => (
    <ul className={bem.block()}>
        {categories.map(category => (
            <li
                className={bem.element('item')}
                key={category.id}
            >
                {category.label}
            </li>
        ))}
    </ul>
);

export default memo(Categories);
