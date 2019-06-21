import React from 'react';

import {html} from '../../helpers';

import './Counter.scss';

const bem = html.bem('Counter');

export default class Counter extends React.PureComponent {

    constructor() {
        super(...arguments);

        this.state = {
            count: 1,
        };
    }

    render() {
        return (
            <div className={bem.block()}>
                <span className={bem.element('title')}>
                    Quantity
                </span>
                <div className={bem.element('counter')}>
                    <div
                        className={bem.element('action', 'minus')}
                        onClick={() => this.onActionClick(false)}
                    >
                        —
                    </div>
                    <div className={bem.element('count')}>
                        {this.state.count}
                    </div>
                    <div
                        className={bem.element('action', 'plus')}
                        onClick={() => this.onActionClick(true)}
                    >
                        +
                    </div>
                </div>
            </div>
        );
    }

    onActionClick(isPlus) {
        const count = this.state.count;

        this.setState({
            count: isPlus
                ? count + 1
                : count > 1 ? count - 1 : count,
        });
    }
}
