import React, { PureComponent }             from 'react';
import PropTypes                            from 'prop-types';
import dotProp                              from 'dot-prop';
import { Select, Form, Spin, notification } from 'antd';

class SelectType extends PureComponent {
    static propTypes = {
        schema    : PropTypes.object,
        error     : PropTypes.string,
        validated : PropTypes.bool,
        onChange  : PropTypes.func
    }

    state = {
        value     : undefined,
        options   : dotProp.get(this.props.schema, 'componentOptions.options', []),
        isLoading : false
    }

    handleFetch = async () => {
        const { schema }          = this.props;
        const { options }         = this.state;

        const fetcher      = dotProp.get(schema, 'componentOptions.fetcher');
        const errorMessage = dotProp.get(schema, 'componentOptions.fetcher');

        if (!fetcher || options.length) return;

        this.setState({ isLoading: true });

        try {
            const data = await fetcher();

            this.setState({
                isLoading : false,
                options   : data
            });
        } catch (error) {
            notification.error({
                message     : errorMessage,
                description : error.message
            });
            this.setState({ isLoading: false });
        }
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

    getValue = () => {
        return this.state.value;
    };

    setValue = async value => {
        const { options } = this.state;

        this.setState({ value });

        if (!options.length && value) await this.handleFetch();
    }

    setFocus = () => {
        this.select.focus();
    }

    renderSelect = () => {
        const { schema }                    = this.props;
        const { isLoading, options, value } = this.state;

        const showSearch  = dotProp.get(schema, 'componentOptions.showSearch');
        const multiple    = dotProp.get(schema, 'componentOptions.multiple');
        const placeholder = dotProp.get(schema, 'componentOptions.labels.placeholder');

        return (
            <Select
                ref               = {ref => this.select = ref}
                style             = {{ width: '100%' }}
                onFocus           = {this.handleFetch}
                showSearch        = {showSearch}
                value             = {isLoading ? undefined : value}
                notFoundContent   = {isLoading ? <Spin size = 'small' /> : null}
                optionFilterProp  = 'title'
                onChange          = {this.handleChange}
                getPopupContainer = {node => node}        //eslint-disable-line
                mode              = {multiple ? 'multiple' : 'default'}
                allowClear
                placeholder       = {placeholder}
            >
                {
                    options.map(option => {
                        return (
                            <Select.Option key={option.option} value={option.option} title={option.label}>
                                {option.label}
                            </Select.Option>
                        );
                    })
                }
            </Select>
        );
    }

    render() {
        const { validated, error } = this.props;

        if (validated) {
            return (
                <Form.Item
                    className      = {`CRUDER_FormSelect ${error ? 'CRUDER_FormSelect--error' : ''}`}
                    validateStatus = {error ? 'error' : undefined}
                    help           = {error}
                >
                    {this.renderSelect()}
                </Form.Item>
            );
        }

        return this.renderSelect();
    }
}

export default SelectType;
