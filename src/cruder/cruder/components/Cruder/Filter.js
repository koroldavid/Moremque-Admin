import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import Filter                   from '../../../components/Filter/index.js';

class FilterType extends PureComponent {
    static propTypes = {
        schema        : PropTypes.object,
        location      : PropTypes.object,
        onQueryChange : PropTypes.func
    }

    handleSearch = query => {
        const { onQueryChange } = this.props;

        onQueryChange({
            ...query,
            page : 1
        });
    }

    prepareQuery = () => {
        const { query }  = this.props.location;
        const { fields } = this.props.schema;

        const values = {};

        fields.forEach(field => {
            if (field.mapsTo) {
                field.mapsTo.forEach(name => values[name] = query[name]);
            } else {
                values[field.name] = query[field.name];
            }
        });

        return values;
    }

    render() {
        const { location } = this.props;
        const { fields, fieldSets, labels } = this.props.schema;

        return (
            <Filter
                onSearch  = {this.handleSearch}
                fields    = {fields}
                fieldSets = {fieldSets}
                labels    = {labels}
                query     = {this.prepareQuery()}
                page      = {location.query.page ? parseInt(location.query.page, 10) : undefined}
            />
        );
    }
}

export default FilterType;
