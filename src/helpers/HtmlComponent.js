// import _isString from 'lodash-es/isString';

export default class HtmlComponent {

    constructor() {
        this.namespace = '';
    }

    bem(blockName) {
        const bem = function () {
            return this.classNames(...arguments);
        }.bind(this);
        bem.block = modifiers => {
            return this._applyModifiers(blockName, modifiers);
        };
        bem.element = (elementName, modifiers) => {
            return this._applyModifiers(blockName + '__' + elementName, modifiers);
        };
        return bem;
    }

    classNames() {
        return Array.prototype.slice.call(arguments).filter(v => v).join(' ');
    }

    _applyModifiers(entity, modifiers) {
        let result = [];
        result.push(entity);

        if (typeof modifiers === 'string') {
            result.push(entity + (modifiers ? '_' + modifiers : ''));
        } else if (modifiers) {
            Object.keys(modifiers).forEach(key => {
                const value = modifiers[key];
                if (!value) {
                    // Skip
                }
                else if (value === true) {
                    result.push(entity + '_' + key);
                }
                else {
                    result.push(entity + '_' + key + '_' + value);
                }
            });
        }

        // Append namespace
        result = result.map(cl => this.namespace + cl);

        return result.join(' ');
    }

};
