import {AlertCircle, ArrowRight, CheckCircle2, Mail, ShieldCheck} from 'lucide-react';
import {FormEvent, useEffect, useState} from 'react';
import {INSTITUTION_INFO, STUDY_PROGRAMS} from '../data/gisData';

export interface SubmittedLeadPayload {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  forwardedToSheet: boolean;
  forwardStatus: 'forwarded' | 'local_only' | 'forward_error';
  message: string;
  coordinatorEmail: string;
  coordinatorWhatsapp: string;
}

interface LeadRegistrationSectionProps {
  selectedCourse: string;
  onCourseChange: (course: string) => void;
  onSubmitSuccess: (payload: SubmittedLeadPayload) => void;
}

export function LeadRegistrationSection({
  selectedCourse,
  onCourseChange,
  onSubmitSuccess,
}: LeadRegistrationSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState(selectedCourse || STUDY_PROGRAMS[0].title);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCourse) {
      setCourse(selectedCourse);
    }
  }, [selectedCourse]);

  const validateClient = (): string | null => {
    if (name.trim().length < 2) {
      return 'Sila masukkan nama penuh ibu bapa atau pelajar.';
    }
    const digits = phone.replace(/[\s\-+()]/g, '');
    if (digits.length < 9 || digits.length > 15 || !/^\d+$/.test(digits)) {
      return 'Sila masukkan nombor telefon WhatsApp yang sah (contoh: 012-3456789).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return 'Sila masukkan alamat emel yang sah untuk penghantaran maklumat kursus.';
    }
    if (!course.trim()) {
      return 'Sila pilih kursus yang diminati.';
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const validationError = validateClient();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          course: course.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.error || 'Pendaftaran gagal dihantar. Sila semak maklumat anda.');
        return;
      }

      onSubmitSuccess({
        id: data.lead.id,
        name: data.lead.name,
        phone: data.lead.phone,
        email: data.lead.email,
        course: data.lead.course,
        forwardedToSheet: Boolean(data.forwardedToSheet),
        forwardStatus: data.forwardStatus,
        message: data.message,
        coordinatorEmail: data.coordinatorEmail,
        coordinatorWhatsapp: data.coordinatorWhatsapp,
      });

      setName('');
      setPhone('');
      setEmail('');
    } catch {
      setErrorMsg('Sambungan ke pelayan terganggu. Sila cuba sebentar lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="daftar"
      className="cinematic-hero-glow border-b border-white/10 bg-[#090d16] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Consultation Info for Parents */}
          <div data-aos="fade-up" className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wide text-[#ff7a00] sm:text-sm">
              Konsultasi Pengambilan Terkini
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl [text-wrap:balance]">
              Daftar Minat &amp; Dapatkan Khidmat Nasihat Penyelaras GIS
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Isi borang di sebelah untuk menerima brosur kursus, pecahan struktur yuran, pilihan
              bantuan pendidikan, serta jadual sesi penerangan khas untuk ibu bapa dan anak lepasan
              SPM.
            </p>

            <div className="mt-8 space-y-5 border-t border-white/10 pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00d2ff]" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">
                    Semakan Kelayakan SPM Secara Percuma
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    Penyelaras akan menyemak keputusan SPM anak anda dan mencadangkan laluan diploma
                    atau sijil yang paling sepadan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#00d2ff]" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">
                    Notifikasi Terus kepada Penyelaras Akademik
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    Setiap permohonan disalurkan terus ke rekod pendaftaran rasmi dan dipantau oleh
                    penyelaras ({INSTITUTION_INFO.coordinatorEmail}).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#00d2ff]" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">
                    Terus Berhubung Melalui WhatsApp Automatik
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    Selepas menghantar borang, anda boleh terus memulakan perbualan WhatsApp dengan
                    butiran lengkap yang telah diisi secara automatik.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Lead Form */}
          <div data-aos="fade-up" data-aos-delay="100" className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-xl border border-white/10 bg-[#111827] p-6 sm:p-8"
            >
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-slate-100">Borang Pendaftaran Minat Pelajar</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Lengkapkan 4 maklumat ringkas di bawah. Tiada komitmen bayaran diperlukan.
                </p>
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-2.5 rounded-lg border border-red-400/40 bg-red-500/10 p-3.5 text-sm text-red-200"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="mt-6 space-y-5">
                <div>
                  <label htmlFor="lead-name" className="block text-sm font-medium text-slate-200">
                    Nama Penuh Ibu Bapa / Penjaga atau Pelajar
                  </label>
                  <input
                    id="lead-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Pn. Norazlina binti Ahmad"
                    className="mt-2 block min-h-[44px] w-full rounded-lg border border-white/15 bg-[#090d16] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00d2ff] focus:outline-none focus:ring-1 focus:ring-[#00d2ff]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lead-phone" className="block text-sm font-medium text-slate-200">
                      Nombor Telefon / WhatsApp
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 012-3456789"
                      className="mt-2 block min-h-[44px] w-full rounded-lg border border-white/15 bg-[#090d16] px-4 py-2.5 font-mono text-sm text-slate-100 placeholder:font-sans placeholder:text-slate-500 focus:border-[#00d2ff] focus:outline-none focus:ring-1 focus:ring-[#00d2ff]"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-email" className="block text-sm font-medium text-slate-200">
                      Alamat Emel
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Contoh: keluarga@emel.com"
                      className="mt-2 block min-h-[44px] w-full rounded-lg border border-white/15 bg-[#090d16] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00d2ff] focus:outline-none focus:ring-1 focus:ring-[#00d2ff]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lead-course" className="block text-sm font-medium text-slate-200">
                    Kursus Pilihan (Lepasan SPM 17+ Tahun)
                  </label>
                  <select
                    id="lead-course"
                    name="course"
                    required
                    value={course}
                    onChange={(e) => {
                      setCourse(e.target.value);
                      onCourseChange(e.target.value);
                    }}
                    className="mt-2 block min-h-[44px] w-full rounded-lg border border-white/15 bg-[#090d16] px-4 py-2.5 text-sm text-slate-100 focus:border-[#00d2ff] focus:outline-none focus:ring-1 focus:ring-[#00d2ff]"
                  >
                    {STUDY_PROGRAMS.map((item) => (
                      <option key={item.id} value={item.title}>
                        {item.title} ({item.duration})
                      </option>
                    ))}
                    <option value="Perlukan Cadangan Penyelaras Akademik">
                      Belum pasti — Perlukan Cadangan Penyelaras Akademik
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#ff7a00] px-6 py-3 text-sm font-semibold text-[#090d16] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#ff8f29] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] cursor-pointer"
                >
                  <span>{submitting ? 'Sedang Menghantar...' : 'Hantar Pendaftaran Minat'}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="text-xs text-slate-400">
                  Data dilindungi &amp; digunakan khusus untuk konsultasi GIS.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
