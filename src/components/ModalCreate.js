import React, { PureComponent }                             from 'react';
import PropTypes                                            from 'prop-types';
import { Modal, Form, Button, message, notification }       from 'antd';
import dotProp                                              from 'dot-prop';
import ItemLabel                                            from './ItemLabel';

const INITIAL_STATE = {
    isOpen    : false,
    isLoading : false,
    data      : {},
    error     : {}
};

export default class ModalCreate extends PureComponent {
    static propTypes = {
        schema : PropTypes.object
    }

    state = INITIAL_STATE

    handleOpen = () => {
        this.setState({ isOpen: true });
        setTimeout(() => {
            const { fields } = this.props.schema;

            this[fields[0].name].setFocus();
        }, 300);
    };

    handleClose = () => {
        this.props.onInteract();
        this.setState({ ...INITIAL_STATE });
    };

    handleCreate = async e => {
        if (e) e.preventDefault();

        const { isLoading }                 = this.state;
        const { apiAdapter }                = this.props;
        const { fields, labels }            = this.props.schema;

        if (isLoading) return;

        this.setState({ isLoading: true });

        try {
            const data = {};

            fields
                .filter(field => this[field.name])
                .forEach(field => data[field.name] = this[field.name].getValue());

            await apiAdapter.create({ item: data });


            message.success(labels.successMessage);

            this.handleClose();
        } catch (error) {
            if (error.type === 'validation') {
                if (error && error.fields) this.setState({ error: error.fields || {}, isLoading: false });
                else this.setState({ error: { message: error.message }, isLoading: false });
            } else {
                notification.error({
                    message     : labels.errorMessage,
                    description : error.message
                });
                this.setState({ isLoading: false });
            }
        }
    }

    handleWidgetChange = async (name, value) => {
        const { fields, autofill } = this.props.schema;
        const data = {};

        fields
            .filter(field => this[field.name])
            .forEach(field => data[field.name] = this[field.name].getValue());

        this.setState({ data });

        if (autofill && name === autofill.name && value) {
            await this.fillValues(value);
        }
    }

    fillValues = async value => {
        const { fields, autofill } = this.props.schema;

        this.setState({ isLoading: true });

        const autofillFields = fields.filter(field => dotProp.get(field, 'componentOptions.autofill'));

        const query = { [autofill.name]: value };
        const response = await autofill.fetcher(query);

        for (const field of autofillFields) {
            this[field.name].setValue(response[field.name]);
        }

        this.setState({ isLoading: false });
    }

    renderFooter = () => {
        const { isLoading } = this.state;
        const { labels }    = this.props.schema;

        return [
            <Button
                key     = 'cancel'
                onClick = {this.handleClose}
            >
                {labels.cancelButton}
            </Button>,
            <Button
                key      = 'submit'
                type     = 'primary'
                htmlType = 'submit'
                loading  = {isLoading}
                onClick  = {this.handleCreate}
            >
                {labels.submitButton}
            </Button>
        ];
    }

    render() {
        const { children, schema }               = this.props;
        const { isOpen, data, error }            = this.state;
        const { labels, fields, width, trigger } = schema;

        return (
            <div className='CRUDER_CreateModal'>
                <Button onClick={this.handleOpen} icon={trigger.icon} type={trigger.type}>
                    {trigger.label}
                </Button>
                <Modal
                    title        = {labels.title}
                    visible      = {isOpen}
                    onCancel     = {this.handleClose}
                    closable     = {false}
                    maskClosable = {false}
                    footer       = {this.renderFooter()}
                    width        = {width}
                    destroyOnClose
                >
                    <form onSubmit={this.handleCreate}>
                        {
                            fields.map(field => {
                                const { name, label, visible, component: Component } = field;
                                const required = dotProp.get(field, 'componentOptions.required');

                                if (visible && !visible(data)) return null;


                                const title = typeof label === 'function'
                                    ? label(data)
                                    : label;

                                const isRequired = typeof required === 'function'
                                    ? required(data)
                                    : required;

                                return (
                                    <ItemLabel label={title} key={name} required={isRequired}>
                                        <Component
                                            validated
                                            ref       = {ref => this[field.name] = ref}
                                            error     = {error[field.name]}
                                            schema    = {field}
                                            data      = {data}
                                            onChange  = {this.handleWidgetChange}
                                        />
                                    </ItemLabel>
                                );
                            })
                        }
                        <input type='submit' tabIndex='-1' hidden />
                        <Form.Item
                            validateStatus = {error.message ? 'error' : undefined}
                            help           = {error.message}
                            style          = {{ marginTop: 'auto', alignSelf: 'flex-start' }}
                        />
                    </form>
                </Modal>
            </div>
        );
    }
}