import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { Icon }                 from 'antd';

export default class LinkIcon extends PureComponent {
    static propTypes = {
        type : PropTypes.string,
        url  : PropTypes.string
    };

    render() {
        const { type, url } = this.props;

        return (
            <a target='_blank' href={url} className='CRUDER_LinkIcon'>
                <Icon type={type} />
            </a>
        );
    }
}
