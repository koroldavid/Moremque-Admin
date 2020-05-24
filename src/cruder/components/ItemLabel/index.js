import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';

export default class ItemLabel extends PureComponent {
    static propTypes = {
        label    : PropTypes.string,
        children : PropTypes.node,
        required : PropTypes.bool
    };

    static defaultProps = {
        required : false
    };

    render() {
        const { label, children, required } = this.props;

        return (
            <div className='CRUDER_ItemLabel'>
                <div className='CRUDER_label'>
                    {label} {required ? <span className='CRUDER_label--required'>*</span> : null}
                </div>
                {children}
            </div>
        );
    }
}
