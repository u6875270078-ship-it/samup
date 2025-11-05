import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Loading() {
  const [, setLocation] = useLocation();
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    // Start countdown
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Redirect to OTP page after 30 seconds
    const redirectTimer = setTimeout(() => {
      setLocation("/otp");
    }, 30000);

    // Cleanup on unmount
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimer);
    };
  }, [setLocation]);

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
          <h1 className="text-3xl font-bold text-black">Vérification en cours...</h1>
          <p className="text-lg text-gray-600">
            Veuillez patienter pendant que nous vérifions vos informations
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-black">
            <span className="text-2xl font-bold text-black">{countdown}</span>
          </div>
          <p className="mt-4 text-sm text-gray-500">secondes restantes</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-black transition-all duration-1000 ease-linear"
            style={{ width: `${((30 - countdown) / 30) * 100}%` }}
          ></div>
        </div>

        {/* Status Messages */}
        <div className="mt-12 space-y-2 text-sm text-gray-600">
          <p className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            Connexion sécurisée établie
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            Vérification des informations d'identification
          </p>
          <p className="flex items-center justify-center gap-2">
            {countdown > 15 ? (
              <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            ) : (
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            )}
            Préparation de la vérification OTP
          </p>
        </div>
      </div>
    </div>
  );
}
