import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { Tag }                  from 'antd';

export default class Tags extends PureComponent {
    static propTypes = {
        items : PropTypes.arrayOf(PropTypes.string),
        color : PropTypes.string
    };

    render() {
        const { items, color } = this.props;

        return (
            <div className='CRUDER_Tags'>
                {
                    items.map((item, index) =>
                        <Tag
                            key   = {index}     // eslint-disable-line
                            color = {color}
                        >
                            {item}
                        </Tag>
                    )
                }
            </div>
        );
    }
}
