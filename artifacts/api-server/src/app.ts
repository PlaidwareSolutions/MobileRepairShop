import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import webhooksRouter from "./routes/webhooks";
import { logger } from "./lib/logger";

const app: Express = express();

// Trust exactly one upstream proxy hop (the Replit edge proxy that fronts
// every workspace and deployment). With this set, req.ip resolves to the
// real client IP from X-Forwarded-For so per-IP rate limiting actually
// throttles individual abusers instead of every visitor sharing the proxy IP.
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());

// Webhooks must be mounted BEFORE express.json() so handlers can access raw bodies
// for signature verification (Resend uses Svix; Telnyx uses ed25519).
app.use("/api/webhooks", webhooksRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
