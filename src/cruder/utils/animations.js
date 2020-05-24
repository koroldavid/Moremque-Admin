import React             from 'react';
import { CSSTransition } from 'react-transition-group';


export const Fade = ({ children, ...props }) => (        // eslint-disable-line
    <CSSTransition
        {...props}
        timeout    = {300}
        classNames = 'CRUDER_fade'
    >
        {children}
    </CSSTransition>
);
