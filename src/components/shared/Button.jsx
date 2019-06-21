import React from 'react';

import {html} from '../../helpers';

import './Button.scss';

const bem = html.bem('Button');

export default class Button extends React.PureComponent {

    render() {
        return (
            <button
                className={bem(bem.block({
                    action: this.props.action,
                }), this.props.className)}
                type={this.props.type || 'button'}
                onClick={() => this.props.onHangleClick()}
            >
                {this.props.label}
            </button>
        );
    }

}
