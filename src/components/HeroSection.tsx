import {ArrowRight, CheckCircle2} from 'lucide-react';
import {useState} from 'react';
import {HERO_METRICS, PATHWAY_PREVIEWS, PathwayPreview} from '../data/gisData';

interface HeroSectionProps {
  onSelectCourseAndScroll: (courseTitle: string) => void;
  onScrollToPrograms: () => void;
}

export function HeroSection({onSelectCourseAndScroll, onScrollToPrograms}: HeroSectionProps) {
  const [activePathwayId, setActivePathwayId] = useState<PathwayPreview['id']>('Teknologi & Digital');

  const activePathway =
    PATHWAY_PREVIEWS.find((item) => item.id === activePathwayId) ?? PATHWAY_PREVIEWS[0];

  return (
    <section
      id="top"
      className="cinematic-hero-glow relative overflow-hidden border-b border-white/10 bg-[#090d16] pt-12 pb-16 sm:pt-16 sm:pb-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Balanced 2-Column Hero Split */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Core Proposition */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#00d2ff] sm:text-sm">
                <span>Global Institute of Studies (GIS)</span>
                <span aria-hidden="true" className="mx-2 text-slate-500">
                  ·
                </span>
                <span className="font-mono tabular-nums text-slate-300">Ditubuhkan Sejak 2001</span>
                <span aria-hidden="true" className="mx-2 text-slate-500">
                  ·
                </span>
                <span className="text-slate-300">Lepasan SPM 17+ Tahun</span>
              </p>

              <h1 className="mt-5 max-w-2xl text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-slate-50 [text-wrap:balance]">
                Laluan Pengajian &amp; Kerjaya Terjamin untuk Anak Anda Selepas SPM.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Sejak tahun 2001, GIS membantu ibu bapa membimbing pelajar berumur 17 tahun ke atas
                menguasai kemahiran praktikal bertaraf industri—supaya mereka bersedia ke alam
                pekerjaan atau ijazah lanjutan dengan keyakinan tinggi.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectCourseAndScroll(activePathway.recommendedCourse)}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#ff7a00] px-6 py-3 text-sm font-semibold text-[#090d16] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#ff8f29] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] cursor-pointer"
              >
                <span>Daftar Minat Anak Anda</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onScrollToPrograms}
                className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-white/15 bg-[#111827] px-5 py-3 text-sm font-medium text-slate-200 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#00d2ff]/50 hover:text-[#00d2ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] cursor-pointer"
              >
                Terokai Program Pengajian
              </button>
            </div>
          </div>

          {/* Right Column: Interactive SPM Pathway Evaluator */}
          <div className="flex lg:col-span-5">
            <div className="flex w-full flex-col justify-between rounded-xl border border-white/10 bg-[#111827] p-6">
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-base font-semibold text-slate-100">
                      Semak Laluan Minat Anak Anda
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Pilih bidang kecenderungan pelajar lepasan SPM (17+ tahun)
                    </p>
                  </div>
                </div>

                {/* Interactive Pathway Tabs */}
                <div
                  role="tablist"
                  aria-label="Bidang minat pelajar"
                  className="mt-4 grid grid-cols-2 gap-2"
                >
                  {PATHWAY_PREVIEWS.map((pathway) => {
                    const isActive = pathway.id === activePathwayId;
                    return (
                      <button
                        key={pathway.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActivePathwayId(pathway.id)}
                        className={`min-h-[40px] rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] ${
                          isActive
                            ? 'border-[#00d2ff]/70 bg-[#00d2ff]/12 text-[#00d2ff]'
                            : 'border-white/10 bg-[#090d16]/70 text-slate-300 hover:border-white/25 hover:text-slate-100'
                        }`}
                      >
                        <span className="block truncate">{pathway.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Pathway Details */}
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-xs font-medium text-[#ff7a00]">Cadangan Program Utama</p>
                    <h3 className="mt-1 text-lg font-bold leading-snug text-slate-100">
                      {activePathway.recommendedCourse}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-2 border-y border-white/10 py-3 text-xs text-slate-300 sm:grid-cols-2">
                    <div>
                      <span className="block text-slate-400">Tempoh Pengajian</span>
                      <span className="mt-0.5 block font-mono tabular-nums font-medium text-slate-100">
                        {activePathway.duration}
                      </span>
                    </div>
                    <div>
                      <span className="block text-slate-400">Fokus Pembelajaran</span>
                      <span className="mt-0.5 block font-mono tabular-nums font-medium text-slate-100">
                        {activePathway.focusSplit}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-300">
                    {activePathway.keyOutcome}
                  </p>

                  <div>
                    <p className="text-xs font-medium text-slate-400">Prospek Kerjaya Graduan</p>
                    <ul className="mt-2 space-y-1.5">
                      {activePathway.sampleRoles.map((role) => (
                        <li key={role} className="flex items-center gap-2 text-xs text-slate-200">
                          <CheckCircle2
                            className="h-3.5 w-3.5 shrink-0 text-[#00d2ff]"
                            aria-hidden="true"
                          />
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectCourseAndScroll(activePathway.recommendedCourse)}
                className="mt-6 flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-[#00d2ff]/40 bg-[#00d2ff]/10 px-4 py-2.5 text-xs font-semibold text-[#00d2ff] transition-colors duration-150 hover:bg-[#00d2ff]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] cursor-pointer"
              >
                <span>Pilih Laluan Ini &amp; Dapatkan Maklumat Yuran</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Institutional Proof Strip Below Hero Split */}
        <div
          data-aos="fade-up"
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {HERO_METRICS.map((metric) => (
            <div key={metric.label} className="bg-[#111827] p-5 sm:p-6">
              <div className="font-mono text-2xl font-semibold tabular-nums text-[#00d2ff] sm:text-3xl">
                {metric.value}
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-100">{metric.label}</div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
