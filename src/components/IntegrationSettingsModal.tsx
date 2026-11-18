import {Check, Copy, Database, X} from 'lucide-react';
import {FormEvent, useEffect, useState} from 'react';
import {APPS_SCRIPT_SNIPPET, INSTITUTION_INFO} from '../data/gisData';

interface LeadSummary {
  id: string;
  submittedAt: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  forwardedToSheet: boolean;
}

interface IntegrationSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function IntegrationSettingsModal({open, onClose}: IntegrationSettingsModalProps) {
  const [appsScriptUrl, setAppsScriptUrl] = useState('');
  const [coordinatorWhatsapp, setCoordinatorWhatsapp] = useState('60123456789');
  const [leads, setLeads] = useState<LeadSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setStatusMessage(null);
    setErrorMessage(null);

    Promise.all([fetch('/api/config').then((r) => r.json()), fetch('/api/leads').then((r) => r.json())])
      .then(([cfg, leadsRes]) => {
        setAppsScriptUrl(cfg.appsScriptUrl || '');
        setCoordinatorWhatsapp(cfg.coordinatorWhatsapp || '60123456789');
        setLeads(Array.isArray(leadsRes.leads) ? leadsRes.leads : []);
      })
      .catch(() => {
        setErrorMessage('Gagal memuatkan tetapan integrasi.');
      })
      .finally(() => setLoading(false));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/integration-config', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          appsScriptUrl: appsScriptUrl.trim(),
          coordinatorWhatsapp: coordinatorWhatsapp.trim(),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.error || 'Gagal menyimpan tetapan.');
        return;
      }
      setStatusMessage(
        data.hasAppsScriptUrl
          ? 'Tetapan berjaya disimpan. Setiap borang baharu akan dihantar ke Google Apps Script anda.'
          : 'Tetapan WhatsApp disimpan. URL Google Apps Script dikosongkan (mod simpanan pelayan).'
      );
    } catch {
      setErrorMessage('Ralat rangkaian semasa menyimpan tetapan.');
    } finally {
      setSaving(false);
    }
  };

  const handleCopySnippet = async () => {
    try {
      await navigator.clipboard.writeText(APPS_SCRIPT_SNIPPET);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      setErrorMessage('Salinan automatik tidak disokong pelayar ini.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="integration-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-white/15 bg-[#111827] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#00d2ff]/15 text-[#00d2ff]">
              <Database className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h2 id="integration-modal-title" className="text-base font-bold text-slate-100">
                Integrasi Google Sheets &amp; WhatsApp Penyelaras
              </h2>
              <p className="text-xs text-slate-400">
                Konfigurasi pentadbir untuk {INSTITUTION_INFO.coordinatorEmail}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup tetapan integrasi"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#090d16] text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {loading ? (
          <p className="py-8 text-center text-sm text-slate-400">Memuatkan konfigurasi...</p>
        ) : (
          <div className="mt-5 space-y-6">
            <form onSubmit={handleSave} className="space-y-4">
              {statusMessage && (
                <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-3 text-xs text-emerald-200">
                  {statusMessage}
                </div>
              )}
              {errorMessage && (
                <div className="rounded-lg border border-red-400/40 bg-red-500/10 p-3 text-xs text-red-200">
                  {errorMessage}
                </div>
              )}

              <div>
                <label htmlFor="cfg-apps-script" className="block text-xs font-medium text-slate-200">
                  URL Web App Google Apps Script (doPost)
                </label>
                <input
                  id="cfg-apps-script"
                  type="url"
                  value={appsScriptUrl}
                  onChange={(e) => setAppsScriptUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="mt-1.5 block min-h-[42px] w-full rounded-lg border border-white/15 bg-[#090d16] px-3 py-2 font-mono text-xs text-slate-100 placeholder:text-slate-500 focus:border-[#00d2ff] focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Setiap penyerahan borang akan menghantar JSON ke URL ini untuk rekod Google Sheet
                  &amp; emel ke {INSTITUTION_INFO.coordinatorEmail}.
                </p>
              </div>

              <div>
                <label htmlFor="cfg-wa" className="block text-xs font-medium text-slate-200">
                  Nombor WhatsApp Penyelaras (format antarabangsa tanpa +)
                </label>
                <input
                  id="cfg-wa"
                  type="text"
                  value={coordinatorWhatsapp}
                  onChange={(e) => setCoordinatorWhatsapp(e.target.value)}
                  placeholder="60123456789"
                  className="mt-1.5 block min-h-[42px] w-full rounded-lg border border-white/15 bg-[#090d16] px-3 py-2 font-mono text-xs text-slate-100 placeholder:text-slate-500 focus:border-[#00d2ff] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#00d2ff] px-4 py-2 text-xs font-semibold text-[#090d16] hover:bg-[#38dcff] disabled:opacity-60 cursor-pointer"
              >
                {saving ? 'Menyimpan...' : 'Simpan Tetapan Integrasi'}
              </button>
            </form>

            {/* Apps Script Code Reference */}
            <div className="border-t border-white/10 pt-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xs font-semibold text-slate-200">
                  Kod Google Apps Script (`Database Leads GIS`)
                </h3>
                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-[#090d16] px-2.5 py-1 text-xs text-slate-200 hover:border-[#00d2ff] cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Disalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Salin Kod</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="mt-2 max-h-44 overflow-auto rounded-lg border border-white/10 bg-[#090d16] p-3 font-mono text-[11px] leading-relaxed text-slate-300">
                <code>{APPS_SCRIPT_SNIPPET}</code>
              </pre>
            </div>

            {/* Saved Leads History */}
            <div className="border-t border-white/10 pt-5">
              <h3 className="text-xs font-semibold text-slate-200">
                Rekod Pendaftaran Terkini ({leads.length})
              </h3>
              {leads.length === 0 ? (
                <p className="mt-2 text-xs text-slate-400">Belum ada pendaftaran direkodkan lagi.</p>
              ) : (
                <div className="mt-2 max-h-48 overflow-auto rounded-lg border border-white/10 bg-[#090d16]">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-white/10 text-slate-400">
                      <tr>
                        <th className="px-3 py-2 font-medium">Nama</th>
                        <th className="px-3 py-2 font-medium">No. Tel</th>
                        <th className="px-3 py-2 font-medium">Kursus</th>
                        <th className="px-3 py-2 font-medium">Sheet</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-slate-200">
                      {leads.slice(0, 15).map((item) => (
                        <tr key={item.id}>
                          <td className="px-3 py-2 font-medium">{item.name}</td>
                          <td className="px-3 py-2 font-mono tabular-nums">{item.phone}</td>
                          <td className="px-3 py-2 text-slate-300">{item.course}</td>
                          <td className="px-3 py-2 text-slate-400">
                            {item.forwardedToSheet ? 'Dihantar' : 'Tempatan'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
