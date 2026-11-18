# Panduan Pembangunan Landing Page Global Institute of Studies (GIS)

Dokumen ini merangkumi panduan teknikal langkah demi langkah untuk membangunkan, melancarkan, dan mengintegrasikan *Landing Page* GIS dengan pangkalan data Google Sheets serta sistem notifikasi emel.

---

## 📋 Kandungan Projek
1. **Maklumat Korporat & Jenama**
2. **Ciri-Ciri Utama Reka Bentuk (Web Design Features)**
3. **Langkah Integrasi Backend (Google Sheets & Google Apps Script)**
4. **Pautan WhatsApp Automatik**

---

## 1. Maklumat Korporat & Jenama
* **Nama Institusi:** Global Institute of Studies (GIS) - Sejak 2001
* **Logo Rasmi:** Menggunakan fail `IMG-20261118-WA0004.jpg` yang diletakkan pada direktori utama kod.
* **Target Audience:** Ibu bapa yang mempunyai anak berumur 17 tahun ke atas (lepasan SPM).
* **Emel Pentadbir / Penyelaras:** `norasikinabdhamid@gmail.com`

---

## 2. Ciri-Ciri Utama Reka Bentuk (Web Design Features)
* **Cinematic Dark Mode Design:** Menggunakan latar belakang gelap premium (`#090d16` & `#111827`) digabungkan dengan kesan cahaya radial (*cinematic glow*) dan warna aksen *Cyan* (`#00d2ff`) serta oren (`#ff7a00`).
* **Animate Section & Text Transition:** Diperkasakan oleh pustaka animasi **AOS (Animate On Scroll)** untuk memastikan peralihan teks dan elemen muncul secara dinamik semasa pengguna menatal halaman.
* **Responsive Layout:** Sepenuhnya responsif untuk paparan telefon pintar (*mobile*), tablet, dan komputer riba (*desktop*).

---

## 3. Langkah Integrasi Backend (Google Sheets & Emel)

Untuk memastikan data borang yang diisi oleh pelawat disimpan ke dalam Google Sheet anda dan menghantar emel makluman terus ke **norasikinabdhamid@gmail.com**:

1. Buka [Google Drive](https://drive.google.com) anda dan buat satu fail **Google Sheet** baharu (Beri nama: `Database Leads GIS`).
2. Di bahagian menu atas, klik **Extensions > Apps Script**.
3. Padamkan kod sedia ada dan masukkan skrip berikut:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // Masukkan data ke dalam baris baru Google Sheet
  sheet.appendRow([new Date(), data.name, data.phone, data.email, data.course]);
  
  // Hantar emel notifikasi ke norasikinabdhamid@gmail.com
  MailApp.sendEmail(
    "norasikinabdhamid@gmail.com", 
    "Lead Baru Pendaftaran GIS - " + data.name, 
    "Butiran pelawat yang berminat:\n\nNama: " + data.name + "\nNo Tel: " + data.phone + "\nEmel: " + data.email + "\nKursus: " + data.course
  );
  
  return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
}
```

4. Klik butang **Deploy > New deployment**.
5. Pilih jenis deployment sebagai **Web app**.
6. Tetapkan *Who has access* kepada **Anyone**.
7. Klik **Deploy** dan salin URL Web App yang diberikan untuk dihubungkan dengan borang laman web anda.

---

## 4. Pautan WhatsApp Automatik
Sebaik sahaja borang dihantar, satu modal kejayaan akan dipaparkan dan butang tindakan akan membuka aplikasi WhatsApp dengan teks mesej automatik:
> *"Saya berminat dengan kursus GIS"* (beserta butiran nama, nombor telefon, emel dan kursus pilihan).