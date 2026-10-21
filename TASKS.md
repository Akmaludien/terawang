# TASKS — Cek Khodam Online

Acuan: `~/workspace/your_files/Brief_Cek_Khodam.md`
Status: 🟡 berjalan | 🟢 selesai | 🔴 tertunda

---

## Fase 0 — Persiapan (Hari 1) 🟡

- [x] Kunci nama brand: **TerawangKhodam** (dipilih 21 Okt 2026 — kesan mistis kuat). Branding hanya di web; promosi pakai akun TikTok & Threads pribadi Akmal (keputusan 21 Okt: tidak bikin akun baru per proyek kecuali proyek terbukti potensial)
- [ ] Cek & amankan domain (terawangkhodam.com / .id / .online) — opsional tahap awal, bisa pakai subdomain gratis Vercel dulu
- [ ] Buat akun deploy: Vercel (gratis) — dibutuhkan sebelum Fase 2
- [ ] Buat akun Lynk.id (untuk funnel tahap 2 — bisa nanti)
- [x] Bank 50 khodam final — disetujui apa adanya (21 Okt 2026)
- [x] Palet warna: tema gelap mistis — background hitam-ungu pekat, aksen emas, highlight ungu terang (disetujui 21 Okt 2026)

**Selesai kalau:** semua akun jadi, bank khodam final, brief tidak berubah lagi.

---

## Fase 1 — Build Website (Hari 2–3) 🟡 → website jadi 21 Okt, tinggal test HP

- [x] Struktur HTML: hero + input nama + tombol
- [x] Animasi loading mistis ±2 detik setelah tombol ditekan
- [x] Data 50 khodam sebagai array JS (nama, tier, deskripsi, kekuatan)
- [x] Fungsi hash seeded (djb2): nama sama → khodam sama, selalu (terverifikasi via node)
- [x] Distribusi tier sesuai peluang: Umum 40 / Langka 30 / Epic 20 / Legendaris 8 / Mitos 2 (terverifikasi: 2000 sampel ≈ target)
- [x] Tampilan kartu hasil: nama khodam, badge tier, deskripsi, kekuatan
- [x] Render kartu ke `<canvas>` 1080×1350 → tombol Download PNG
- [x] Deep link: baca `?nama=` saat halaman dibuka → langsung tampilkan hasil
- [x] Tombol Bagikan: Web Share API, fallback salin link
- [x] Tombol "Coba Nama Lain" (reset ke input)
- [x] Counter "X orang sudah cek" (angka dasar + localStorage)
- [x] Section: cara main, FAQ (5 item), disclaimer hiburan, footer + link sosmed
- [x] SEO dasar: title, meta description, OG tags, FAQ schema JSON-LD
- [x] **Test wajib di HP Android spek rendah (Chrome):** load <2 detik, download PNG jalan, deep link jalan, share jalan — LOLOS 21 Okt (Akmal)

**Selesai kalau:** semua checklist test HP centang hijau.

---

## Redesign anti-AI-slop 🟢 jadi 21 Okt

- [x] Logo SVG custom (mata + bulan sabit, digambar manual) — assets/logo.svg
- [x] Favicon SVG — assets/favicon.svg
- [x] Set ikon stroke konsisten (eye/match/download/share) — inline sprite
- [x] Tipografi Marcellus untuk judul + grain halus
- [x] Logo digambar ulang di kartu share (canvas)
- [x] Redeploy Vercel + verifikasi assets live (200)

- [x] Deploy ke Vercel Akmal → **https://terawangkhodam-akmaludien.vercel.app** (production, READY, verifikasi HTTP 200)
- [x] Proteksi SSO Vercel dimatikan → situs publik, tanpa login
- [x] Penghitung kunjungan bikinan sendiri LIVE 21 Okt: `api/track.js` (pixel 1x1 tiap page load) + `api/stats.js`; data di npoint.io (total + per hari); terverifikasi +1/hit; direset ke 0
- [ ] Test URL final di HP: cek beberapa nama, pastikan hasil konsisten
- [ ] Test deep link `?nama=` dan `?n1=&n2=` dari WhatsApp/Threads
- [ ] Test tombol download & bagikan dari browser HP

**Selesai kalau:** website live dan semua fungsi jalan dari HP orang lain (bukan cuma HP sendiri).

---

## Fase 1.5 — Fitur Cek Kecocokan Khodam 💞 🟢 jadi 21 Okt (tinggal test HP)

Spec: `~/workspace/cek-khodam/FITUR_KECOCOKAN.md`

- [x] Tab navigasi Cek Khodam | Kecocokan
- [x] Sistem elemen 50 khodam + matriks relasi 5×5 (15 pasangan unik)
- [x] Formula skor deterministik (urutan nama tidak pengaruh — terverifikasi)
- [x] 3 blok analisis + saran (template multi-varian + slot)
- [x] Kartu share canvas (dua khodam + skor raksasa)
- [x] Deep link ?n1=&n2=
- [x] Edge cases: nama kembar → 99% spesial, input kosong, maxlength
- [x] Verifikasi: determinisme ✓, distribusi 5000 sampel sehat (95+ ultra langka, sesuai desain) ✓
- [x] Test HP Android — LOLOS 21 Okt (Akmal)

---

## Fase 3 — Stok Konten 🟡 paket jadi 21 Okt

- [x] Paket konten: 5 script video TikTok + 5 draf Threads + jadwal 7 hari (`~/workspace/cek-khodam/KONTEN_PROMOSI.md`)
- [x] Snippet Vercel Web Analytics terpasang di situs (redeploy 21 Okt) — Akmal perlu aktifkan "Web Analytics → Enable" di dashboard Vercel project terawangkhodam biar data pengunjung masuk
- [ ] Produksi & posting video (TUGAS AKMAL — atau hubungkan Threads biar Muse bisa postingkan drafnya)

---

## Fase 4 — Launch & Iterasi (Hari 6–7, lanjut rutin)

- [ ] Posting 1–2 video/hari selama minggu pertama
- [ ] Posting teks + link di Threads tiap hari
- [ ] Catat video mana yang meledak → bikin variannya
- [ ] Pantau komentar: khodam apa yang diminta → tambah ke bank
- [ ] Iterasi website dari feedback (yang lemah diperbaiki)

**Selesai kalau:** pola konten pemenang ketemu, posting jalan konsisten.

---

## Fase 5 — Monetisasi (NANTI — setelah trafik stabil)

- [ ] Daftar AdSense (butuh trafik organik stabil)
- [ ] Pasang slot iklan tanpa mengganggu kecepatan/share
- [ ] Tambah link produk digital (Lynk.id) di footer & halaman hasil

**Jangan dikerjakan sebelum Fase 4 stabil.** Kecepatan dan kemudahan share adalah segalanya di awal.

---

---

## Fase 1.6 — Ramalin 💘 (Cek Jodoh) 🟢 jadi 21 Okt

Spec: `~/workspace/cek-khodam/RAMALIN_JODOH.md` — brand **Ramalin** (dipilih Akmal 21 Okt 2026 dari saran asisten).

- [x] Halaman terpisah `jodoh.html` + `jodoh.js` (biar three.js tidak memberatkan index.html)
- [x] Tema rose/pink, token desain sama (Marcellus + grain + gelap)
- [x] Form: nama, umur (17–60), tinggi (140–210), personality (16 MBTI + 8 umum)
- [x] 5 reel 3D three.js r128 (CDN cdnjs): Inisial → Umur → Tinggi → Profesi → Personality; berhenti berurutan + flip + bunyi tick/chime WebAudio
- [x] 3 kartu bonus flip: 📍 ketemu di mana → 💬 first move → 💘 skor kecocokan
- [x] Seeded RNG (djb2 + mulberry32): input sama = 8 output sama — terverifikasi via node (determinisme ✓, target index ✓, distribusi 3000 sampel sehat ✓)
- [x] Fallback ticker 2D kalau three.js/CDN gagal
- [x] Kartu share canvas 1080×1350 tema rose + deep link `?jodoh=1&nama=&umur=&tinggi=&pers=`
- [x] Link dua arah: tab "💘 Cek Jodoh" di index.html ↔ jodoh.html
- [x] Counter kunjungan reuse /api/stats
- [x] Deploy Vercel 21 Okt → https://ramalinjodoh.vercel.app/jodoh.html (project di-rename "ramalinjodoh", alias bersih dipasang manual; READY, 200 terverifikasi)
- [x] Fix 21 Okt: reel kepotong di HP → kamera three.js auto-fit (fitCamera) biar 5 reel selalu muat di layar; redeploy + alias ramalinjodoh.vercel.app
- [x] Redesign anti-AI-slop 21 Okt (arah "Kartu Ramalan Vintage" pilihan Akmal, versi dijinakkan): bingkai ganda + ornamen sudut tipis, angka romawi I–V, tiket perforasi + notch, stempel lilin hati SVG, tombol outline letterspaced, emoji di chrome UI diganti ikon stroke; kartu share canvas diselaraskan (bingkai ganda + stempel lilin + perforasi); redeploy + alias ramalinjodoh.vercel.app, 200 terverifikasi
- [x] Unifikasi 21 Okt: 3 fungsi satu bahasa desain vintage-ticket beda nuansa — Khodam = emas mistis, Kecocokan = rose (override --gold/--purple di #paneMatch), Jodoh = gold-rose. index.html: tombol gradient → outline letterspaced, kartu hasil bingkai ganda + sudut tipis, perforasi di kartu skor kecocokan, emoji CTA dihapus, tab Jodoh pakai ikon hati SVG
- [x] Logo resmi Cek Jodoh 21 Okt: assets/logo-jodoh.svg (stempel lilin hati digambar tangan) + assets/favicon-jodoh.svg; dipakai di header & favicon jodoh.html
- [x] Polish 21 Okt (feedback Akmal): area reel dipadatkan (canvas 290→220px, reel dirapatkan spacing 2.15) biar nggak banyak ruang kosong; gap label form disamakan (UMUR/TINGGI sekarang sejajar PERSONALITY/NAMA); tab atas diseragamkan penuh (radius/padding/font/ikon sama di index.html & jodoh.html); redeploy + alias, terverifikasi live
- [ ] Test HP Android: tampilan baru + animasi reel mulus, tombol download & share jalan (TUGAS AKMAL)

---

*Update file ini tiap ada progress. Coret yang selesai, jangan dihapus.*
