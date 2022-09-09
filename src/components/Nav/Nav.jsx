import React from 'react';
import CustomNavLink from './CustomNavLink/CustomNavLink';
import classes from './Nav.module.scss';

const Nav = () => {
	return (
		<div className={classes.Nav}>
			<CustomNavLink to={'/'}>Home</CustomNavLink>
			<CustomNavLink to={'/about'}>About</CustomNavLink>
			<CustomNavLink to={'/characters'}>Characters</CustomNavLink>
			<CustomNavLink to={'/TodoPage'}>TodoPage</CustomNavLink>
		</div>
	);
};

export default Nav;
