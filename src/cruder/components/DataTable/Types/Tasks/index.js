import React, { PureComponent }         from 'react';
import PropTypes                        from 'prop-types';
import { Button, Dropdown, Menu, Icon } from 'antd';
import ConfirmModal                     from '../../../../cruder/components/Cruder/ConfirmModal.js';

export default class TasksType extends PureComponent {
    static propTypes = {
        item       : PropTypes.object,
        schema     : PropTypes.object,
        onInteract : PropTypes.func
    }

    state = {
        confirm : undefined
    }

    handleClick = e => {
        this.handleOpenConfirm(e.key);
    }

    handleOpenConfirm = confirm => this.setState({ confirm });

    handleCloseConfirm = success => {
        this.setState({ confirm: undefined });

        if (success) {
            const { onInteract, item, schema } = this.props;

            onInteract({ item, schema, reload: true });
        }
    }

    renderModal() {
        const { item, schema } = this.props;
        const { tasks }        = schema.componentOptions;
        const { confirm }      =  this.state;

        if (!confirm) return;

        const task = tasks.find(entity => entity.name === confirm);

        if (task.component) {
            const Component = task.component;

            return <Component
                item    = {item}
                schema  = {task}
                onClose = {this.handleCloseConfirm}
            />;
        }

        return <ConfirmModal
            itemData        = {item}
            confirmData     = {task}
            onClose         = {this.handleCloseConfirm}
        />;
    }

    render() {
        const { item, schema }  = this.props;
        const { tasks, labels } = schema.componentOptions;

        const menu = (
            <Menu onClick={this.handleClick}>
                {
                    tasks.map(task => {
                        if (task.visible && !task.visible(item)) return null;

                        return (
                            <Menu.Item key={task.name}>
                                {task.label}
                            </Menu.Item>
                        );
                    })
                }
            </Menu>
        );


        return <div className='CRUDER_Tasks'>
            <Dropdown overlay={menu} trigger={[ 'click' ]}>
                <Button>
                    {labels.dropdown}
                    <Icon type='down' />
                </Button>
            </Dropdown>
            {this.renderModal()}
        </div>;
    }
}
