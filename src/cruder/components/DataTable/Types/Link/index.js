import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import Link                     from '../../../Link/index.js';

export default class LinkType extends PureComponent {
    static propTypes = {
        item   : PropTypes.object,
        schema : PropTypes.object
    }

    render() {
        const { schema, item } = this.props;
        const { urlFormatter, html } = schema.componentOptions;

        if (!item[schema.name] || !urlFormatter) return '—';

        return <Link value={item[schema.name]} url={urlFormatter(item)} html={html} />;
    }
}
