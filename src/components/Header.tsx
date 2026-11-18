import {Menu, X} from 'lucide-react';
import {useState} from 'react';
import {BrandLogo} from './BrandLogo';

interface HeaderProps {
  onNavigateToForm: () => void;
}

const NAV_ITEMS = [
  {label: 'Program', href: '#program'},
  {label: 'Kelebihan', href: '#kelebihan'},
  {label: 'Pengiktirafan', href: '#pengiktirafan'},
  {label: 'Pendaftaran', href: '#daftar'},
];

export function Header({onNavigateToForm}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCtaClick = () => {
    setMobileOpen(false);
    onNavigateToForm();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090d16]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] rounded-md"
        >
          <BrandLogo className="h-9 w-9" />
          <span className="font-display text-base font-bold tracking-tight text-slate-100 sm:text-lg">
            Global Institute of Studies
          </span>
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 text-sm font-medium text-slate-300 transition-colors duration-150 hover:text-[#00d2ff] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleCtaClick}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#ff7a00] px-4 py-2 text-sm font-semibold text-[#090d16] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#ff8f29] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] cursor-pointer"
          >
            Mohon Sekarang
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#111827] text-slate-200 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#090d16] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Navigasi mudah alih">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-slate-200 hover:bg-[#111827] hover:text-[#00d2ff]"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleCtaClick}
              className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#ff7a00] px-4 py-2.5 text-sm font-semibold text-[#090d16] hover:bg-[#ff8f29] cursor-pointer"
            >
              Mohon Sekarang
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
