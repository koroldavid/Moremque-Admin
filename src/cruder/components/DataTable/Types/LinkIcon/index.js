import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import LinkIcon                 from '../../../LinkIcon/index.js';

export default class LinkIconType extends PureComponent {
    static propTypes = {
        item   : PropTypes.object,
        schema : PropTypes.object
    }

    render() {
        const { schema, item } = this.props;

        const { urlFormatter, iconType } = schema.componentOptions;

        if (!urlFormatter) return '—';

        return <LinkIcon type={iconType} url={urlFormatter(item)} />;
    }
}
