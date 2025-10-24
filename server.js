import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";
import serveStatic from "serve-static";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Static site (serves index.html and any local assets in /public)
const publicDir = path.join(__dirname, "public");
app.use(serveStatic(publicDir, { index: false }));

// ---- (Optional) API proxy to your ACENji test backend
// e.g. TARGET_API=https://test.acenji.com (or your Render/Test server)
const targetApi = process.env.TARGET_API;
if (targetApi) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: targetApi,
      changeOrigin: true,
      // If the target uses self-signed TLS in dev, uncomment next line:
      // secure: false,
      onProxyReq(proxyReq, req) {
        // Forward client IP/user agent etc. if helpful for logs
        proxyReq.setHeader("X-Forwarded-Host", req.headers.host || "");
      }
    })
  );
  console.log(`Proxy enabled: /api  →  ${targetApi}`);
} else {
  console.log("No TARGET_API set. /api requests will 404 locally.");
}

// ---- Single Page App fallback to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`ACENji local server running: http://localhost:${PORT}/test/free`);
});
