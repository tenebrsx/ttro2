import React, { Component, ErrorInfo, ReactNode } from "react";

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

  public static getDerivedStateFromError(__: Error): State {
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
            <h2 className="text-2xl font-cormorant text-mocha mb-4">
              Oops! Algo salió mal
            </h2>
            <p className="text-mocha/70 font-karla mb-4">
              Hubo un error cargando la página. Por favor, intenta recargar.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-dusty-rose text-cream px-6 py-3 rounded-full font-karla hover:bg-mocha transition-colors"
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
