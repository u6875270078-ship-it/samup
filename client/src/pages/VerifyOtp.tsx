import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function VerifyOtp() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Get userId from URL query params
    const params = new URLSearchParams(window.location.search);
    const userIdParam = params.get("userId");
    
    if (!userIdParam) {
      toast({
        title: "Error",
        description: "Invalid access. Please login first.",
        variant: "destructive",
      });
      setLocation("/login");
    } else {
      setUserId(userIdParam);
    }
  }, [setLocation, toast]);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/auth/verify-otp", { userId, code: otp });
      const data = await response.json();

      if (data.success) {
        toast({
          title: "Login successful!",
          description: `Welcome, ${data.user.username}!`,
        });
        
        // Redirect to homepage
        setLocation("/");
      } else {
        toast({
          title: "Verification failed",
          description: data.error || "Invalid or expired OTP",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/20 p-4">
      <Card className="w-full max-w-md" data-testid="card-verify-otp">
        <CardHeader>
          <CardTitle className="text-2xl font-bold" data-testid="text-otp-title">Verify OTP</CardTitle>
          <CardDescription data-testid="text-otp-description">
            Enter the 6-digit OTP code sent to your Telegram. The code expires in 5 minutes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                required
                className="text-center text-2xl tracking-widest"
                data-testid="input-otp"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || otp.length !== 6}
              data-testid="button-verify-otp"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <a
                href="/login"
                className="text-primary hover:underline font-medium"
                data-testid="link-back-login"
              >
                Back to login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
