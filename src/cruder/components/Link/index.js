import React, { PureComponent } from 'react';
import { Link as RouterLink }           from 'react-router-dom';
import PropTypes                from 'prop-types';
import cx                       from 'classnames';

export default class Link extends PureComponent {
    static propTypes = {
        children  : PropTypes.node,
        value     : PropTypes.string,
        url       : PropTypes.string,
        html      : PropTypes.bool,
        onClick   : PropTypes.func,
        className : PropTypes.string,
        style     : PropTypes.object
    };

    handleMouseEnter = e => {
        const { target }                   = e;
        const { offsetWidth, scrollWidth } = target;
        const { value }                    = this.props;

        target.title = offsetWidth < scrollWidth ? value : '';
    }

    handleClick = () => {
        const { onClick } = this.props;

        if (onClick) onClick();
    }

    render() {
        const { children, value, url, className, style, html } = this.props;

        const classes = cx({
            'CRUDER_Link' : true,
            [className]   : className
        });

        if (url && !html) {
            return (
                <RouterLink
                    to           = {url}
                    className    = {classes}
                    onClick      = {this.handleClick}
                    onMouseEnter = {this.handleMouseEnter}
                    style        = {style}
                >
                    {children ? children : value}
                </RouterLink>
            );
        }

        return (
            <a
                href         = {url}
                className    = {classes}
                onClick      = {this.handleClick}
                onMouseEnter = {this.handleMouseEnter}
                style        = {style}
            >
                {children ? children : value}
            </a>
        );
    }
}
