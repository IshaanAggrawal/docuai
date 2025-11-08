import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardIndex = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the main dashboard page
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default DashboardIndex;