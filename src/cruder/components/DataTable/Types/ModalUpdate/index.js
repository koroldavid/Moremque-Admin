import React, { PureComponent }                 from 'react';
import PropTypes                                from 'prop-types';
import { Modal, Button, message, notification } from 'antd';
import ItemLabel                                from '../../../ItemLabel/index.js';

const INITIAL_STATE = {
    isOpen    : true,
    isLoading : false,
    error     : {},
    localData : {}
};

class ModalUpdateType extends PureComponent {
    static propTypes = {
        item    : PropTypes.object,
        schema  : PropTypes.object,
        onClose : PropTypes.func
    }

    state = INITIAL_STATE

    componentDidMount() {
        this.handleOpen();
    }

    handleOpen = () => {
        setTimeout(() => {
            const { item, schema } = this.props;
            const { fields } = schema.componentOptions;

            fields.forEach(field => this[field.name].setValue(item[field.name]));

            this[fields[0].name].setFocus();
        }, 0);
    };

    handleClose = success => {
        this.setState({ isOpen: false });

        const result = success && typeof success === 'boolean';

        setTimeout(() => this.props.onClose(result), 300);
    };

    handleUpdate = async e => {
        if (e) e.preventDefault();

        const { isLoading }               = this.state;
        const { item, schema }            = this.props;
        const { fields, handler, labels } = schema.componentOptions;

        if (isLoading) return;

        this.setState({ isLoading: true });

        try {
            const data = { ...item };

            fields.forEach(field => data[field.name] = this[field.name].getValue());

            await handler({ item: data });

            message.success(labels.successMessage);

            this.handleClose(true);
        } catch (error) {
            if (error.type === 'validation') {
                this.setState({ error: error.fields || {}, isLoading: false });
            } else {
                notification.error({
                    message     : labels.errorMessage,
                    description : error.message,
                    duration    : 0
                });
                this.setState({ isLoading: false });
            }
        }
    }

    setLocalData = (obj) => {
        const name = Object.keys(obj)[0];

        this.state.localData[name] = obj[name];

        this.forceUpdate();
    }

    renderFooter = () => {
        const { isLoading } = this.state;
        const { labels }    = this.props.schema.componentOptions;

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
                onClick  = {this.handleUpdate}
            >
                {labels.submitButton}
            </Button>
        ];
    }

    render() {
        const { isOpen, error, localData } = this.state;
        const { item, schema }             = this.props;
        const { labels, fields, width }    = schema.componentOptions;

        return (
            <div className='CRUDER_UpdateModal'>
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
                    {   fields ?
                        <form onSubmit={this.handleUpdate}>
                            {
                                fields.map(field => {
                                    const { name, label, component: Component } = field;

                                    return (
                                        <ItemLabel label={label} key={name}>
                                            <Component
                                                validated
                                                ref          = {ref => this[field.name] = ref}
                                                error        = {error[field.name]}
                                                item         = {item[field.name]}
                                                schema       = {field}
                                                localData    = {localData}
                                                setLocalData = {this.setLocalData}
                                            />
                                        </ItemLabel>
                                    );
                                })
                            }
                            <input type='submit' tabIndex='-1' hidden />
                        </form> : null
                    }
                </Modal>
            </div>
        );
    }
}

export default ModalUpdateType;