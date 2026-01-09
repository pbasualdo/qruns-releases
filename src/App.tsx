import React from 'react';
import { QRunList } from './components/QRunList'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: 'red', background: '#fff' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children; 
  }
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QRunList />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
