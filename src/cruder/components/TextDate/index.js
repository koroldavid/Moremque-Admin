import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import moment                   from 'moment';

export default class TextDate extends PureComponent {
    static propTypes = {
        dateFormat : PropTypes.string.isRequired,
        tipFormat  : PropTypes.string.isRequired,
        value      : PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    };

    render() {
        const { value, dateFormat, tipFormat } = this.props;

        const text = value && moment(value).isValid()
            ? moment(value).format(dateFormat)
            : '—';

        return (
            <div
                className = 'CRUDER_TextDate'
                title     = {moment(value).format(tipFormat)}
            >
                {text}
            </div>
        );
    }
}
