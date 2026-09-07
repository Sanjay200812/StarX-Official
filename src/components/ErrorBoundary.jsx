import React from 'react';

/**
 * ErrorBoundary Component
 * Ensures the website always renders even if a sub-component, image, or animation fails.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#F5F5F7' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Section temporarily unavailable</h3>
          <p style={{ color: '#737378' }}>Content will load on refresh.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
