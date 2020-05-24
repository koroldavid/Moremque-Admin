import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { Form }                 from 'antd';
import dotProp                  from 'dot-prop';
import SwitcherYesNo            from '../../../SwitcherYesNo/index.js';

export default class SwitcherYesNoType extends PureComponent {
    static propTypes = {
        schema    : PropTypes.object,
        error     : PropTypes.string,
        validated : PropTypes.bool,
        onChange  : PropTypes.func
    }

    constructor(props) {
        super(props);

        const options = dotProp.get(props.schema, 'componentOptions.options');

        this.state = {
            value : options[1] ? options[1].option : undefined
        };
    }

    handleChange = value => {
        const { schema, onChange } = this.props;

        this.setState(
            { value },
            () => {
                if (onChange) onChange(schema.name, value);
            }
        );
    }

    getValue = () => this.state.value

    setValue = value => this.setState({ value })

    renderSwitcher = () => {
        const { schema } = this.props;
        const { value } = this.state;

        const options = dotProp.get(schema, 'componentOptions.options', []);

        return (
            <SwitcherYesNo
                options  = {options}
                active   = {value}
                onChange = {this.handleChange}
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
                    {this.renderSwitcher()}
                </Form.Item>
            );
        }

        return this.renderSwitcher();
    }
}
