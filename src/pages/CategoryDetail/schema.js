import { FilterTypes, DataTableTypes } from '../../cruder';
import mock                            from '../../utils/mock';
import defaultParams                   from '../../utils/defaultParams';


export default function createSchema(api) {
    const { fetchMessage, emptyMessage, errorMessage, date } = mock;
    const { tipFormat, dateFormat } = date;
    const { perPage, sortBy, orderBy } = defaultParams.subCategory;
    const { create, list } = api.subCategory;

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
            labels : mock.getCreateLabels('sub-category')
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
                                    handler : api.subCategory.edit,
                                    labels  : mock.getEditLabels('sub-category')
                                }
                            },
                            {
                                name      : 'delete',
                                label     : 'Delete',
                                handler   : api.subCategory.delete,
                                confirmationModalLabels : mock.getDeleteLabels('sub-category')
                            }
                        ]
                    }
                }
            ]
        }
    };
}