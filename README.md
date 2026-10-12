# Kotak Surat OSIS SMP Negeri 1 Wongsorejo (versi 2)

Siswa bisa mengirim **aspirasi & saran** dan **kritik untuk guru**. Datanya masuk ke Google Sheet
(dipisah jadi 2 tab) dan dibaca pengurus OSIS lewat `admin.html` (pakai sandi).

## Isi folder (7 file, taruh dalam SATU folder yang sama)
| File | Fungsi | Perlu diedit? |
|---|---|---|
| `index.html` | Halaman form untuk siswa | Tidak |
| `admin.html` | Panel khusus OSIS (tab Aspirasi dan tab Kritik Guru) | Tidak |
| `api.js` | **Isinya cuma link Web App** | **Ya, isi 1 kali** |
| `config.js` | Pengaturan: kelas, kategori, daftar guru, filter kata kasar | Kalau perlu |
| `logo.js` | Logo OSIS dan SMPN 1 (sudah tertanam) | Tidak |
| `Code.gs` | Backend Google Apps Script (sandi admin ada di baris 7) | Kalau mau ganti sandi |
| `README.md` | Panduan ini | Tidak |

Link API sengaja dipisah di `api.js`. Jadi kalau `config.js` diganti, link API tidak ikut hilang.

---

## A. Pasang pertama kali

### 1. Buat Google Sheet
Buka sheets.google.com, buat sheet kosong, namai "Aspirasi OSIS". **Jangan dibagikan ke siswa.**
Tab **Aspirasi** dan **Kritik Guru** dibuat otomatis, tidak perlu bikin sendiri.

### 2. Pasang backend
Pakai **browser** (kalau di HP: Chrome → titik tiga → centang *Situs desktop*). Di aplikasi Google Sheets menu Ekstensi tidak ada.
1. Di Sheet: **Ekstensi → Apps Script**.
2. Pilih semua isi editor, hapus semuanya (termasuk `function myFunction() {}`), lalu tempel seluruh isi `Code.gs`.
3. Klik ikon simpan.

### 3. Deploy
1. **Deploy → Deployment baru → ikon roda gigi → Aplikasi web.**
2. **Jalankan sebagai:** Saya. **Yang memiliki akses:** **Siapa saja** (wajib).
3. Deploy → Beri otorisasi → pilih akun → kalau muncul "belum diverifikasi": Lanjutan → Buka ... → Izinkan.
4. **Salin URL aplikasi web** (ujungnya `/exec`).

### 4. Tes backend
Buka URL tadi di browser. Harus muncul:
`{"ok":true,"info":"API Kotak Surat OSIS aktif","versi":"2"}`
Kalau tidak ada tulisan `"versi":"2"`, berarti kode lama masih aktif. Ulangi bagian B.

### 5. Isi `api.js`
Buka `api.js`, ganti `PASTE_URL_WEB_APP_DI_SINI` dengan URL tadi. Tanda kutip jangan dihapus:
```js
window.API_URL = "https://script.google.com/macros/s/XXXX/exec";
```

### 6. Upload ke GitHub Pages
1. github.com → **New repository** → nama bebas → **Public** → Create.
2. **Add file → Upload files** → pilih **ketujuh file** (langsung file-nya, bukan folder) → **Commit changes**.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
4. Tunggu 1 sampai 2 menit. Link-nya `https://usernamemu.github.io/nama-repo/`
   - **Siswa:** link itu.
   - **OSIS:** link itu + `admin.html`, sandi di `Code.gs` baris 7 (sekarang `0862`).

---

## B. Update dari versi lama
1. **Sheet dan data lama aman.** Tab "Aspirasi" tetap dipakai, tab "Kritik Guru" muncul otomatis saat kritik pertama masuk.
2. Apps Script: hapus kode lama, tempel `Code.gs` baru, simpan.
3. **Deploy → Kelola deployment → ikon pensil → Versi: Versi baru → Deploy.** URL tetap sama.
4. Upload ketujuh file ke GitHub (nama sama, otomatis menimpa). Jangan lupa `api.js` dan `logo.js`, itu file baru.
5. Isi `api.js` dengan URL Web App yang lama. Lalu Ctrl+F5.

---

## C. Pengaturan (di `config.js`)
- **Kelas:** `TINGKAT: { "7": "F", "8": "F", "9": "F" }` artinya 7A-7F, 8A-8F, 9A-9F.
- **Daftar guru:** isi `DAFTAR_GURU: ["Bu Rina", "Pak Budi"]`. Nama itu muncul sebagai saran saat siswa mengetik, siswa tetap bisa ketik bebas. Kalau nama ditulis seragam, rekap per guru di admin lebih rapi.
- **Kategori aspirasi:** `KATEGORI`.
- **Logo:** bawaan sudah di `logo.js`. Mau ganti, isi `LOGO.osis` / `LOGO.smp` dengan nama file gambar (taruh satu folder).
- **Foto latar header:** taruh `sekolah.jpg` di folder yang sama. Kalau tidak ada, latarnya biru polos.
- **Filter kata kasar & barang terlarang:** bagian `FILTER`. Tambah kata baru di dalam `[ ]`, huruf kecil, pakai tanda kutip, pisah koma. `TOLAK_TERLARANG: false` kalau kata seperti narkoba/judi boleh ditulis (kata kasar tetap diblokir). `AKTIF: false` mematikan filter.
  Filter jalan di browser, jadi cukup untuk siswa biasa tapi bisa ditembus orang yang ngoprek kode. Daftar tidak mungkin 100% lengkap, tambahkan sendiri kalau ada yang lolos.

## D. Cara pakai admin
1. Buka `.../admin.html`, masukkan sandi.
2. Tab **Aspirasi**: cari, filter kategori, unduh CSV.
3. Tab **Kritik Guru**: ada rekap per guru (klik nama guru untuk memfilter), cari, unduh CSV.
4. Sandi salah 5x → dikunci 15 menit (data tetap bisa dibuka langsung di Google Sheet).
5. Ganti sandi: ubah `ADMIN_KEY` di `Code.gs`, simpan, lalu deploy **Versi baru**.

Satu sandi membuka kedua tab. Kalau mau kritik guru hanya dilihat orang tertentu, share Google Sheet-nya hanya ke mereka, dan jangan berikan sandi admin ke yang lain.

---

## E. Masalah umum
| Gejala | Penyebab dan solusi |
|---|---|
| 404 saat buka link | Repo belum Public, Pages belum aktif, atau file ada di dalam folder. Semua file harus langsung di halaman utama repo |
| "API_URL belum diisi" | `api.js` belum diisi atau belum diupload ulang |
| Admin: "tidak bisa terhubung" | URL salah, atau deploy belum "Siapa saja" |
| Admin: "Code.gs lama masih aktif" | Belum deploy **Versi baru** |
| Admin: "Kunci salah" | Sandi di `Code.gs` baris 7 berbeda dengan yang diketik, atau belum deploy Versi baru |
| Pesan terkirim tapi tidak masuk Sheet | Deploy belum "Siapa saja" |
| Logo tidak muncul | `logo.js` belum diupload. Buka lewat link/hosting, bukan preview di aplikasi |
| Perubahan tidak kelihatan | Tekan Ctrl+F5 atau buka lewat tab samaran |
