import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { Icon, Spin, Alert }    from 'antd';
import { TransitionGroup }      from 'react-transition-group';
import cx                       from 'classnames';
import { Fade }                 from '../../utils/animations.js';
import Pager                    from '../Pager/index.js';
import { Link } from '../../index.js';

const ORDERS = {
    'asc'  : 'desc',
    'desc' : 'asc'
};

export default class DataTable extends PureComponent {
    static propTypes = {
        columns    : PropTypes.array,
        items      : PropTypes.array,
        sortBy     : PropTypes.string,
        orderBy    : PropTypes.string,
        isLoading  : PropTypes.bool,
        onInteract : PropTypes.func,
        onSort     : PropTypes.func,

        currentPage  : PropTypes.number,
        pageSize     : PropTypes.number,
        itemsCount   : PropTypes.number,
        onPageChange : PropTypes.func,

        fetchText : PropTypes.string,
        emptyText : PropTypes.string,

        onExport        : PropTypes.func,
        isExportLoading : PropTypes.bool,

        rowClassName : PropTypes.func,
        highlight    : PropTypes.array
    }

    state = {
        isSrolledToLeft  : true,
        isSrolledToRight : true
    }

    componentDidMount() {
        this.content.addEventListener('scroll', this.checkScroll, { passive: true });
        window.addEventListener('resize', this.checkScroll);
        this.checkScroll();
    }

    componentWillUnmount() {
        this.content.removeEventListener('scroll', this.checkScroll, { passive: true });
        window.removeEventListener('resize', this.checkScroll);
    }

    checkScroll = () => {                                                 // eslint-disable-line
        const { isSrolledToLeft, isSrolledToRight } = this.state;
        const { scrollLeft, clientWidth, scrollWidth } = this.content;

        const left = scrollLeft === 0;
        const right = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;

        if (left !== isSrolledToLeft || right !== isSrolledToRight) {
            this.setState({
                isSrolledToLeft  : left,
                isSrolledToRight : right
            });
        }
    }

    handleSort = schema => {
        const { onSort, sortBy, orderBy, itemsCount } = this.props;

        if (!schema.sortable || !itemsCount) return;

        const order = sortBy === schema.name
            ? ORDERS[orderBy]
            : 'asc';

        onSort({
            name : schema.name,
            order,
            schema
        });
    }

    getRowStyles = item => {
        const { highlight } = this.props;

        if (!(highlight && highlight.length)) return;

        const styles = {};

        for (const rule of highlight) {
            if (rule.condition(item)) {
                styles.backgroundColor = rule.backgroundColor;
                styles.color           = rule.textColor;
            }
        }

        return styles;
    }

    renderSort = column => {
        const { sortBy, orderBy } = this.props;

        return (
            <div className='CRUDER_sort'>
                <div className='CRUDER_sortUp'>
                    <TransitionGroup>
                        {
                            sortBy !== column.name || orderBy !== 'desc'
                                ? <Fade>
                                    <Icon type='caret-up' style={{ fontSize: 8 }} />
                                </Fade>                                      // eslint-disable-line
                                : null
                        }
                    </TransitionGroup>
                </div>
                <div className='CRUDER_sortDown'>
                    <TransitionGroup>
                        {
                            sortBy !== column.name || orderBy !== 'asc'
                                ? <Fade>
                                    <Icon type='caret-down' style={{ fontSize: 8 }} />
                                </Fade>                                      // eslint-disable-line
                                : null
                        }
                    </TransitionGroup>
                </div>
            </div>
        );
    }

    renderHeader() {
        const { columns, itemsCount } = this.props;

        return (
            <div className='CRUDER_header'>
                {
                    columns.map(column => {
                        const { component } = column;

                        const classes = cx({
                            'CRUDER_column'                            : true,
                            'CRUDER_column_sortable'                   : column.sortable,
                            'CRUDER_column_disabled'                   : !itemsCount,
                            [`CRUDER_column_${component.columnClass}`] : component.columnClass
                        });

                        return (
                            <div
                                key={column.name}
                                className={classes}
                                onClick={this.handleSort.bind(this, column)}
                                style     = {{
                                    width    : column.width,
                                    flexGrow : column.expandable ? column.width : 0
                                }}
                            >
                                {
                                    column.sortable
                                        ? this.renderSort(column)
                                        : null
                                }
                                {column.label}
                            </div>
                        );
                    }
                    )
                }
            </div>
        );
    }

    renderItem(item, index) {
        const { columns, onInteract, rowClassName } = this.props;
        const primary = columns.find(column => column.primary);

        const rowClasses = cx({
            'CRUDER_row'                                    : true,
            [rowClassName ? rowClassName(item) : undefined] : rowClassName
        });

        const rowStyles = this.getRowStyles(item);

        return (
            <div
                key       = {primary ? item[primary.name] : index}
                className = {rowClasses}
                style     = {rowStyles}
            >
                {
                    columns.map(column => {
                        const { component: Component, width, expandable } = column;

                        const classes = cx({
                            'CRUDER_cell'                            : true,
                            [`CRUDER_cell_${Component.columnClass}`] : Component.columnClass
                        });

                        return <div
                            className = {classes}
                            key       = {column.name}
                            style     = {{
                                width,
                                flexGrow : expandable ? width : 0
                            }}
                        >
                            <Component
                                item       = {item}
                                schema     = {column}
                                onInteract = {onInteract}
                            />
                        </div>;
                    })
                }
            </div>
        );
    }

    renderItems() {
        const { items, isLoading, fetchText, emptyText } = this.props;

        if (!items.length && isLoading) {
            return (
                <React.Fragment>
                    <div className='CRUDER_alertStub' />
                    <Alert
                        type='info'
                        message={
                            <span className='CRUDER_fetchAlert'>
                                {fetchText}
                                <span> .</span><span>.</span><span>.</span>
                            </span>
                        }
                    />
                </React.Fragment>
            );
        }
        if (!items.length) {
            return (
                <React.Fragment>
                    <div className='CRUDER_alertStub' />
                    <Alert message={emptyText} type='warning' />
                </React.Fragment>
            );
        }

        return (
            <div className='CRUDER_rows'>
                {
                    items.map((item, index) => this.renderItem(item, index))
                }
            </div>
        );
    }

    renderPager() {
        const { pageSize, currentPage, itemsCount, onPageChange } = this.props;

        if (!pageSize) return null;

        return (
            <Pager
                currentPage  = {currentPage}
                itemsCount   = {itemsCount}
                pageSize     = {pageSize}
                onPageChange = {onPageChange}
            />
        );
    }

    renderLoader() {
        const { isLoading, itemsCount } = this.props;

        return (
            isLoading && itemsCount
                ? <div className='CRUDER_loader'>
                    <Spin size='large' />
                </div>
                : null
        );
    }

    render() {
        const { isSrolledToLeft, isSrolledToRight } = this.state;
        const { isLoading, onExport, itemsCount, isExportLoading } = this.props;

        const classes = cx({
            'CRUDER_content'         : true,
            'CRUDER_content_blurred' : isLoading && itemsCount
        });

        const leftClasses = cx({
            'CRUDER_sideBlur'          : true,
            'CRUDER_sideBlur_left'     : true,
            'CRUDER_sideBlur_disabled' : isSrolledToLeft
        });

        const rightClasses = cx({
            'CRUDER_sideBlur'          : true,
            'CRUDER_sideBlur_right'    : true,
            'CRUDER_sideBlur_disabled' : isSrolledToRight
        });

        return (
            <div className='CRUDER_DataTable'>
                <div
                    className={classes}
                    ref={ref => this.content = ref}
                >
                    {this.renderHeader()}
                    {this.renderItems()}
                </div>
                {
                    onExport
                        ? <div className='CRUDER_export'>
                            <Link onClick={onExport}>
                                <Icon type='file-add' />
                                экспорт
                            </Link>
                            {
                                isExportLoading
                                    ? <Spin size='small' />
                                    : null
                            }
                        </div>
                        : null
                }
                {this.renderPager()}
                <div className={leftClasses} />
                <div className={rightClasses} />
                {this.renderLoader()}
            </div>
        );
    }
}
