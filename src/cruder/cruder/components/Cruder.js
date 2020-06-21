import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import Filter                   from './Cruder/Filter.js';
import DataTable                from './Cruder/DataTable.js';
import Modal                    from './Cruder/Modal.js';

const QUERY = [ 'perPage', 'sortBy', 'orderBy', 'id' ];

class Cruder extends PureComponent {
    static propTypes = {
        schema   : PropTypes.object,
        location : PropTypes.object,
        history  : PropTypes.object
    }

    componentWillMount() {
        const { schema, location, history } = this.props;
        const { tabs, defaultTab }          = schema.dataTableOptions;

        const query = JSON.parse(JSON.stringify(location.query));

        QUERY.forEach(key => {
            if (!location.query[key]) {
                query[key] = schema.dataTableOptions[`default${key.charAt(0).toUpperCase() + key.slice(1)}`];
            }
        });

        if (tabs) {
            const tabQuery = tabs.find(tab => Object.keys(tab.value).every(key => query[key] === tab.value[key]));

            if (!tabQuery) {
                const tab = tabs.find(item => item.name === defaultTab);

                Object.keys(tab.value).forEach(key => query[key] = tab.value[key]);
            }
        }

        history.replace({
            pathname : location.pathname,
            query    : {
                ...query,
                page : query.page || 1
            }
        });
    }

    handleQueryChange = (query, method = 'push') => {
        const { history, location } = this.props;

        const data = {
            pathname : location.pathname,
            query    : {
                ...location.query,
                ...query
            }
        };

        history[method](data);
    }

    renderFilter() {
        const { location, schema, onInteract } = this.props;
        const { filterOptions, apiAdapter }    = schema;

        if (!filterOptions) return null;

        return <Filter
            schema        = {filterOptions}
            location      = {location}
            apiAdapter    = {apiAdapter}
            onQueryChange = {this.handleQueryChange}
            onInteract    = {onInteract}
        />;
    }

    renderDataTable() {
        const { location, schema, onInteract } = this.props;
        const { dataTableOptions, apiAdapter } = schema;

        if (!dataTableOptions) return null;

        return <DataTable
            schema        = {dataTableOptions}
            location      = {location}
            apiAdapter    = {apiAdapter}
            onQueryChange = {this.handleQueryChange}
            onInteract    = {onInteract}
        />;
    }

    renderModal() {
        const { apiAdapter, createModalOptions } = this.props.schema;

        if (!createModalOptions) return null;

        return (
            <Modal
                schema        = {createModalOptions}
                apiAdapter    = {apiAdapter}
                onQueryChange = {this.handleQueryChange}
                onInteract    = {this.props.onInteract}
            />
        );
    }

    render() {
        return (
            <div className='CRUDER_Cruder'>
                {this.renderFilter()}
                {this.renderModal()}
                {this.renderDataTable()}
            </div>
        );
    }
}

export default Cruder;
