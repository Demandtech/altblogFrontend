import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	componentDidCatch(error, errorInfo) {
		console.log(errorInfo);
		this.setState({
			hasError: true,
			error: error,
			errorInfo: errorInfo,
		});
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI here
			return (
				<>
					<h1>Something went wrong.</h1>
					<p>{this.state.error.message}</p>
					{/* <p>{this.state.errorInfo}</p> */}
				</>
			);
		}

		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node,
};

export default ErrorBoundary;
