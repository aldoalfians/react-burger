import React from "react";
import Logo from "../../component/Logo/Logo";
import NavigationItems from "../Navigationitems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../component/UI/Backdrop/Backdrop";
import Auxiliary from "../../hoc/Auxiliary";

const sideDrawer = (props) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (props.open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<Auxiliary>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(" ")} onClick={props.closed}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuthenticated={props.isAuth} />
				</nav>
			</div>
		</Auxiliary>
	);
};

export default sideDrawer;
