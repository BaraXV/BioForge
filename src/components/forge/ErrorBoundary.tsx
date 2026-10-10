"use client";

import React from "react";

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            background: "rgb(16, 14, 20)",
            color: "rgb(235, 98, 98)",
            padding: 32,
            fontFamily: "Consolas, monospace",
            fontSize: 13,
            whiteSpace: "pre-wrap",
            overflow: "auto",
          }}
        >
          <h2 style={{ color: "rgb(235, 130, 90)", marginTop: 0 }}>
            JAI FORGE render error
          </h2>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {this.state.error?.message}
          </pre>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              color: "rgb(150, 145, 160)",
              fontSize: 11,
              marginTop: 16,
            }}
          >
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
