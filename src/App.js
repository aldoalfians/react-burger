import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import logout from "./containers/Logout/Logout";
import * as actions from "./store/actions/index";

const Checkout = React.lazy(() => {
	return import("./containers/Checkout/Checkout");
});

const Orders = React.lazy(() => {
	return import("./containers/Orders/Orders");
});

const Auth = React.lazy(() => {
	return import("./containers/Auth/Auth");
});

const App = (props) => {
	const { onTryAutoSignup } = props;

	useEffect(() => {
		onTryAutoSignup();
	}, [onTryAutoSignup]);

	let routes = (
		<Switch>
			<Route path="/auth" render={(props) => <Auth {...props} />} />
			<Route path="/" exact component={BurgerBuilder} />
			<Redirect to="/" />
		</Switch>
	);

	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route
					path="/checkout"
					render={(props) => <Checkout {...props} />}
				/>
				<Route
					path="/orders"
					render={(props) => <Orders {...props} />}
				/>
				<Route path="/logout" component={logout} />
				<Route path="/auth" render={(props) => <Auth {...props} />} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);
	}
	return (
		<div>
			<Layout>
				<Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
			</Layout>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

// Sebelum Guarding Routes
// return (
// 	<div>
// 		<Layout>
// 			<Switch>
// 				<Route path="/checkout" component={Checkout} />
// 				<Route path="/orders" component={Orders} />
// 				<Route path="/auth" component={Auth} />
// 				<Route path="/logout" component={logout} />
// 				<Route path="/" exact component={BurgerBuilder} />
// 			</Switch>
// 		</Layout>
// 	</div>
// );

// before use functional component / hooks
// class App extends Component {
// 	componentDidMount() {
// 		this.props.onTryAutoSignup();
// 	}

// 	// use guarding routes
// 	render() {
// 		let routes = (
// 			<Switch>
// 				<Route path="/auth" component={asyncAuth} />
// 				<Route path="/" exact component={BurgerBuilder} />
// 				<Redirect to="/" />
// 			</Switch>
// 		);

// 		if (this.props.isAuthenticated) {
// 			routes = (
// 				<Switch>
// 					<Route path="/checkout" component={asyncCheckout} />
// 					<Route path="/orders" component={asyncOrders} />
// 					<Route path="/logout" component={logout} />
// 					<Route path="/auth" component={asyncAuth} />
// 					<Route path="/" exact component={BurgerBuilder} />
// 					<Redirect to="/" />
// 				</Switch>
// 			);
// 		}

// 		return (
// 			<div>
// 				<Layout>{routes}</Layout>
// 			</div>
// 		);
// 	}
// }

// before using react lazy
// import asyncComponent from "./hoc/aysncComponent/asyncComponent";
// const asyncCheckout = asyncComponent(() => {
// 	return import("./containers/Checkout/Checkout");
// });

// const asyncOrders = asyncComponent(() => {
// 	return import("./containers/Orders/Orders");
// });

// const asyncAuth = asyncComponent(() => {
// 	return import("./containers/Auth/Auth");
// });

// let routes = (
// 	<Switch>
// 		<Route path="/auth" component={asyncAuth} />
// 		<Route path="/" exact component={BurgerBuilder} />
// 		<Redirect to="/" />
// 	</Switch>
// );

// if (props.isAuthenticated) {
// 	routes = (
// 		<Switch>
// 			<Route path="/checkout" component={asyncCheckout} />
// 			<Route path="/orders" component={asyncOrders} />
// 			<Route path="/logout" component={logout} />
// 			<Route path="/auth" component={asyncAuth} />
// 			<Route path="/" exact component={BurgerBuilder} />
// 			<Redirect to="/" />
// 		</Switch>
// 	);
// }

// return (
// 	<div>
// 		<Layout>
// 			{routes}
// 		</Layout>
// 	</div>
// );
