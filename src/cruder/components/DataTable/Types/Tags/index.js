import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import dotProp                  from 'dot-prop';
import Tags                     from '../../../Tags/index.js';

export default class TagsType extends PureComponent {
    static propTypes = {
        item   : PropTypes.object,
        schema : PropTypes.object
    }

    render() {
        const { schema, item } = this.props;

        const showDash = dotProp.get(schema, 'componentOptions.showDash', true);
        const list = item[schema.name];

        if (!(Array.isArray(list) && list.length)) return showDash ? '—' : '';

        return <Tags items={list} />;
    }
}
