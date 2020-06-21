import React, { PureComponent }         from 'react';
import PropTypes                        from 'prop-types';
import { Modal, message, notification } from 'antd';

class ConfirmModal extends PureComponent {
    static propTypes = {
        itemData    : PropTypes.object,
        confirmData : PropTypes.object,
        onClose     : PropTypes.func
    }

    state = {
        isOpen    : true,
        isLoading : false
    };

    componentWillMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.keyCode !== 13) return;

        const { isLoading } = this.state;

        if (!isLoading) this.handleSubmit();
    }

    handleOpen = () => this.setState({ isOpen: true });

    handleClose = () => {
        const { onClose } = this.props;

        this.setState({ isOpen: false });
        setTimeout(() => onClose(), 300);
    }

    handleSubmit = async () => {
        const { itemData, confirmData, onClose }   = this.props;
        const { handler, confirmationModalLabels } = confirmData;

        this.setState({ isLoading: true });

        try {
            await handler(itemData);
            this.setState({ isOpen: false });
            setTimeout(() => {
                message.success(confirmationModalLabels.successMessage);
                onClose(true);
            }, 300);
        } catch (error) {
            notification.error({
                message     : confirmationModalLabels.errorMessage,
                description : error.message
            });
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { isOpen, isLoading } = this.state;
        const { itemData, confirmData } = this.props;
        const { title, text, submitButton, cancelButton } = confirmData.confirmationModalLabels;

        const interpolatedText = typeof text === 'function' ? text(itemData) : text;

        return (
            <Modal
                title          = {title}
                visible        = {isOpen}
                onCancel       = {this.handleClose}
                closable       = {false}
                maskClosable   = {false}
                onOk           = {this.handleSubmit}
                okText         = {submitButton}
                cancelText     = {cancelButton}
                confirmLoading = {isLoading}
                destroyOnClose
            >
                {interpolatedText}
            </Modal>
        );
    }
}

export default ConfirmModal;
