import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';

export default class LinkIcon extends PureComponent {
    static propTypes = {
        type : PropTypes.string,
        url  : PropTypes.string
    };

    render() {
        const { icon, url } = this.props;

        return (
            <a target='_blank' href={url} className='LinkIcon'>
                {icon}
            </a>
        );
    }
}
