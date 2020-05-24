import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import SelectRow                from '../../../SelectRow/index.js';

export default class SelectRowType extends PureComponent {
    static propTypes = {
        item   : PropTypes.object,
        schema : PropTypes.object
    }

    static columnClass = 'SelectRow'

    render() {
        const { schema, item } = this.props;

        const { urlFormatter, icon } = schema.componentOptions;

        if (!urlFormatter) return '—';

        return (
            <SelectRow icon={icon} url={urlFormatter(item)} />
        );
    }
}
