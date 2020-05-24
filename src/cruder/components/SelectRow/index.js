import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { Link }                 from 'react-router-dom';

export default class SelectRow extends PureComponent {
    static propTypes = {
        type : PropTypes.string,
        url  : PropTypes.string
    };

    render() {
        const { icon, url } = this.props;

        return (
            <Link to={url} className='SelectRow'>
                {icon}
            </Link>

        );
    }
}
