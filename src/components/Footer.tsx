import {INSTITUTION_INFO} from '../data/gisData';
import {BrandLogo} from './BrandLogo';

interface FooterProps {
  onOpenIntegrationModal: () => void;
}

export function Footer({onOpenIntegrationModal}: FooterProps) {
  return (
    <footer className="bg-[#090d16] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-start">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <BrandLogo className="h-9 w-9" />
              <div>
                <div className="font-display text-base font-bold text-slate-100">
                  {INSTITUTION_INFO.name} ({INSTITUTION_INFO.shortName})
                </div>
                <div className="text-xs text-slate-400">
                  Ditubuhkan Sejak {INSTITUTION_INFO.foundedYear} · Laluan Lepasan SPM (17+ Tahun)
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Pusat pengajian tinggi dan kemahiran praktikal yang komited membantu ibu bapa membina
              laluan kerjaya stabil untuk generasi lepasan sekolah menengah.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-xs sm:gap-12">
            <div>
              <h3 className="font-semibold text-slate-200">Navigasi</h3>
              <ul className="mt-3 space-y-2 text-slate-400">
                <li>
                  <a href="#program" className="hover:text-[#00d2ff]">
                    Program Pengajian
                  </a>
                </li>
                <li>
                  <a href="#kelebihan" className="hover:text-[#00d2ff]">
                    Kelebihan GIS
                  </a>
                </li>
                <li>
                  <a href="#pengiktirafan" className="hover:text-[#00d2ff]">
                    Pengalaman Ibu Bapa
                  </a>
                </li>
                <li>
                  <a href="#daftar" className="hover:text-[#00d2ff]">
                    Borang Pendaftaran
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-200">Penyelaras Akademik</h3>
              <ul className="mt-3 space-y-2 text-slate-400">
                <li>
                  <a
                    href={`mailto:${INSTITUTION_INFO.coordinatorEmail}`}
                    className="hover:text-[#00d2ff] break-all"
                  >
                    {INSTITUTION_INFO.coordinatorEmail}
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenIntegrationModal}
                    className="text-left text-slate-400 underline-offset-4 hover:text-[#00d2ff] hover:underline cursor-pointer"
                  >
                    Tetapan Google Sheets &amp; Admin
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {INSTITUTION_INFO.name} (GIS). Hak cipta terpelihara.
          </p>
          <p>Sejak 2001 · Pendidikan Teknikal, Vokasional &amp; Profesional</p>
        </div>
      </div>
    </footer>
  );
}
