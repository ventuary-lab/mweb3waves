import React from 'react';

import * as Controls from './controls';

import Categories from '../../components/Categories';
import Coupon from '../coupon';
import Counter from '../shared/Counter';
import Button from '../shared/Button';

import {html} from '../../helpers';

import './Dialog.scss';

const bem = html.bem('Dialog');

const Dialog = ({coupon, onClose, onSubmit}) => (
    <div className={bem.block()}>
        <div className={bem.element('inner')}>
            <div className={bem.element('coupon')}>
                <Coupon {...coupon} />
            </div>
            <div className={bem.element('info')}>
                <div className={bem.element('logo')}>
                    <Controls.SmallLogo/>
                </div>
                <div className={bem.element('categories')}>
                    <Categories categories={coupon.categories}/>
                </div>
                {(coupon.email || coupon.webPageUrl) && (
                    <div className={bem.element('contacts')}>
                        {coupon.email && (
                            <div className={bem.element('contacts-inner')}>
                                {'E-mail: '}
                                <a
                                    className={bem.element('contacts-link')}
                                    href={`mailto:${coupon.email}`}
                                >
                                    {coupon.email}
                                </a>
                            </div>
                        )}
                        {coupon.webPageUrl && (
                            <div className={bem.element('contacts-inner')}>
                                {'Web page: '}
                                <a
                                    className={bem.element('contacts-link')}
                                    href={coupon.webPageUrl}
                                >
                                    {coupon.webPageUrl}
                                </a>
                            </div>
                        )}
                    </div>
                )}
                <div className={bem.element('quantity')}>
                    <Counter/>
                </div>
                <div className={bem.element('actions')}>
                    <Button
                        className={bem.element('action')}
                        label='Cancel'
                        action='cancel'
                        onHangleClick={onClose}
                    />
                    <Button
                        className={bem.element('action')}
                        label='Buy'
                        action='save'
                        onHangleClick={() => console.log('buy action')}
                    />
                </div>
            </div>
        </div>
        <a className={bem.element('read-more')} href="javascript:void(0)">Read more...</a>
    </div>
);

export default Dialog;
