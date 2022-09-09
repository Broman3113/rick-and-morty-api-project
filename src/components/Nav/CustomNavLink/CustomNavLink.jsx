import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './CustomNavLink.module.scss';

const CustomNavLink = ({ children, ...props }) => {
	return (
		<NavLink
			className={({ isActive }) => (isActive ? classes.active : null)}
			{...props}
		>
			{children}
		</NavLink>
	);
};

export default CustomNavLink;
