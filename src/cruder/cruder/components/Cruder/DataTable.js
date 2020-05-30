import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { Tabs, notification }   from 'antd';
import DataTable                from '../../../components/DataTable/index.js';

class DataTableType extends PureComponent {
    static propTypes = {
        schema        : PropTypes.object,
        location      : PropTypes.object,
        apiAdapter    : PropTypes.object,
        onQueryChange : PropTypes.func
    }

    state = {
        items           : [],
        isLoading       : false,
        isExportLoading : false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.query !== this.props.location.query) {
            this.handleLoad(nextProps.location.query);
        }
    }

    handleLoad = async query => {
        const { apiAdapter, schema } = this.props;
        const { labels }             = schema;

        this.setState({
            isLoading : true,
            error     : undefined
        });

        try {
            const { data: items, total } = await apiAdapter.list(query);

            this.setState({
                total,
                items,
                isLoading : false
            });
        } catch (error) {
            notification.error({
                message     : error.message || labels.errorMessage,
                description : error.message ? error.description : error.message
            });
            this.setState({
                isLoading : false,
                items     : [],
                total: 0
            });
        }
    }

    handleSort = ({ name, order }) => {
        const { onQueryChange } = this.props;

        onQueryChange({
            sortBy  : name,
            orderBy : order
        });
    }

    handleInteract = async ({ reload }) => {
        const { location } = this.props;

        if (reload) {
            await this.handleLoad(location.query);
        }
    }

    handlePageChange = page => {
        const { onQueryChange } = this.props;

        onQueryChange({ page });
    }

    handleTabChange = tab => {
        const { schema, onQueryChange } = this.props;
        const { tabs } = schema;

        onQueryChange({
            page : 1,
            ...tabs.find(item => item.name === tab).value
        });
    }

    handleExport = async () => {
        const { isExportLoading }      = this.state;
        const { apiAdapter, location } = this.props;

        if (isExportLoading) return;

        try {
            this.setState({ isExportLoading: true });
            await apiAdapter.export(location.query);
            this.setState({ isExportLoading: false });
        } catch (err) {
            this.setState({ isExportLoading: false });
            notification.error(err);
        }
    }

    getActiveTab() {
        const { location, schema } = this.props;
        const { tabs }             = schema;
        const { query }            = location;

        if (!tabs) return 'count';

        const active = tabs.find(tab =>
            Object.keys(tab.value).every(key => query[key] === tab.value[key])
        );

        if (!active) return;

        return active.name;
    }

    renderTabs(activeTab) {
        const { tabs } = this.props.schema;

        if (!tabs) return null;

        return (
            <Tabs
                key       = 'Tabs'
                activeKey = {activeTab}
                onChange  = {this.handleTabChange}
            >
                {
                    tabs.map(tab => {
                        return (
                            <Tabs.TabPane
                                key={tab.name}
                                tab={`${tab.label}`}
                            />
                        );
                    })
                }
            </Tabs>
        );
    }

    render() {
        const { items, total, isLoading, isExportLoading, error }       = this.state;
        const { schema, location, apiAdapter }                   = this.props;
        const { columns, labels, rowClassName, highlightedRows } = schema;

        const activeTab = this.getActiveTab();

        return [
            this.renderTabs(activeTab),
            <DataTable
                key          = 'DataTable'
                columns      = {columns}
                items        = {items}
                error        = {error}

                isLoading    = {isLoading}
                sortBy       = {location.query.sortBy}
                orderBy      = {location.query.orderBy}

                onSort       = {this.handleSort}
                onInteract   = {this.handleInteract}

                currentPage  = {parseInt(location.query.page, 10)}
                pageSize     = {parseInt(location.query.perPage, 10)}
                itemsCount   = {total}
                onPageChange = {this.handlePageChange}

                fetchText    = {labels.fetchMessage}
                emptyText    = {labels.emptyMessage}

                onExport        = {apiAdapter.export ? this.handleExport : undefined}
                isExportLoading = {isExportLoading}

                rowClassName = {rowClassName}
                highlight    = {highlightedRows}
            />
        ];
    }
}

export default DataTableType;
