import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error('SaathiErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-dangerBg/30 rounded-3xl border border-danger/30 max-w-sm mx-auto">
          <div className="w-12 h-12 rounded-full bg-danger text-white flex items-center justify-center shadow-lg mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-danger font-bold text-lg mb-2">Saathi AI Offline</h3>
          <p className="text-slate-600 text-xs mb-4">
            A temporary component error occurred while rendering the chat interface.
          </p>
          <div className="bg-slate-100 text-slate-500 font-mono text-[9px] p-2 rounded text-left overflow-auto w-full max-h-24 mb-6 border border-slate-200">
            {this.state.error && this.state.error.toString()}
          </div>
          <button 
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:brightness-90 text-white text-xs font-bold rounded-xl shadow-md transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart Saathi
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
