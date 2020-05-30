import React, { PureComponent }        from 'react';
import PropTypes                       from 'prop-types';
import { Button }                      from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

class Pager extends PureComponent {
    static propTypes = {
        currentPage      : PropTypes.number,
        pageSize         : PropTypes.number,
        itemsCount       : PropTypes.number,
        disableNextPages : PropTypes.bool,
        onPageChange     : PropTypes.func
    }

    handleClick = side => () => {
        const { currentPage, onPageChange } = this.props;

        if (onPageChange) {
            const nextPage = side === 'next'
                ? currentPage + 1
                : currentPage - 1;

            onPageChange(nextPage);
        }
    }

    showInfo() {
        const { currentPage, pageSize = 0 } = this.props;

        const start = pageSize * currentPage - pageSize;
        const end   = start + pageSize;

        return <div className='info'>
            {`${start + 1}-${end}`}
        </div>;
    }

    render() {
        const { currentPage, itemsCount = 0, pageSize = 0, disableNextPages } = this.props;
        const itemsBefore = pageSize * currentPage - pageSize;

        return (
            <div className='CRUDER_Pager'>
                <Button
                    icon={<LeftOutlined />}
                    disabled={itemsBefore <= 0}
                    onClick={this.handleClick('prev')}
                />
                {this.showInfo()}
                <Button
                    icon={<RightOutlined />}
                    disabled={disableNextPages || (itemsBefore + pageSize) >= itemsCount}
                    onClick={this.handleClick('next')}
                />
            </div>
        );
    }
}

export default Pager;
