import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import dotProp                  from 'dot-prop';
import { Input, Form }          from 'antd';

class InputType extends PureComponent {
    static propTypes = {
        schema    : PropTypes.object,
        error     : PropTypes.string,
        validated : PropTypes.bool,
        onChange  : PropTypes.func
    }

    handleChange = value => {
        const { schema, onChange } = this.props;

        if (onChange) onChange(schema.name, value);
    }

    getValue = () => dotProp.get(this.input, 'input.value');

    setValue = value => dotProp.set(this.input, 'input.value', value || '');

    setFocus = () => this.input.focus();

    renderInput = () => {
        const { schema } = this.props;

        const placeholder = dotProp.get(schema, 'componentOptions.labels.placeholder');
        const type        = dotProp.get(schema, 'componentOptions.type');

        return (
            <Input
                ref         = {ref => this.input = ref}
                type        = {type}
                placeholder = {placeholder}
                onChange    = {this.handleChange}
            />
        );
    }

    render() {
        const { validated, error } = this.props;

        if (validated) {
            return (
                <Form.Item
                    className      = {`CRUDER_FormInput ${error ? 'CRUDER_FormInput--error' : ''}`}
                    validateStatus = {error ? 'error' : undefined}
                    help           = {error}
                >
                    {this.renderInput()}
                </Form.Item>
            );
        }

        return this.renderInput();
    }
}

export default InputType;
