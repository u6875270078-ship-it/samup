import { useEffect } from "react";
import { Link } from "wouter";
import { XCircle } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

export default function OtpError() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "OTP Verification Failed";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        {/* SumUp Logo Header */}
        <div className="flex items-center justify-center mb-16">
          <div className="h-8 w-8 bg-black rounded-md flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="ml-3 text-2xl font-normal">sumup®</span>
        </div>

        {/* Failure Icon */}
        <div className="flex justify-center mb-8">
          <XCircle className="w-20 h-20 text-red-500" data-testid="icon-failure" strokeWidth={1.5} />
        </div>

        {/* Failure Message */}
        <h1 className="text-5xl font-semibold mb-8 text-black" data-testid="text-title">
          Invalid Code
        </h1>
        
        <p className="text-lg mb-4 text-black" data-testid="text-description">
          The verification code you entered is incorrect.
        </p>

        <p className="text-base mb-12 text-gray-600" data-testid="text-hint">
          Please check your code and try again.
        </p>

        {/* Action Button */}
        <Link href="/otp">
          <button
            type="button"
            className="px-10 py-5 text-lg font-medium bg-black text-white rounded-lg hover:opacity-90 transition-opacity"
            data-testid="button-try-again"
          >
            Try Again
          </button>
        </Link>
      </div>
    </div>
  );
}
