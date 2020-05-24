import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { Button }               from 'antd';
import { CloseOutlined }        from '@ant-design/icons';
import ItemLabel                from '../ItemLabel/index.js';
import Link                     from '../Link/index.js';

const INITIAL_STATE = {
    expanded : false,
    query    : undefined
};

export default class Filter extends PureComponent {
    static propTypes = {
        fields    : PropTypes.array,
        fieldSets : PropTypes.array,
        labels    : PropTypes.object,
        query     : PropTypes.object,
        // page      : PropTypes.number,
        onSearch  : PropTypes.func
    }

    state = INITIAL_STATE

    inputs = {}

    componentDidUpdate(prevProps, prevState) {
        const { query } = this.props;

        if (prevState.expanded !== this.state.expanded || prevProps.query !== query) {
            const currentQuery = this.state.query || query;

            this.handleSetValues(currentQuery);
        }
    }

    handleToggleExpand = () => {
        const { expanded } = this.state;

        const query = this.generateQuery();

        this.setState({ query, expanded: !expanded });
    }

    handleWidgetChange = (name, value) => {
        this.setState(prevState => ({
            query : {
                ...prevState.query,
                [name] : value
            }
        }));
    }

    generateQuery = () => {
        const { fields } = this.props;

        const query = {};

        fields.forEach(field => {
            if (field.mapsTo) {
                const values = this.inputs[field.name] ? this.inputs[field.name].getValue() : undefined;

                field.mapsTo.forEach((name, index) => query[name] = values ? values[index] : undefined);
            } else {
                query[field.name] = this.inputs[field.name] && this.inputs[field.name].getValue()
                    ? this.inputs[field.name].getValue()
                    : undefined;
            }
        });

        return query;
    }

    handleSetValues = query => {
        const { fields } = this.props;

        this.setState({ query });

        fields
            .filter(field => this.inputs[field.name])
            .forEach(field => {
                if (field.mapsTo) {
                    const values = field.mapsTo.map(name => query[name]);

                    this.inputs[field.name].setValue(values);
                } else {
                    this.inputs[field.name].setValue(query[field.name]);
                }
            });
    }

    handleSearch = e => {
        if (e) e.preventDefault();

        const { onSearch /* query: prevQuery, page = 1 */ } = this.props;

        const query = this.generateQuery();

        // if (page === 1 && Object.keys(prevQuery).every(key => prevQuery[key] === query[key])) return;

        this.setState({ ...INITIAL_STATE });
        onSearch(query);
    }

    handleClearAll = () => {
        const { onSearch, fields } = this.props;

        const query = {};

        fields.forEach(field => {
            if (field.mapsTo) {
                field.mapsTo.forEach(name => query[name] = undefined);
            } else {
                query[field.name] = undefined;
            }
        });

        this.setState({ query: undefined });

        onSearch(query);
    }

    renderItems(fieldSet) {
        const { fields, query } = this.props;
        const { query: data } = this.state;

        return fields
            .filter(field => field.fieldSet === fieldSet)
            .map(field => {
                const { name, label, component: Component } = field;

                return (
                    <ItemLabel key={name} label={label}>
                        <Component
                            ref={ref => this.inputs[name] = ref}
                            schema={field}
                            data={data || query}
                            onChange={this.handleWidgetChange}
                        />
                    </ItemLabel>
                );
            });
    }

    renderFieldSets() {
        const { expanded } = this.state;
        const { fieldSets }   = this.props;

        if (!expanded) return null;

        const groups = fieldSets.map(fieldSet => fieldSet.group)
            .filter((group, index, array) => array.indexOf(group) === index);

        return [
            <div key='fieldSets' className='CRUDER_fieldSets'>
                {
                    groups.map(group => {
                        return (
                            <div key={group} className='CRUDER_group'>
                                {
                                    fieldSets
                                        .filter(fieldSet => fieldSet.group === group)
                                        .map(fieldSet => {
                                            return (
                                                <div key={fieldSet.name} className='CRUDER_fieldSet'>
                                                    <div className='CRUDER_fieldSet_title'>
                                                        {fieldSet.label}
                                                    </div>
                                                    {this.renderItems(fieldSet.name)}
                                                </div>
                                            );
                                        })
                                }
                            </div>
                        );
                    })
                }
            </div>,
            <div key='extra' className='CRUDER_extra'>
                {this.renderItems('extra')}
                <Button type='primary' htmlType='submit'>
                    Искать
                </Button>
            </div>
        ];
    }

    renderSelected() {
        const { expanded, query: data } = this.state;
        const { fields, query }  = this.props;

        if (expanded) return null;

        const currentQuery = this.state.query || query;

        const selected = fields.filter(field => {
            if (!field.fieldSet) return false;
            if (field.mapsTo) {
                return field.mapsTo.some(name => currentQuery[name]);
            }

            return currentQuery[field.name];
        });

        if (!selected.length) return null;

        return [
            <div key='clear' className='CRUDER_action'>
                <Link onClick={this.handleClearAll}>
                    <CloseOutlined />
                    сбросить фильтры
                </Link>
            </div>,
            <div key='selected' className='CRUDER_selected'>
                {

                    selected.map(field => {
                        const { name, label, component: Component } = field;

                        return (
                            <ItemLabel key={name} label={label}>
                                <Component
                                    ref={ref => this.inputs[name] = ref}
                                    schema={field}
                                    data={data || query}
                                    onChange={this.handleWidgetChange}
                                />
                            </ItemLabel>
                        );
                    })
                }
            </div>
        ];
    }

    render() {
        const { fieldSets, labels } = this.props;

        return (
            <form className = 'CRUDER_Filter' onSubmit={this.handleSearch}>
                <div className='CRUDER_defaultFilter'>
                    {this.renderItems()}
                    <Button
                        type='primary'
                        htmlType='submit'
                    >
                        {labels.searchButton}
                    </Button>
                </div>
                {this.renderSelected()}
                {
                    fieldSets && fieldSets.length
                        ? <div className='CRUDER_action'>
                            <Link value='расширенный фильтр' onClick={this.handleToggleExpand} />
                        </div>
                        : null
                }
                {this.renderFieldSets()}
            </form>
        );
    }
}
