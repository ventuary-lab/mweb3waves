import React from 'react';

import {html} from '../../helpers';

import './Input.scss';

const bem = html.bem('Input');

export default class Input extends React.PureComponent {

    render() {
        return (
            <div className={bem.block()}>
                {this.props.label && (
                    <label
                        htmlFor={this.props.name}
                        className={bem.element('label')}
                    >
                        {this.props.label}
                    </label>
                )}
                <input
                    placeholder={this.props.placeholder}
                    className={bem.element('input')}
                    type={this.props.type || 'text'}
                    id={this.props.name}
                />
            </div>
        );
    }

}
