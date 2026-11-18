import {CheckCircle2, ExternalLink, MessageCircle, X} from 'lucide-react';
import {useEffect} from 'react';
import {SubmittedLeadPayload} from './LeadRegistrationSection';

interface SuccessModalProps {
  lead: SubmittedLeadPayload | null;
  onClose: () => void;
}

export function SuccessModal({lead, onClose}: SuccessModalProps) {
  useEffect(() => {
    if (!lead) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lead, onClose]);

  if (!lead) return null;

  const whatsappText = [
    'Saya berminat dengan kursus GIS',
    '',
    `Nama: ${lead.name}`,
    `No Tel: ${lead.phone}`,
    `Emel: ${lead.email}`,
    `Kursus: ${lead.course}`,
  ].join('\n');

  const cleanPhone = (lead.coordinatorWhatsapp || '60123456789').replace(/[^\d]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl border border-white/15 bg-[#111827] p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup paparan pengesahan"
          className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#090d16] text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#00d2ff]/15 text-[#00d2ff]">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-[#00d2ff]">Pendaftaran Minat Diterima</p>
            <h2 id="success-modal-title" className="text-lg font-bold text-slate-100">
              Terima Kasih, {lead.name}
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-300">
          Maklumat pendaftaran minat anda telah direkodkan untuk perhatian penyelaras akademik GIS (
          <span className="text-slate-100">{lead.coordinatorEmail}</span>).
        </p>

        <div className="mt-5 rounded-lg border border-white/10 bg-[#090d16] p-4 text-xs text-slate-300 space-y-2">
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Nama</span>
            <span className="font-medium text-slate-100 text-right">{lead.name}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">No. Telefon</span>
            <span className="font-mono tabular-nums text-slate-100 text-right">{lead.phone}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Emel</span>
            <span className="text-slate-100 text-right break-all">{lead.email}</span>
          </div>
          <div className="flex justify-between gap-4 border-t border-white/10 pt-2">
            <span className="text-slate-400 shrink-0">Kursus Pilihan</span>
            <span className="font-medium text-[#ff7a00] text-right">{lead.course}</span>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-slate-400">{lead.message}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#ff7a00] px-5 py-2.5 text-sm font-semibold text-[#090d16] transition-colors duration-150 hover:bg-[#ff8f29] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Teruskan ke WhatsApp Rasmi</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-white/15 bg-[#090d16] px-5 py-2.5 text-sm font-medium text-slate-200 hover:border-white/30 cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
