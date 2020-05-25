import React                           from 'react';
import { FilterTypes, DataTableTypes } from '../../cruder';
import mock                            from '../../utils/mock';
import defaultParams                   from '../../utils/defaultParams';
import { RightOutlined }               from '@ant-design/icons';


export default function createSchema(api) {
    const { fetchMessage, emptyMessage, errorMessage, date } = mock;
    const { tipFormat, dateFormat } = date;
    const { perPage, sortBy, orderBy } = defaultParams.category;
    const { create, list } = api.category;

    return {
        apiAdapter       : { create, list },
        createModalOptions : {
            width  : 440,
            fields : [
                {
                    name             : 'name',
                    label            : 'Name',
                    component        : FilterTypes.Input,
                }
            ],
            labels : mock.getCreateLabels('category')
        },
        dataTableOptions : {
            defaultPerPage : perPage,
            defaultSortBy  : sortBy,
            defaultOrderBy : orderBy,
            labels         : { fetchMessage, emptyMessage, errorMessage },
            columns        : [
                {
                    name       : 'name',
                    label      : 'Name',
                    component  : DataTableTypes.Text,
                    width      : 140,
                    expandable : true
                },
                {
                    name       : 'clicks',
                    label      : 'Clicks',
                    component  : DataTableTypes.Text,
                    width      : 120,
                    expandable : true
                },
                {
                    name       : 'subCategory',
                    label      : 'Sub category',
                    component  : DataTableTypes.Tags,
                    width      : 120,
                    expandable : true
                },
                {
                    name             : 'createdAt',
                    label            : 'Created',
                    component        : DataTableTypes.TextDate,
                    width            : 130,
                    sortable         : true,
                    expandable       : true,
                    componentOptions : { dateFormat, tipFormat }
                },
                {
                    name             : 'updatedAt',
                    label            : 'Created',
                    component        : DataTableTypes.TextDate,
                    width            : 130,
                    sortable         : true,
                    expandable       : true,
                    componentOptions : { dateFormat, tipFormat }
                },
                {
                    name             : 'selectRow',
                    component        : DataTableTypes.SelectRow,
                    width            : 40,
                    componentOptions : {
                        icon         : <RightOutlined />,
                        urlFormatter : category => `/category/${category._id}`,
                    }
                },
                {
                    name             : 'tasks',
                    component        : DataTableTypes.Tasks,
                    width            : 140,
                    componentOptions : {
                        labels : { dropdown : mock.dropdownLabel },
                        tasks  : [
                            {
                                name             : 'edit',
                                label            : 'Edit',
                                component        : DataTableTypes.ModalUpdate,
                                componentOptions : {
                                    width  : 440,
                                    fields : [
                                        {
                                            name      : 'name',
                                            label     : 'Name',
                                            component : FilterTypes.Input
                                        }
                                    ],
                                    handler : ({item}) => api.category.edit(item),
                                    labels  : mock.getEditLabels('category')
                                }
                            },
                            {
                                name      : 'delete',
                                label     : 'Delete',
                                handler   : ({item}) => api.category.delete(item._id),
                                confirmationModalLabels : mock.getDeleteLabels('category')
                            }
                        ]
                    }
                }
            ]
        }
    };
}