import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- TAMV API ROUTES ---

  // MSR (Master Sovereign Record) API
  const MSR_FILE = path.join(__dirname, "msr_records.json");
  if (!fs.existsSync(MSR_FILE)) {
    fs.writeFileSync(MSR_FILE, JSON.stringify([]));
  }

  app.get("/api/msr", (req, res) => {
    const records = JSON.parse(fs.readFileSync(MSR_FILE, "utf-8"));
    res.json(records);
  });

  app.post("/api/msr", (req, res) => {
    const records = JSON.parse(fs.readFileSync(MSR_FILE, "utf-8"));
    const newRecord = {
      id: `msr-${Date.now()}`,
      timestamp: Date.now(),
      ...req.body
    };
    records.push(newRecord);
    fs.writeFileSync(MSR_FILE, JSON.stringify(records, null, 2));
    res.status(201).json(newRecord);
  });

  // BookPI (Evidence) API
  const BOOKPI_FILE = path.join(__dirname, "bookpi_evidence.json");
  if (!fs.existsSync(BOOKPI_FILE)) {
    fs.writeFileSync(BOOKPI_FILE, JSON.stringify([]));
  }

  app.get("/api/bookpi", (req, res) => {
    const evidence = JSON.parse(fs.readFileSync(BOOKPI_FILE, "utf-8"));
    res.json(evidence);
  });

  app.post("/api/bookpi", (req, res) => {
    const evidence = JSON.parse(fs.readFileSync(BOOKPI_FILE, "utf-8"));
    const newEvidence = {
      id: `ev-${Date.now()}`,
      timestamp: Date.now(),
      ...req.body
    };
    evidence.push(newEvidence);
    fs.writeFileSync(BOOKPI_FILE, JSON.stringify(evidence, null, 2));
    res.status(201).json(newEvidence);
  });

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", system: "TAMV DM-X4", version: "0.1" });
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TAMV Core Server running on http://localhost:${PORT}`);
  });
}

startServer();
