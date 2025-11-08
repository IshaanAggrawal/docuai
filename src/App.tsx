import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Component, ErrorInfo, ReactNode } from 'react';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Pricing from "./pages/Pricing";
import Docs from "./pages/Docs";
import OnboardingDashboard from "./pages/OnboardingDashboard";
import DocumentManagement from "./pages/DocumentManagement";
import NotFound from "./pages/NotFound";
import DashboardIndex from "./pages/DashboardIndex";
// Import new components
import DashboardLayout from "./components/layout/DashboardLayout";
import WorkflowBoard from "./features/workflows/pages/WorkflowBoard";
import Reports from "./features/analytics/pages/Reports";
import UserManagement from "./features/admin/pages/UserManagement";
import Settings from "./features/admin/pages/Settings";
import Dashboard from "./features/onboarding/pages/Dashboard";
// Test component
import TestDeployment from "./test-deployment";
import HealthCheck from "./pages/HealthCheck";

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: '#333' }}>
          <h1>Something went wrong</h1>
          <p>We're sorry, but something went wrong while loading the application.</p>
          <p>Please try refreshing the page or contact support.</p>
          <details style={{ marginTop: '20px', textAlign: 'left', fontSize: '0.8em' }}>
            <summary>Error details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner position="top-center" richColors />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/onboarding" element={<OnboardingDashboard />} />
            <Route path="/documents" element={<DocumentManagement />} />
            
            {/* Test route */}
            <Route path="/test" element={<TestDeployment />} />
            
            {/* Health check route */}
            <Route path="/health" element={<HealthCheck />} />
            
            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            <Route path="/dashboard/index" element={<DashboardLayout><DashboardIndex /></DashboardLayout>} />
            <Route path="/workflows" element={<DashboardLayout><WorkflowBoard /></DashboardLayout>} />
            <Route path="/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
            <Route path="/admin/users" element={<DashboardLayout><UserManagement /></DashboardLayout>} />
            <Route path="/admin/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;