import React from "react";
import classes from "./NavigationsItems.module.css";
import NavItem from "./Navitem/Navitem";

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavItem link="/" exact>
			Burger Builder
		</NavItem>
		{props.isAuthenticated ? (
			<NavItem link="/orders">Orders</NavItem>
		) : null}
		{!props.isAuthenticated ? (
			<NavItem link="/auth">Log in</NavItem>
		) : (
			<NavItem link="/logout">Log out</NavItem>
		)}
	</ul>
);

export default navigationItems;
