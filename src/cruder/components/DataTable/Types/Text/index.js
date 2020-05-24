import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { get }                  from 'dot-prop';
import Text                     from '../../../Text/index.js';

export default class TextType extends PureComponent {
    static propTypes = {
        item   : PropTypes.object,
        schema : PropTypes.object
    }

    render() {
        const { schema, item } = this.props;

        const format = get(schema, 'componentOptions.format');

        const value = format ? format(item) : item[schema.name];

        if (!value) return '—';

        return <Text value={value} />;
    }
}
