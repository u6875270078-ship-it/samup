import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { startTelegramBot } from "./telegram-bot";

const app = express();

declare module "http" {
  interface IncomingMessage { rawBody: unknown }
}

app.use(express.json({
  verify: (req: any, _res, buf) => { req.rawBody = buf; }
}));
app.use(express.urlencoded({ extended: false }));

// Logging للـ API مع التقاط body json إن وجد
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJson: Record<string, any> | undefined;

  const originalJson = res.json.bind(res);
  (res as any).json = (body: any) => {
    capturedJson = body;
    return originalJson(body);
  };

  res.on("finish", () => {
    if (path.startsWith("/api")) {
      const duration = Date.now() - start;
      let line = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJson) line += ` :: ${JSON.stringify(capturedJson)}`;
      if (line.length > 200) line = line.slice(0, 199) + "…";
      log(line);
    }
  });

  next();
});

(async () => {
  // registerRoutes يُرجّع http.Server
  const server = await registerRoutes(app);

  // Error handler JSON
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // المنفذ والمضيف (ودّيًا 127.0.0.1 على ويندوز)
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.HOST || "0.0.0.0";

  // ملاحظة: createServer غير ضروري إن كان registerRoutes يُرجّع server
  // هنا نفترض أنه يُعيد http.Server جاهز للاستماع
  server.listen({ port, host }, () => {
    log(`serving on port ${port}`);
    startTelegramBot();
  });
})();
