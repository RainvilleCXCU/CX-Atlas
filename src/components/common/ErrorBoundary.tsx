// A minimal error boundary. It exists primarily to contain client-side DOM reconciliation crashes
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
	children: ReactNode;
	// Rendered in place of the children after a caught error. Defaults to null.
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false };

	static getDerivedStateFromError(): State {
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo): void {
		// Keep the failure observable rather than swallowing it silently.
		console.error("ErrorBoundary caught an error:", error, info);
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return this.props.fallback ?? null;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
