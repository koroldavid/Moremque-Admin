import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { Button, Spin }         from 'antd';
import { LoadingOutlined }      from '@ant-design/icons';
import cx                       from 'classnames';
import { CSSTransition }        from 'react-transition-group';

const Loader = <LoadingOutlined spin/>;

export default class SwitcherYesNo extends PureComponent {
    static propTypes = {
        options : PropTypes.array,
        active  : PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
            PropTypes.number
        ]),
        disabled : PropTypes.bool,
        onChange : PropTypes.func
    };

    handleClick = option => {
        const { active, onChange } = this.props;

        if (active !== option) onChange(option);
    }

    render() {
        const { options, active, disabled } = this.props;

        const classes = cx({
            'CRUDER_SwitcherYesNo' : true,
            'CRUDER_disabled'      : disabled
        });

        return (
            <Button.Group className={classes}>
                <Button
                    onClick   = {this.handleClick.bind(this, options[0].option)}
                    type      = {active === options[0].option ? 'primary' : 'secondary'}
                    className = 'CRUDER_Yes'
                    disabled  = {disabled}
                >
                    {options[0].label}
                </Button>
                <Button
                    onClick   = {this.handleClick.bind(this, options[1].option)}
                    type      = {active === options[1].option ? 'primary' : 'secondary'}
                    className = 'CRUDER_No'
                    disabled  = {disabled}
                >
                    {options[1].label}
                </Button>
                <CSSTransition
                    in={disabled}
                    timeout={500}
                    exit={false}
                    enter
                    mountOnEnter
                    unmountOnExit
                    classNames='CRUDER_delay'
                >
                    <div className='CRUDER_loader'>
                        <Spin size='small' indicator={Loader} />
                    </div>
                </CSSTransition>
            </Button.Group>
        );
    }
}
