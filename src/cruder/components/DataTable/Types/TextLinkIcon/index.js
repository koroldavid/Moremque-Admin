import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import Text                     from '../Text/index.js';
import LinkIcon                 from '../LinkIcon/index.js';

export default class TextLinkIconType extends PureComponent {
    static propTypes = {
        item   : PropTypes.object,
        schema : PropTypes.object
    }

    render() {
        const { schema, item } = this.props;

        if (!item[schema.name]) return '—';

        return (
            <div className='CRUDER_TextLinkIcon'>
                <Text schema={schema} item={item} />
                <LinkIcon schema={schema} item={item} />
            </div>
        );
    }
}
