// ============================================================
//  BACKEND KOTAK SURAT OSIS (versi 2) — Google Apps Script
//  Data masuk ke Google Sheet, dipisah jadi 2 tab:
//    - "Aspirasi"    : aspirasi, saran, ide, laporan
//    - "Kritik Guru" : kritik dan saran untuk guru
// ============================================================

// Password untuk masuk admin.html (khusus pengurus OSIS)
const ADMIN_KEY = "0862";

// Proteksi tebak-tebakan password: salah 5x -> admin dikunci 15 menit
const MAX_SALAH = 5;
const KUNCI_DETIK = 15 * 60;

const ZONA = "Asia/Jakarta";
const FORMAT_WAKTU = "dd/MM/yyyy HH:mm";

const TAB = {
  aspirasi: {
    nama: "Aspirasi",
    header: ["Waktu", "Kategori", "Nama", "Kelas", "Judul", "Pesan", "Anonim"]
  },
  guru: {
    nama: "Kritik Guru",
    header: ["Waktu", "Guru", "Mata Pelajaran", "Kelas", "Nama", "Kritik & Saran", "Anonim"]
  }
};

function getSheet_(jenis) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getSpreadsheetTimeZone() !== ZONA) ss.setSpreadsheetTimeZone(ZONA);
  const t = TAB[jenis];
  let sh = ss.getSheetByName(t.nama);
  if (!sh) {
    sh = ss.insertSheet(t.nama);
    sh.appendRow(t.header);
    sh.getRange(1, 1, 1, t.header.length).setFontWeight("bold").setBackground("#0b2a6b").setFontColor("#ffffff");
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Rapikan teks + cegah formula injection (teks diawali = + - @)
function bersih_(s, maks) {
  return String(s == null ? "" : s).trim().slice(0, maks).replace(/^[=+\-@]/, "'$&");
}

// ---------- Siswa mengirim ----------
function doPost(e) {
  let lock = null;
  try {
    const d = JSON.parse(e.postData.contents);
    const jenis = d.jenis === "guru" ? "guru" : "aspirasi";
    const pesan = bersih_(d.pesan, 500);
    if (pesan.length < 10) return json_({ ok: false, error: "Pesan terlalu pendek" });

    const anon = d.anonim === true || d.anonim === "true";
    const nama = anon ? "" : bersih_(d.nama, 60);
    const kelas = anon ? "" : bersih_(d.kelas, 10);
    const tanda = anon ? "Ya" : "Tidak";

    let baris;
    if (jenis === "guru") {
      const guru = bersih_(d.guru, 60);
      if (guru.length < 2) return json_({ ok: false, error: "Nama guru kosong" });
      baris = [new Date(), guru, bersih_(d.mapel, 60), kelas, nama, pesan, tanda];
    } else {
      const kategori = bersih_(d.kategori, 60);
      if (!kategori) return json_({ ok: false, error: "Kategori kosong" });
      baris = [new Date(), kategori, nama, kelas, bersih_(d.judul, 100), pesan, tanda];
    }

    lock = LockService.getScriptLock();
    lock.waitLock(10000);
    const sh = getSheet_(jenis);
    sh.appendRow(baris);
    sh.getRange(sh.getLastRow(), 1).setNumberFormat(FORMAT_WAKTU);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    if (lock) { try { lock.releaseLock(); } catch (x) {} }
  }
}

// ---------- Admin OSIS membaca (butuh kunci) ----------
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action !== "list") return json_({ ok: true, info: "API Kotak Surat OSIS aktif", versi: "2" });

  const cache = CacheService.getScriptCache();
  const salah = Number(cache.get("salah") || 0);
  if (salah >= MAX_SALAH) return json_({ ok: false, error: "Terlalu banyak percobaan salah. Coba lagi 15 menit lagi." });
  if (p.key !== ADMIN_KEY) {
    cache.put("salah", String(salah + 1), KUNCI_DETIK);
    return json_({ ok: false, error: "Kunci salah" });
  }
  cache.remove("salah");

  return json_({ ok: true, aspirasi: ambil_("aspirasi"), guru: ambil_("guru") });
}

function ambil_(jenis) {
  const baris = getSheet_(jenis).getDataRange().getValues().slice(1).reverse();
  return baris
    .filter(r => r.join("") !== "")
    .map(r => {
      const waktu = r[0] instanceof Date ? Utilities.formatDate(r[0], ZONA, FORMAT_WAKTU) : String(r[0]);
      const anonim = r[6] === true || /^(ya|true)$/i.test(String(r[6]));
      if (jenis === "guru") {
        return { waktu: waktu, guru: r[1], mapel: r[2], kelas: r[3], nama: r[4], pesan: r[5], anonim: anonim };
      }
      return { waktu: waktu, kategori: r[1], nama: r[2], kelas: r[3], judul: r[4], pesan: r[5], anonim: anonim };
    });
}
