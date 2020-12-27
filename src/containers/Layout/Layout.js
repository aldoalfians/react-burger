import React, { useState } from "react";
import { connect } from "react-redux";
import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer";

// Before using functional component / hooks
const Layout = (props) => {
	const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

	const sideDrawerClosedHandler = () => {
		setSideDrawerIsVisible(false);
	};

	const sideDrawerToggleHandler = () => {
		setSideDrawerIsVisible(!sideDrawerIsVisible);
	};

	return (
		<Auxiliary>
			<Toolbar
				isAuth={props.isAuthenticated}
				drawerToggleClicked={sideDrawerToggleHandler}
			/>
			<SideDrawer
				isAuth={props.isAuthenticated}
				open={sideDrawerIsVisible}
				closed={sideDrawerClosedHandler}
			/>
			<main className={classes.Content}>{props.children}</main>
		</Auxiliary>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);

// Before using functional component / hooks
// class Layout extends Component {
// 	state = {
// 		showSideDrawer: false,
// 	};

// 	sideDrawerClosedHandler = () => {
// 		this.setState({ showSideDrawer: false });
// 	};

// 	sideDrawerToggleHandler = () => {
// 		this.setState((prevState) => {
// 			return { showSideDrawer: !prevState.showSideDrawer };
// 		});
// 	};
// 	render() {
// 		return (
// 			<Auxiliary>
// 				<Toolbar
// 					isAuth={this.props.isAuthenticated}
// 					drawerToggleClicked={this.sideDrawerToggleHandler}
// 				/>
// 				<SideDrawer
// 					isAuth={this.props.isAuthenticated}
// 					open={this.state.showSideDrawer}
// 					closed={this.sideDrawerClosedHandler}
// 				/>
// 				<main className={classes.Content}>{this.props.children}</main>
// 			</Auxiliary>
// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		isAuthenticated: state.auth.token !== null,
// 	};
// };

// export default connect(mapStateToProps)(Layout);
