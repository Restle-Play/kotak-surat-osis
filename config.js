// ============================================================
//  PENGATURAN KOTAK SURAT OSIS
//  Link API ada di file TERPISAH: api.js (jadi file ini aman diganti-ganti)
// ============================================================
window.CONFIG = {

  // 1) Teks header & footer
  NAMA_ORGANISASI: "OSIS",
  NAMA_SEKOLAH: "SMP NEGERI 1",
  NAMA_DAERAH: "WONGSOREJO",

  // 2) Logo. Kosong = pakai logo bawaan di logo.js.
  //    Mau ganti? isi nama file gambar (satu folder dengan index.html), mis. osis: "logo-baru.png"
  //    Kalau gambar tidak ketemu, tampil badge teks di bawah.
  LOGO: {
    osis: "",
    smp: "",
    teksOsis: "OSIS",
    teksSmp: "SMPN 1"
  },

  // Latar belakang logo: "tanpa" (transparan) | "lingkaran" (putih bulat) | "kotak" (putih kotak)
  LOGO_LATAR: "tanpa",

  // 3) Foto latar header (foto gedung sekolah). Kosongkan "" kalau tidak ada.
  BG_IMAGE: "sekolah.jpg",

  // 4) Kelas: huruf terakhir tiap tingkat. "F" -> 7A, 7B, 7C, 7D, 7E, 7F
  TINGKAT: { "7": "F", "8": "F", "9": "F" },

  // (Opsional) isi manual kalau nama kelas tidak urut. Kalau diisi, TINGKAT diabaikan.
  // Contoh: ["7A","7B","8-Unggulan","9A"]
  KELAS_MANUAL: [],

  // 5) Kategori untuk mode "Aspirasi & Saran"
  KATEGORI: [
    "Saran",
    "Kritik",
    "Ide Kegiatan OSIS",
    "Fasilitas Sekolah",
    "Kebersihan & Lingkungan",
    "Laporan Masalah",
    "Lainnya"
  ],

  // 6) Mode "Kritik untuk Guru"
  //    DAFTAR_GURU = saran nama yang muncul saat siswa mengetik (siswa tetap boleh ketik bebas).
  //    Contoh: ["Bu Rina", "Pak Budi", "Bu Siti"]
  DAFTAR_GURU: [],
  DAFTAR_MAPEL: [
    "Matematika", "IPA", "IPS", "Bahasa Indonesia", "Bahasa Inggris", "PKn", "Pendidikan Agama",
    "Seni Budaya", "PJOK", "Informatika", "Prakarya", "Bahasa Jawa", "BK"
  ],

  // 6) FILTER KATA KASAR & BARANG TERLARANG
  //    Tambah kata baru tinggal tulis di dalam [ ] sesuai jenisnya (huruf kecil, pakai tanda kutip, pisah koma).
  //    *Kata   = dicek sebagai kata utuh (aman, tidak salah blokir kata biasa)
  //    *Frasa  = dicek di dalam kata / frasa panjang (untuk kata khas yang tidak mungkin kata biasa)
  FILTER: {
    AKTIF: true,              // false = matikan filter
    TOLAK_TERLARANG: true,    // false = kata narkoba/judi/dll boleh (hanya kata kasar yang diblokir)

    kasarKata: [
      // Indonesia / Jawa / Sunda / Melayu
      "anjing","anjg","ajg","asu","asw","tai","taik","taek","kirik","celeng","bangke","bacot","cuk","cok",
      "jancuk","jancok","dancok","dancuk","diancuk","diancok","jancik","bajingan","brengsek","keparat","kampret",
      "tolol","goblok","goblog","bego","idiot","bodoh","dungu","kunyuk","bedebah","jahanam","laknat","bejat",
      "bangsat","bangsad","kontol","kntl","memek","pepek","ngentot","ngewe","jembut","lonte","pelacur","jablay",
      "perek","sundal","bispak","babi","pukimak","puki","kimak","lancau","cibai","banci","bencong","colmek",
      // tambahan (singkatan & slang)
      "clmk","ngentu","gblk","mmk","ppk","ngwe","tobrut","tbrt","jnck","lantam","lantham",
      // Inggris
      "fuck","fucker","fucking","fuk","fck","shit","shitty","bullshit","bitch","bastard","asshole","arsehole",
      "dick","dickhead","cock","cocksucker","pussy","cunt","whore","slut","twat","wanker","douchebag",
      "motherfucker","mofo","nigger","nigga","faggot","retard","dumbass","jackass","dipshit","bollocks",
      // Spanyol / Portugis / Italia
      "puta","puto","mierda","cabron","cabrona","pendejo","pendeja","joder","gilipollas","culero","chingar",
      "chingada","chingado","chinga","verga","marica","maricon","carajo","mamon","hijueputa",
      "merda","caralho","porra","foda","fodase","viado","buceta","cuzao",
      "cazzo","vaffanculo","stronzo","stronza","puttana","troia","coglione","minchia",
      // Prancis / Jerman / Belanda / Polandia / Yunani
      "putain","merde","salope","connard","connasse","enculer","encule","niquer","nique","batard","pute","couille",
      "scheisse","scheiss","arschloch","wichser","fotze","hurensohn","schlampe","fick","ficken","ficker","kacke","hure",
      "klootzak","godverdomme","hoer","kurwa","chuj","pierdole","jebany","spierdalaj","pizda",
      "malaka","gamoto","poutsa","skata",
      // Turki / Arab / Hindi-Urdu
      "orospu","siktir","sikik","amk","yarrak","amcik","gotveren","pezevenk","ibne",
      "sharmouta","sharmuta","sharmota","ibnelkalb",
      "madarchod","behenchod","bhenchod","chutiya","chutiye","gandu","bhosdike","bhosdi","harami","haramzada",
      "lauda","lund","bhadwa","bhadwe",
      // Rusia / Korea / Jepang / Cina / Tagalog (tulisan latin)
      "blyat","blyad","pizdec","pidor","pidar","pidoras","huy","khuy","ebat","yobany","mudak","gandon","zalupa",
      "dolboeb","dolbaeb","suchka","ebanat",
      "sibal","ssibal","gaesaekki","gaesaeki","byeongsin","jiral",
      "chikusho","kisama","bakayaro",
      "caonima","shabi","wocao","tamade","hundan","wangbadan","nmsl",
      "putangina","tangina","gago","ulol","bwisit","punyeta","tarantado","pakshet"
    ],
    kasarFrasa: [
      "anjing","bangsat","bajingan","brengsek","keparat","kampret","kontol","memek","ngentot","jembut","pukimak",
      "lancau","cibai","bedebah","jahanam","colmek","sundal","jancuk","jancok","dancok",
      "fuck","motherfucker","asshole","bullshit","dickhead","cocksucker","bitch","bastard","whore","faggot",
      "madarchod","behenchod","bhenchod","chutiya","bhosdike","haramzada","scheisse","arschloch","hurensohn","wichser",
      "kurwa","blyat","pizdec","putangina","caonima","vaffanculo","cabron","pendejo","gilipollas","hijueputa",
      "putain","enculer","connard","orospu","siktir","sharmouta","klootzak","godverdomme","chikusho","gaesaekki",
      "byeongsin","ssibal",
      // frasa lebih dari satu kata
      "putang ina","cao ni ma","ni ma si le","hijo de puta","filho da puta","fils de pute","va te faire foutre",
      "suka blyat","ibn el sharmouta","dit me","du ma","son of a bitch"
    ],

    terlarangKata: [
      "sabu","ganja","narkoba","narkotika","narkotik","kokain","cocaine","heroin","putau","ekstasi","ecstasy",
      "inex","ineks","mdma","lsd","ketamin","ketamine","tramadol","meth","metamfetamin","methamphetamine",
      "weed","cimeng","miras","oplosan","togel","judol","judi","bokep","porno","pornografi"
    ],
    terlarangFrasa: [
      "pil koplo","pil dobel","obat terlarang","barang terlarang","minuman keras","slot gacor","judi online",
      "tembakau gorila","sabu sabu"
    ]
  },

  MAX_PESAN: 500
};
