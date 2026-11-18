import {PARENT_ADVANTAGES, PARENT_TESTIMONIALS} from '../data/gisData';

export function ParentAdvantagesSection() {
  return (
    <>
      {/* Advantages Section */}
      <section id="kelebihan" className="border-b border-white/10 bg-[#090d16] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#ff7a00] sm:text-sm">
              Pendekatan Pendidikan Berfokuskan Ibu Bapa &amp; Pelajar
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl [text-wrap:balance]">
              Mengapa Ibu Bapa Mempercayai Global Institute of Studies Sejak 2001
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              Keputusan memilih institusi selepas SPM menentukan hala tuju kerjaya anak anda. Kami
              mengutamakan ketelusan akademik, disiplin pembelajaran, dan bimbingan terus kepada
              keluarga.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {PARENT_ADVANTAGES.map((item, idx) => (
              <div
                key={item.number}
                data-aos="fade-up"
                data-aos-delay={idx * 70}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#111827] p-6 sm:p-7"
              >
                <div>
                  <span className="font-mono text-sm font-semibold text-[#00d2ff]">
                    {item.number}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-slate-100">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.description}</p>
                </div>
                <p className="mt-5 border-t border-white/10 pt-3 text-xs font-medium text-slate-400">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof & Attributable Parent Testimonials Section (Adjacent to Claims) */}
      <section
        id="pengiktirafan"
        className="cinematic-section-glow border-b border-white/10 bg-[#090d16] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#00d2ff] sm:text-sm">
              Pengalaman Sebenar Keluarga Pelajar GIS
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl [text-wrap:balance]">
              Bagaimana Pelajar Lepasan SPM Membina Masa Depan di GIS
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PARENT_TESTIMONIALS.map((item, idx) => (
              <figure
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#111827] p-6"
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-slate-400">Situasi Awal</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">{item.before}</p>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs font-medium text-[#00d2ff]">Perubahan &amp; Hasil</p>
                    <blockquote className="mt-1 text-sm leading-relaxed text-slate-100">
                      “{item.outcome}”
                    </blockquote>
                  </div>
                </div>

                <figcaption className="mt-6 border-t border-white/10 pt-4">
                  <div className="text-sm font-semibold text-slate-100">{item.parentName}</div>
                  <div className="mt-0.5 text-xs text-slate-400">{item.context}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
