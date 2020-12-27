import React from "react";
import classes from "./modal.module.css";
import Auxiliary from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
	// shouldComponentUpdate(nextPorps, nextState) {
	// 	return (
	// nextPorps.show !== this.props.show ||
	// nextPorps.children !== this.props.children
	// 	);
	// }

	return (
		<Auxiliary>
			<Backdrop show={props.show} clicked={props.modalClosed} />
			<div
				className={classes.Modal}
				style={{
					transform: props.show
						? "translateY(0)"
						: "translateY(-100vh)",
					opacity: props.show ? "1" : "0",
				}}
			>
				{props.children}
			</div>
		</Auxiliary>
	);
};
export default React.memo(
	Modal,
	(prevProps, nextProps) =>
		nextProps.show === prevProps.show &&
		nextProps.children === prevProps.children
);

// Before Using Functional Component

// class Modal extends Component {
// 	shouldComponentUpdate(nextPorps, nextState) {
// 		return (
// 			nextPorps.show !== this.props.show ||
// 			nextPorps.children !== this.props.children
// 		);
// 	}

// 	render() {
// 		return (
// 			<Auxiliary>
// 				<Backdrop
// 					show={this.props.show}
// 					clicked={this.props.modalClosed}
// 				/>
// 				<div
// 					className={classes.Modal}
// 					style={{
// 						transform: this.props.show
// 							? "translateY(0)"
// 							: "translateY(-100vh)",
// 						opacity: this.props.show ? "1" : "0",
// 					}}
// 				>
// 					{this.props.children}
// 				</div>
// 			</Auxiliary>
// 		);
// 	}
// }
// export default Modal;
