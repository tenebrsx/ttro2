import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-2xl font-academy text-cocoa-500 mb-4">
              Oops! Algo salió mal
            </h2>
            <p className="text-cocoa-500/70 font-bodoni mb-4">
              Hubo un error cargando la página. Por favor, intenta recargar.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-sage-500 text-cream-200 px-6 py-3 rounded-button font-bodoni font-medium hover:bg-sage-600 transition-all duration-300 btn-contrast-high tracking-button-refined shadow-premium hover:shadow-luxury"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
