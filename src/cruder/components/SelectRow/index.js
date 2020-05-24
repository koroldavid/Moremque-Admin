import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { Link }                 from 'react-router-dom';
import { Icon }                 from 'antd';

export default class SelectRow extends PureComponent {
    static propTypes = {
        type : PropTypes.string,
        url  : PropTypes.string
    };

    render() {
        const { type, url } = this.props;

        return (
            <Link to={url} className='CRUDER_SelectRow'>
                <Icon type={type} />
            </Link>

        );
    }
}
