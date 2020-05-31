import { FilterTypes, DataTableTypes } from '../../cruder';
import mock                            from '../../utils/mock';
import defaultParams                   from '../../utils/defaultParams';


export default function createSchema(api, actions, categoryId) {
    const { fetchMessage, emptyMessage, errorMessage, date } = mock;
    const { tipFormat, dateFormat } = date;
    const { perPage, sortBy, orderBy } = defaultParams.subCategory;

    return {
        apiAdapter : {
            create : (item) => actions.create({ ...item, categoryId }),
            list   : api.subCategory.list
        },
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
            defaultTab     : 'active',
            tabs           : [
                {
                    name  : 'active',
                    label : 'Active',
                    value : { paranoid: 'false' }
                },
                {
                    name  : 'deleted',
                    label : 'Deleted',
                    value : { paranoid: 'true' }
                },
            ],
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
                    name             : 'isActive',
                    label            : 'Is active',
                    component        : DataTableTypes.SwitcherYesNo,
                    width            : 120,
                    expandable       : true,
                    componentOptions : {
                        handler : ({item, value}) => api.subCategory.update({ ...item, isActive: value }),
                        options : [
                            {
                                label: 'Yes',
                                option: true
                            },
                            {
                                label: 'No',
                                option: false
                            }
                        ],
                        labels : {
                            successMessage : 'Success',
                            errorMessage   : 'Error caused'
                        }
                    }
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
                                    handler : actions.update,
                                    labels  : mock.getEditLabels('sub-category')
                                }
                            },
                            {
                                name      : 'delete',
                                label     : 'Delete',
                                handler   : ({item}) => actions.deleting(item._id, categoryId),
                                confirmationModalLabels : mock.getDeleteLabels('sub-category')
                            }
                        ]
                    }
                }
            ]
        }
    };
}