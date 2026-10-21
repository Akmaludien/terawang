# SPEC: Ramalin — Terawang Jodoh 💘

Fitur lapis 2 TerawangKhodam (halaman terpisah `jodoh.html`, brand **Ramalin**).
Tujuan: replika web dari filter TikTok "my next relationship" — input data diri → 5 reel 3D berhenti satu-satu → 3 kartu bonus → kartu share.

---

## 1. Alur Pengguna

1. Tab/link "💘 Cek Jodoh" dari halaman utama → `jodoh.html`.
2. Form: **nama** (teks, wajib), **umur** (angka 17–60, wajib), **tinggi** (cm 140–210, wajib), **personality** (dropdown: 16 MBTI + 8 tipe umum, wajib).
3. Klik "💘 Terawang Jodohku" → 5 reel 3D (three.js) berputar, berhenti berurutan: Inisial → Umur → Tinggi → Profesi → Personality. Tiap berhenti: bunyi tick + chime (WebAudio, tanpa file).
4. Setelah 5 reel berhenti → 3 kartu bonus flip berurutan: 📍 Ketemu di mana → 💬 First move → 💘 Skor kecocokan.
5. Kartu hasil final + tombol: ⬇ Download PNG | 📤 Bagikan | 🔄 Coba Lagi.
6. Fallback: kalau three.js/CDN gagal → ticker teks 2D sederhana (hasil tetap sama).

## 2. Determinisme (seeded)

```
key = [nama, umur, tinggi, personality].join("|").toLowerCase().trim()
rng = mulberry32(djb2(key))
```
Semua 8 output diambil dari `rng` secara berurutan → input sama = hasil sama persis. Deep link `?jodoh=1&nama=&umur=&tinggi=&pers=` me-replay hasil yang sama.

## 3. Pool Data

- **Inisial**: A–Z dengan weight (huruf umum Indonesia lebih sering: A/D/M/R/S ×9, dst; X/Q/Z ×1).
- **Umur**: umur input ±7, clamp 18–40, uniform.
- **Tinggi**: 155–190, weight segitiga puncak 168.
- **Profesi**: 40 item, campur keren & receh (Pilot, Barista, Abang Ojol, Calon Mantu Idaman, ...).
- **Personality**: 24 item (16 MBTI + 8 umum), masing-masing 1 kalimat deskripsi lucu.
- **Tempat ketemu**: 18 item (Kampus, DM TikTok, Gerbong KRL, ...).
- **First move**: 12 item (Dia yang duluan nge-chat, Salah kirim chat, ...).
- **Skor**: 70–99 via rng.

## 4. Reel 3D (three.js r128, CDN cdnjs)

- 5 plane (satu per reel) dengan texture atlas per reel (satu canvas 8 kolom, sel 256×128, teks auto-fit).
- Tiap tick: ganti label (offset texture) + animasi flip `rotation.x`.
- Tick interval ease-out 55ms → 420ms; total tick reel-i = `18 + i*7 + offset` sehingga mendarat tepat di target.
- Start stagger 400ms per reel. Total animasi ≈ 7 detik.
- DPR dibatasi 2; kamera perspective; idle float halus.
- Bunyi: tick square 1400Hz saat label ganti; chime 2 nada saat reel berhenti.

## 5. Kartu Share (canvas 1080×1350)

Tema rose gelap: judul RAMALIN, "JODOH {nama}", 5 baris hasil + deskripsi personality, 3 bonus (tempat, first move, skor raksasa), footer ajakan.

## 6. Definisi Selesai

- [ ] 5 reel berhenti di hasil yang benar (sesuai seed) — verifikasi via node
- [ ] Determinisme: input sama → 8 output sama — verifikasi via node
- [ ] Fallback 2D jalan saat THREE undefined
- [ ] Deep link membuka hasil langsung
- [ ] Download PNG & share jalan di HP
- [ ] Link dua arah index.html ↔ jodoh.html
- [ ] Test HP Android: animasi mulus, tidak lag berat
