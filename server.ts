import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_DIR = path.resolve(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

const DEFAULT_COORDINATOR_EMAIL = 'norasikinabdhamid@gmail.com';
const DEFAULT_WHATSAPP = process.env.COORDINATOR_WHATSAPP || '60123456789';

interface LeadRecord {
  id: string;
  submittedAt: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  forwardedToSheet: boolean;
  forwardStatus: 'forwarded' | 'local_only' | 'forward_error';
}

interface IntegrationConfig {
  appsScriptUrl: string;
  coordinatorWhatsapp: string;
  updatedAt?: string;
}

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, {recursive: true});
  }
}

function readConfig(): IntegrationConfig {
  ensureDataDir();
  const envUrl = (process.env.GOOGLE_APPS_SCRIPT_URL || '').trim();
  const envWhatsapp = (process.env.COORDINATOR_WHATSAPP || DEFAULT_WHATSAPP).trim();

  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8')) as Partial<IntegrationConfig>;
      return {
        appsScriptUrl: (parsed.appsScriptUrl ?? envUrl).trim(),
        coordinatorWhatsapp: (parsed.coordinatorWhatsapp ?? envWhatsapp).trim() || '60123456789',
        updatedAt: parsed.updatedAt,
      };
    } catch {
      // Fallback to env defaults on malformed file
    }
  }
  return {
    appsScriptUrl: envUrl,
    coordinatorWhatsapp: envWhatsapp || '60123456789',
  };
}

function writeConfig(config: IntegrationConfig): void {
  ensureDataDir();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

function readLeads(): LeadRecord[] {
  ensureDataDir();
  if (!fs.existsSync(LEADS_FILE)) {
    return [];
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
    return Array.isArray(parsed) ? (parsed as LeadRecord[]) : [];
  } catch {
    return [];
  }
}

function writeLeads(leads: LeadRecord[]): void {
  ensureDataDir();
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[\s\-+()]/g, '');
  return digits.length >= 9 && digits.length <= 15 && /^\d+$/.test(digits);
}

function isValidAppsScriptUrl(url: string): boolean {
  if (!url) return true; // allow clearing the URL
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

async function createServer(): Promise<void> {
  const app = express();
  app.use(express.json({limit: '1mb'}));

  app.get('/api/health', (_req, res) => {
    res.json({status: 'ok'});
  });

  app.get('/api/config', (_req, res) => {
    const cfg = readConfig();
    res.json({
      coordinatorEmail: DEFAULT_COORDINATOR_EMAIL,
      coordinatorWhatsapp: cfg.coordinatorWhatsapp,
      hasAppsScriptUrl: Boolean(cfg.appsScriptUrl),
      appsScriptUrl: cfg.appsScriptUrl,
      updatedAt: cfg.updatedAt || null,
    });
  });

  app.post('/api/integration-config', (req, res) => {
    const {appsScriptUrl = '', coordinatorWhatsapp = ''} = req.body as {
      appsScriptUrl?: string;
      coordinatorWhatsapp?: string;
    };

    const trimmedUrl = String(appsScriptUrl).trim();
    const cleanedWhatsapp = String(coordinatorWhatsapp).replace(/[^\d]/g, '') || DEFAULT_WHATSAPP;

    if (!isValidAppsScriptUrl(trimmedUrl)) {
      res.status(400).json({
        error: 'URL Web App Google Apps Script mestilah bermula dengan https:// yang sah.',
      });
      return;
    }

    if (cleanedWhatsapp.length < 9 || cleanedWhatsapp.length > 15) {
      res.status(400).json({
        error: 'Nombor WhatsApp penyelaras tidak sah (contoh: 60123456789).',
      });
      return;
    }

    const updated: IntegrationConfig = {
      appsScriptUrl: trimmedUrl,
      coordinatorWhatsapp: cleanedWhatsapp,
      updatedAt: new Date().toISOString(),
    };

    writeConfig(updated);
    res.json({
      success: true,
      coordinatorEmail: DEFAULT_COORDINATOR_EMAIL,
      coordinatorWhatsapp: updated.coordinatorWhatsapp,
      hasAppsScriptUrl: Boolean(updated.appsScriptUrl),
      appsScriptUrl: updated.appsScriptUrl,
      updatedAt: updated.updatedAt,
    });
  });

  app.get('/api/leads', (_req, res) => {
    const leads = readLeads();
    res.json({leads});
  });

  app.post('/api/leads', async (req, res) => {
    const {name, phone, email, course} = req.body as {
      name?: string;
      phone?: string;
      email?: string;
      course?: string;
    };

    const cleanName = String(name || '').trim();
    const cleanPhone = String(phone || '').trim();
    const cleanEmail = String(email || '').trim();
    const cleanCourse = String(course || '').trim();

    if (cleanName.length < 2) {
      res.status(400).json({error: 'Sila masukkan nama penuh anda (sekurang-kurangnya 2 aksara).'});
      return;
    }
    if (!isValidPhone(cleanPhone)) {
      res.status(400).json({error: 'Sila masukkan nombor telefon yang sah (contoh: 012-3456789).'});
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      res.status(400).json({error: 'Sila masukkan alamat emel yang sah.'});
      return;
    }
    if (!cleanCourse) {
      res.status(400).json({error: 'Sila pilih kursus atau bidang pengajian yang diminati.'});
      return;
    }

    const cfg = readConfig();
    let forwardedToSheet = false;
    let forwardStatus: LeadRecord['forwardStatus'] = 'local_only';
    let forwardNote = 'Rekod disimpan dalam pangkalan data pelayan.';

    if (cfg.appsScriptUrl) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);
        const gsResponse = await fetch(cfg.appsScriptUrl, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: cleanName,
            phone: cleanPhone,
            email: cleanEmail,
            course: cleanCourse,
          }),
          redirect: 'follow',
          signal: controller.signal,
        });
        clearTimeout(timer);

        if (gsResponse.ok) {
          forwardedToSheet = true;
          forwardStatus = 'forwarded';
          forwardNote = `Rekod berjaya dihantar ke Google Sheet & emel notifikasi kepada ${DEFAULT_COORDINATOR_EMAIL}.`;
        } else {
          forwardStatus = 'forward_error';
          forwardNote =
            'Rekod disimpan secara tempatan, namun penghantaran ke URL Google Apps Script tidak berjaya.';
        }
      } catch {
        forwardStatus = 'forward_error';
        forwardNote =
          'Rekod disimpan secara tempatan. Sambungan ke Google Apps Script gagal atau tamat masa.';
      }
    }

    const newLead: LeadRecord = {
      id: `GIS-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      course: cleanCourse,
      forwardedToSheet,
      forwardStatus,
    };

    const existing = readLeads();
    existing.unshift(newLead);
    writeLeads(existing.slice(0, 200));

    res.status(201).json({
      success: true,
      lead: newLead,
      forwardedToSheet,
      forwardStatus,
      message: forwardNote,
      coordinatorEmail: DEFAULT_COORDINATOR_EMAIL,
      coordinatorWhatsapp: cfg.coordinatorWhatsapp,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GIS Landing Page server running on http://localhost:${PORT}`);
  });
}

createServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
