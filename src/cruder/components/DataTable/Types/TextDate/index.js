import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import TextDate                 from '../../../TextDate/index.js';

export default class TextDateType extends PureComponent {
    static propTypes = {
        item   : PropTypes.object,
        schema : PropTypes.object
    }

    render() {
        const { schema, item }          = this.props;
        const { dateFormat, tipFormat } = schema.componentOptions;

        if (!item[schema.name]) return '—';

        return (
            <TextDate
                value={item[schema.name]}
                dateFormat={dateFormat}
                tipFormat={tipFormat}
            />
        );
    }
}
