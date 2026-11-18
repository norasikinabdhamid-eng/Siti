import {ArrowUpRight} from 'lucide-react';
import {useState} from 'react';
import {ProgramCategory, STUDY_PROGRAMS} from '../data/gisData';

interface ProgramsSectionProps {
  selectedCourse: string;
  onSelectCourse: (courseTitle: string) => void;
}

const CATEGORIES: ProgramCategory[] = [
  'Semua',
  'Teknologi & Digital',
  'Perniagaan & Pengurusan',
  'Hospitaliti & Kulinari',
  'Kejuruteraan Teknikal',
];

export function ProgramsSection({selectedCourse, onSelectCourse}: ProgramsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProgramCategory>('Semua');

  const filteredPrograms =
    activeCategory === 'Semua'
      ? STUDY_PROGRAMS
      : STUDY_PROGRAMS.filter((program) => program.category === activeCategory);

  return (
    <section
      id="program"
      className="cinematic-section-glow border-b border-white/10 bg-[#090d16] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          data-aos="fade-up"
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#00d2ff] sm:text-sm">
              Katalog Pengajian Lepasan SPM · Kemasukan Terbuka 17+ Tahun
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl [text-wrap:balance]">
              Program Diploma &amp; Sijil Kemahiran Berpandukan Keperluan Majikan
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              Setiap program dirangka dengan keseimbangan latihan amali, bimbingan pensyarah, dan
              penempatan industri supaya anak anda tidak sekadar memiliki sijil, tetapi bersedia
              bekerja.
            </p>
          </div>
        </div>

        {/* Interactive Category Filter Bar */}
        <div
          data-aos="fade-up"
          role="tablist"
          aria-label="Penapis bidang pengajian"
          className="mt-8 flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-[#111827] p-1.5"
        >
          {CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(category)}
                className={`min-h-[40px] rounded-lg px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] ${
                  isSelected
                    ? 'bg-[#00d2ff] text-[#090d16] font-semibold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-slate-100'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {filteredPrograms.map((program, idx) => {
            const isMarquee = activeCategory === 'Semua' && program.featured;
            const isSelectedCourse = selectedCourse === program.title;

            return (
              <article
                key={program.id}
                data-aos="fade-up"
                data-aos-delay={Math.min(idx * 60, 240)}
                className={`flex flex-col justify-between rounded-xl border p-6 transition-colors duration-150 ${
                  isMarquee ? 'lg:col-span-2' : 'lg:col-span-1'
                } ${
                  isSelectedCourse
                    ? 'border-[#ff7a00]/70 bg-[#111827]'
                    : 'border-white/10 bg-[#111827] hover:border-white/25'
                }`}
              >
                <div>
                  {/* Unboxed Editorial Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono font-semibold text-[#00d2ff]">{program.code}</span>
                    <span aria-hidden="true">·</span>
                    <span>{program.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums text-slate-300">{program.duration}</span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold leading-snug text-slate-100 sm:text-xl">
                    {program.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{program.summary}</p>

                  {/* Clean Metadata Strip */}
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/10 pt-4 text-xs text-slate-400">
                    <span>
                      Syarat: <strong className="font-medium text-slate-200">{program.entryRequirement}</strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      Mod: <strong className="font-medium text-slate-200">{program.practicalRatio}</strong>
                    </span>
                  </div>

                  {/* Career Outcomes */}
                  <div className="mt-4">
                    <p className="text-xs font-medium text-slate-400">Laluan Kerjaya:</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-200">
                      {program.careerOutcomes.join(' · ')}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectCourse(program.title)}
                    className={`inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] sm:w-auto ${
                      isSelectedCourse
                        ? 'border-[#ff7a00] bg-[#ff7a00] text-[#090d16]'
                        : 'border-white/15 bg-[#090d16] text-slate-100 hover:border-[#00d2ff]/60 hover:text-[#00d2ff]'
                    }`}
                  >
                    <span>{isSelectedCourse ? 'Kursus Dipilih — Daftar Sekarang' : 'Pilih Kursus Ini'}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
