import React from 'react';
import PropTypes from 'prop-types';

export default function MainLayout(props) {
    return (
        <div className='MainLayout'>
            {props.children}
        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired
};
