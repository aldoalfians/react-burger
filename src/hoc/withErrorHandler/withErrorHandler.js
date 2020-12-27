import React from "react";

import Modal from "../../component/UI/Modal/Modal";
import Auxiliary from "../Auxiliary";
import useHttpErrorHandler from "../../hooks/http-error";

const withErrorHandler = (WrappedComponent, axios) => {
	return (props) => {
		const [error, clearError] = useHttpErrorHandler(axios);

		// before using custom hooks
		// const [error, setError] = useState(null);

		// const reqInterceptors = axios.interceptors.request.use((req) => {
		// 	setError(null);
		// 	return req;
		// });
		// const resInterceptors = axios.interceptors.response.use(
		// 	(res) => res,
		// 	(err) => {
		// 		setError(err);
		// 	}
		// );

		// useEffect(() => {
		// 	return () => {
		// 		axios.interceptors.request.eject(reqInterceptors);
		// 		axios.interceptors.response.eject(resInterceptors);
		// 	};
		// }, [reqInterceptors, resInterceptors]);

		// const errorConfirmedHandler = () => {
		// 	setError(null);
		// };

		return (
			<Auxiliary>
				<Modal show={error} modalClosed={clearError}>
					{error ? error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</Auxiliary>
		);
	};
};

export default withErrorHandler;

// Before using functional component
// const withErrorHandler = (WrappedComponent, axios) => {
// 	return class extends Component {
// 		state = {
// 			error: null,
// 		};

// 		componentWillMount = () => {
// 			this.reqInterceptors = axios.interceptors.request.use((req) => {
// 				this.setState({ error: null });
// 				return req;
// 			});
// 			this.resInterceptors = axios.interceptors.response.use(
// 				(res) => res,
// 				(error) => {
// 					this.setState({ error: error });
// 				}
// 			);
// 		};

// 		componentWillUnmount() {
// 			console.log(
// 				"Will unmount",
// 				this.reqInterceptors,
// 				this.resInterceptors
// 			);
// 			axios.interceptors.request.eject(this.reqInterceptors);
// 			axios.interceptors.response.eject(this.resInterceptors);
// 		}

// 		errorConfirmedHandler = () => {
// 			this.setState({ error: null });
// 		};
// 		render() {
// 			return (
// 				<Auxiliary>
// 					<Modal
// 						show={this.state.error}
// 						modalClosed={this.errorConfirmedHandler}
// 					>
// 						{this.state.error ? this.state.error.message : null}
// 					</Modal>
// 					<WrappedComponent {...this.props} />
// 				</Auxiliary>
// 			);
// 		}
// 	};
// };

// export default withErrorHandler;
