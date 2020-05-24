import React, { PureComponent }  from 'react';
import PropTypes                 from 'prop-types';
import { message, notification } from 'antd';
import SwitcherYesNo             from '../../../SwitcherYesNo/index.js';

export default class SwitcherYesNoType extends PureComponent {
    static propTypes = {
        item       : PropTypes.object,
        schema     : PropTypes.object,
        onInteract : PropTypes.func
    }

    state = {
        isLoading : false
    }

    handleChange = async option => {
        const { onInteract, schema, item } = this.props;
        const { handler, labels }          = schema.componentOptions;

        this.setState({ isLoading: true });

        try {
            await handler({ value: option, item, schema  });
            message.success(labels.successMessage);
            onInteract({ value: option, item, schema, reload: true });
            this.setState({ isLoading: false });
        } catch (error) {
            notification.error({
                message     : labels.errorMessage,
                description : error.message
            });
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { schema, item } = this.props;
        const { options }      = schema.componentOptions;
        const { isLoading }    = this.state;

        return (
            <SwitcherYesNo
                options  = {options}
                active   = {item[schema.name]}
                disabled = {isLoading}
                onChange = {this.handleChange}
            />
        );
    }
}
