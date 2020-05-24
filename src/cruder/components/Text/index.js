import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';

export default class Text extends PureComponent {
    static propTypes = {
        value : PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    };

    handleMouseEnter = e => {
        const { target }                   = e;
        const { offsetWidth, scrollWidth } = target;
        const { value }                    = this.props;

        target.title = offsetWidth < scrollWidth ? value : '';
    }

    render() {
        const { value } = this.props;

        return (
            <div
                onMouseEnter = {this.handleMouseEnter}
                className    = 'CRUDER_Text'
            >
                {value}
            </div>
        );
    }
}
