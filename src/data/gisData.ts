export type ProgramCategory =
  | 'Semua'
  | 'Teknologi & Digital'
  | 'Perniagaan & Pengurusan'
  | 'Hospitaliti & Kulinari'
  | 'Kejuruteraan Teknikal';

export interface StudyProgram {
  id: string;
  code: string;
  title: string;
  category: Exclude<ProgramCategory, 'Semua'>;
  duration: string;
  entryRequirement: string;
  practicalRatio: string;
  summary: string;
  careerOutcomes: string[];
  featured?: boolean;
}

export interface PathwayPreview {
  id: Exclude<ProgramCategory, 'Semua'>;
  label: string;
  recommendedCourse: string;
  duration: string;
  minAge: string;
  focusSplit: string;
  keyOutcome: string;
  sampleRoles: string[];
}

export interface ParentAdvantage {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface ParentTestimonial {
  id: string;
  parentName: string;
  context: string;
  before: string;
  outcome: string;
}

export const INSTITUTION_INFO = {
  name: 'Global Institute of Studies',
  shortName: 'GIS',
  foundedYear: '2001',
  coordinatorEmail: 'norasikinabdhamid@gmail.com',
  logoFilename: 'IMG-20261118-WA0004.jpg',
};

export const HERO_METRICS = [
  {
    value: '25+',
    label: 'Tahun Pengalaman Sejak 2001',
    detail: 'Rekod membimbing ribuan pelajar lepasan sekolah ke kerjaya profesional.',
  },
  {
    value: '17+',
    label: 'Umur Kemasukan Minimum',
    detail: 'Dirangka khusus untuk lepasan SPM & remaja berumur 17 tahun ke atas.',
  },
  {
    value: '94%',
    label: 'Kebolehpasaran Graduan',
    detail: 'Menembusi pasaran kerja atau menyambung ijazah dalam tempoh 6 bulan.',
  },
  {
    value: '70%',
    label: 'Latihan Praktikal & Industri',
    detail: 'Pendekatan amali sebenar berbanding teori bilik kuliah semata-mata.',
  },
];

export const PATHWAY_PREVIEWS: PathwayPreview[] = [
  {
    id: 'Teknologi & Digital',
    label: 'Teknologi & Digital',
    recommendedCourse: 'Diploma Teknologi Maklumat & Sistem Digital',
    duration: '2.5 Tahun (Termasuk Latihan Industri)',
    minAge: '17+ Tahun · Lepasan SPM',
    focusSplit: '70% Makmal Amali / 30% Asas Teori',
    keyOutcome: 'Membina aplikasi web, keselamatan rangkaian, dan sokongan sistem syarikat.',
    sampleRoles: ['Pembangun Perisian Junior', 'Juruteknik Rangkaian & Awan', 'Penganalisis Sokongan IT'],
  },
  {
    id: 'Perniagaan & Pengurusan',
    label: 'Perniagaan & Pengurusan',
    recommendedCourse: 'Diploma Pengurusan Perniagaan & Keusahawanan',
    duration: '2.5 Tahun (Termasuk Latihan Industri)',
    minAge: '17+ Tahun · Lepasan SPM',
    focusSplit: '60% Kajian Kes & Projek / 40% Teori',
    keyOutcome: 'Menguasai perakaunan asas, pemasaran digital, dan pengurusan operasi syarikat.',
    sampleRoles: ['Eksekutif Operasi & Pentadbiran', 'Penyelaras Pemasaran Digital', 'Usahawan & Pengurus Runcit'],
  },
  {
    id: 'Hospitaliti & Kulinari',
    label: 'Hospitaliti & Kulinari',
    recommendedCourse: 'Diploma Seni Kulinari & Pengurusan Hospitaliti',
    duration: '2.5 Tahun (Termasuk Latihan Hotel)',
    minAge: '17+ Tahun · Lepasan SPM',
    focusSplit: '75% Dapur & Operasi / 25% Pengurusan',
    keyOutcome: 'Kemahiran penyediaan makanan bertaraf hotel serta pengurusan acara dan F&B.',
    sampleRoles: ['Chef Muda / Commis Hotel', 'Penyelia Operasi F&B', 'Penyelaras Acara & Hospitaliti'],
  },
  {
    id: 'Kejuruteraan Teknikal',
    label: 'Kejuruteraan Teknikal',
    recommendedCourse: 'Diploma Teknologi Automasi & Penyelenggaraan Industri',
    duration: '2.5 Tahun (Termasuk Latihan Kilang)',
    minAge: '17+ Tahun · Lepasan SPM',
    focusSplit: '75% Bengkel & Mesin / 25% Teori Kejuruteraan',
    keyOutcome: 'Kepakaran penyelenggaraan sistem elektrik, PLC, dan automasi sektor pembuatan.',
    sampleRoles: ['Juruteknik Automasi Industri', 'Penolong Jurutera Penyelenggaraan', 'Penyelia Jaminan Kualiti'],
  },
];

export const STUDY_PROGRAMS: StudyProgram[] = [
  {
    id: 'diploma-it',
    code: '01.',
    title: 'Diploma Teknologi Maklumat & Sistem Digital',
    category: 'Teknologi & Digital',
    duration: '2.5 Tahun',
    entryRequirement: 'Lepasan SPM · 17+ Tahun',
    practicalRatio: '70% Amali Makmal',
    summary:
      'Melatih pelajar menguasai pembangunan perisian, pengurusan pangkalan data, dan infrastruktur rangkaian moden untuk keperluan syarikat korporat serta sektor teknologi.',
    careerOutcomes: ['Pembangun Web & Aplikasi', 'Pentadbir Sistem IT', 'Sokongan Keselamatan Siber'],
    featured: true,
  },
  {
    id: 'diploma-business',
    code: '02.',
    title: 'Diploma Pengurusan Perniagaan & Keusahawanan',
    category: 'Perniagaan & Pengurusan',
    duration: '2.5 Tahun',
    entryRequirement: 'Lepasan SPM · 17+ Tahun',
    practicalRatio: '60% Projek Industri',
    summary:
      'Membina pemahaman menyeluruh tentang kewangan syarikat, pemasaran digital, sumber manusia, dan kecekapan komunikasi profesional di tempat kerja.',
    careerOutcomes: ['Eksekutif Operasi Syarikat', 'Penyelaras Pemasaran', 'Pengurusan Sumber Manusia'],
  },
  {
    id: 'diploma-culinary',
    code: '03.',
    title: 'Diploma Seni Kulinari & Pengurusan Hospitaliti',
    category: 'Hospitaliti & Kulinari',
    duration: '2.5 Tahun',
    entryRequirement: 'Lepasan SPM · 17+ Tahun',
    practicalRatio: '75% Latihan Dapur',
    summary:
      'Sesuai untuk pelajar yang gemar kemahiran praktikal di dapur komersial, pastri, keselamatan makanan, serta pengurusan perkhidmatan hotel dan restoran.',
    careerOutcomes: ['Chef & Penyelia Dapur', 'Pengurus Operasi F&B', 'Usahawan Kulinari'],
  },
  {
    id: 'diploma-automation',
    code: '04.',
    title: 'Diploma Teknologi Automasi & Penyelenggaraan Industri',
    category: 'Kejuruteraan Teknikal',
    duration: '2.5 Tahun',
    entryRequirement: 'Lepasan SPM · 17+ Tahun',
    practicalRatio: '75% Bengkel Teknikal',
    summary:
      'Menyediakan tenaga mahir teknikal dalam sistem kawalan elektrik, penyelenggaraan mesin kilang, dan sistem automasi pengeluaran berteknologi tinggi.',
    careerOutcomes: ['Juruteknik Automasi', 'Penolong Jurutera Kilang', 'Pakar Penyelenggaraan'],
    featured: true,
  },
  {
    id: 'diploma-accounting',
    code: '05.',
    title: 'Diploma Perakaunan & Sistem Kewangan',
    category: 'Perniagaan & Pengurusan',
    duration: '2.5 Tahun',
    entryRequirement: 'Lepasan SPM · 17+ Tahun',
    practicalRatio: '65% Perisian Perakaunan',
    summary:
      'Menekankan kemahiran penyediaan penyata kewangan, pengauditan asas, percukaian Malaysia, dan penggunaan perisian perakaunan industri semasa.',
    careerOutcomes: ['Penolong Akauntan', 'Eksekutif Audit & Cukai', 'Pembantu Kewangan Korporat'],
  },
  {
    id: 'cert-digital-skills',
    code: '06.',
    title: 'Sijil Kemahiran Digital & Reka Bentuk Kreatif',
    category: 'Teknologi & Digital',
    duration: '1.5 Tahun',
    entryRequirement: 'Lepasan SPM / 17+ Tahun',
    practicalRatio: '80% Studio Praktikal',
    summary:
      'Laluan pantas untuk pelajar berusia 17 tahun ke atas menguasai reka bentuk grafik, suntingan media digital, dan pemasaran kandungan berimpak tinggi.',
    careerOutcomes: ['Pereka Grafik Digital', 'Penerbit Kandungan Media', 'Pereka Antaramuka Junior'],
  },
];

export const PARENT_ADVANTAGES: ParentAdvantage[] = [
  {
    number: '01.',
    title: 'Institusi Berpengalaman Sejak Tahun 2001',
    description:
      'Lebih 25 tahun membimbing pelajar lepasan sekolah menengah membina keyakinan diri, disiplin kerja, dan kelayakan akademik yang diiktiraf.',
    detail: 'Rekod prestasi stabil dengan jaringan alumni di seluruh Malaysia.',
  },
  {
    number: '02.',
    title: 'Pemantauan Sahsiah & Kemajuan Berkala',
    description:
      'Ibu bapa tidak dibiarkan tertanya-tanya. Penyelaras akademik memantau kehadiran serta pencapaian tugasan pelajar setiap semester.',
    detail: 'Komunikasi terus bersama ibu bapa jika pelajar memerlukan sokongan tambahan.',
  },
  {
    number: '03.',
    title: 'Kurikulum Berteraskan Kemahiran Sebenar',
    description:
      'Menyedari tidak semua pelajar sesuai dengan hafalan teori semata-mata, modul kami memberi tumpuan kepada bengkel, makmal, dan latihan industri.',
    detail: 'Pelajar membina portfolio kerja nyata sebelum hari graduasi.',
  },
  {
    number: '04.',
    title: 'Khidmat Rundingan Bantuan & Laluan Kerjaya',
    description:
      'Pasukan penyelaras kami membantu ibu bapa menilai pilihan pembiayaan pengajian serta memadankan kursus dengan minat sebenar anak anda.',
    detail: 'Sesi penerangan telus tanpa sebarang caj tersembunyi.',
  },
];

export const PARENT_TESTIMONIALS: ParentTestimonial[] = [
  {
    id: 't1',
    parentName: 'Pn. Hajah Rosnah binti Yusof',
    context: 'Ibu kepada Muhammad Arif (Graduan Teknologi Maklumat, Batch 2024)',
    before:
      'Selepas keputusan SPM keluar, anak saya keliru kerana kurang minat bidang teori berat dan lebih gemar komputer.',
    outcome:
      'Di GIS, pensyarah membimbingnya dari asas makmal hingga ke latihan industri. Kini beliau sudah bekerja tetap sebagai juruteknik sistem di Shah Alam.',
  },
  {
    id: 't2',
    parentName: 'En. Kamaludin bin Razak',
    context: 'Bapa kepada Nurul Izzah (Pelajar Pengurusan Perniagaan, 18 Tahun)',
    before:
      'Sebagai ibu bapa, kami bimbang tentang persekitaran pembelajaran dan sama ada diploma yang diambil relevan dengan majikan.',
    outcome:
      'Komunikasi daripada penyelaras GIS sangat jelas sejak hari pendaftaran. Kami dapat melihat peningkatan disiplin serta keyakinan anak membentang projek.',
  },
  {
    id: 't3',
    parentName: 'Pn. Siew Lan Tan',
    context: 'Ibu kepada Kevin Tan (Graduan Seni Kulinari, Batch 2023)',
    before:
      'Anak saya berumur 17 tahun ketika mendaftar dan masih mencari hala tuju selepas tamat tingkatan lima.',
    outcome:
      'Latihan dapur komersial di GIS memberinya kemahiran praktikal yang majikan perlukan. Selepas tamat latihan industri, pihak hotel terus menawarkan pekerjaan.',
  },
];

export const APPS_SCRIPT_SNIPPET = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // Masukkan data ke dalam baris baru Google Sheet
  sheet.appendRow([new Date(), data.name, data.phone, data.email, data.course]);
  
  // Hantar emel notifikasi ke norasikinabdhamid@gmail.com
  MailApp.sendEmail(
    "norasikinabdhamid@gmail.com", 
    "Lead Baru Pendaftaran GIS - " + data.name, 
    "Butiran pelawat yang berminat:\\n\\nNama: " + data.name + "\\nNo Tel: " + data.phone + "\\nEmel: " + data.email + "\\nKursus: " + data.course
  );
  
  return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
}`;
