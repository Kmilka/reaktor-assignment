import React from "react";
import { clearCache } from "../utils/api";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super();
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    clearCache();
    setTimeout(window.location.reload(), 7000);
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h1>Small error occured</h1>
          <p>The page will reload in 5s.</p>
          <h1>We are sorry!</h1>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
