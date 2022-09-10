import React from 'react';
import classes from './Footer.module.scss'

const Footer = ({children}) => {
    return (
        <footer className={classes.Footer}>
            {children}
        </footer>
    );
};

export default Footer;
