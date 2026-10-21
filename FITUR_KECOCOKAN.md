# SPEC FITUR: Cek Kecocokan Khodam 💞

Fitur lapis 2 pertama TerawangKhodam. Tujuan: viralitas ganda (pasangan cek bareng → share).
Prinsip: khodam tiap nama TETAP pakai sistem existing (deterministik, konsisten dengan fitur cek tunggal).

---

## 1. Alur Pengguna

1. Navigasi tab di atas hero: `[🔮 Cek Khodam] [💞 Kecocokan]` — satu halaman, toggle section.
2. Tab Kecocokan: dua kolom input ("Nama pertama", "Nama kedua") + tombol "💞 Cek Kecocokan".
3. Loading ±2 detik, teks mistis ("Menyatukan dua aura...", "Menimbang energi gaib...").
4. Hasil: dua kartu khodam mini (kiri-kanan) + **skor besar di tengah** + badge kategori + 3 blok analisis + saran.
5. Tombol: ⬇ Download kartu | 📤 Bagikan | 🔄 Coba Lagi.

---

## 2. Sistem Elemen (fondasi analisis)

Setiap khodam punya 1 elemen tersembunyi: **Api, Air, Tanah, Angin, Gaib**.
Elemen TIDAK ditampilkan mentah ke user — dipakai untuk menghitung skor & memilih narasi hubungan.

### Matriks relasi elemen (simetris)

|  | Api | Air | Tanah | Angin | Gaib |
|---|---|---|---|---|---|
| **Api** | Rivalitas Membara +5 | Uap & Badai −10 | Magma Stabil +10 | Api Menyebar +15 | Misteri Membara +5 |
| **Air** | | Samudra Tenang +10 | Lahan Subur +15 | Badai Topan −5 | Kabut Mistis +10 |
| **Tanah** | | | Gunung Kokoh +10 | Erosi Perlahan −5 | Pusaka Terpendam +5 |
| **Angin** | | | | Tornado Ganda +5 | Bisikan Halus +10 |
| **Gaib** | | | | | Dimensi Bertemu +20 |

### Penetapan elemen 50 khodam

**Api:** Genderuwo Ganteng, Kuntilanak Merah, Kuntilanak Kopi, Genderuwo Gamers, Banaspati, Leak Bali, Hantu Kereta, Kyai Plered, Siluman Harimau Loreng, Pocong Loncat
**Air:** Wewe Kopi Susu, Nyi Blorong, Siluman Buaya Putih, Penunggu Jembatan, Naga Cilik, Naga Jawa, Ratu Pantai Selatan, Nyi Roro Kidul, Nyai Loro Blonyo
**Tanah:** Tuyul Sukses, Wewe Gombel Santuy, Dedemit Sawah, Pocong Mager, Tuyul Rebahan, Tuyul Nabung, Dedemit Warteg, Pocong Parkir, Genderuwo Satpam, Siluman Ular, Buto Ijo, Raksasa Tidur, Prabu Siliwangi, Bagong Sakti
**Angin:** Pocong Ojol, Kuntilanak Karaoke, Macan Putih, Siluman Kera Sakti, Garuda Kecil, Garuda Emas, Petruk Geniuz, Hantu Ambulans
**Gaib:** Jenglot Mini, Sundel Bolong Wibu, Jenglot Sultan, Macan Kumbang Hitam, Eyang Semar, Sabdo Palon, Batara Kala, Sang Hyang Tunggal, Naga Puspa Warsa

---

## 3. Formula Skor (deterministik)

```
key = sort(nama1, nama2).join("::")   // urutan input tidak pengaruh
base = hash(key) % 46 + 25            // 25–70 (95+ hanya untuk pasangan super langka)
elemMod = matriks[elemenA][elemenB]    // −10 s/d +20
tierBonus = tierIdx(A) + tierIdx(B)    // umum=0, langka=1, epic=2, legendaris=3, mitos=4 → 0–8
skor = clamp(base + elemMod + tierBonus, 5, 99)   // tidak pernah 100
```

**Kasus khusus:** nama1 == nama2 → skor 99, kategori Takdir Semesta, teks khusus:
"Kamu dan dirimu sendiri — tidak ada pasangan yang lebih serasi dari ini. Self-love level dewa. 🌌"

### Kategori skor

| Skor | Kategori | Nada |
|------|----------|------|
| 5–39 | 💥 Bencana Gaib | Kocak, "lari!" |
| 40–59 | 🔥 Butuh Perjuangan | Semangat, ada harapan |
| 60–79 | ✨ Serasi | Manis |
| 80–94 | 💫 Jodoh Gaib | Romantis mistis |
| 95–99 | 🌌 Takdir Semesta | Epik, bahan pamer |

---

## 4. Struktur Analisis Hasil (3 blok + saran)

Slot: {A}=nama1, {kA}=khodam1, {B}=nama2, {kB}=khodam2, {rel}=nama relasi elemen, {skor}, {kat}.

**Blok 1 — Dinamika {A}** (pilih 1 dari 3 via hash, sesuaikan):
1. "{kA}, khodam penjaga {A}, membawa energi {elemenA} yang {sifatA}. Dalam hubungan, {A} cenderung {perilakuA}."
2. "Aura {A} dijaga oleh {kA}. Khodam ini membuat {A} {sifatA2} — pasangan harus siap dengan {konsekuensiA}."
3. "{kA} bukan khodam sembarangan. Ia menanamkan {sifatA3} dalam diri {A}, yang akan sangat terasa dalam hubungan ini."

**Blok 2 — Dinamika {B}**: template sama, slot B.

**Blok 3 — Hubungan keduanya** (pilih via hash berdasar relasi elemen):
- Template memakai {rel} + deskripsi relasi 1 kalimat + kalimat penghubung skor:
  "Ketika {elemenA} bertemu {elemenB}, terjadilah {rel}: {deskripsiRelasi}. Skor {skor}% — {kalimatKategori}."

**Saran** (1 baris, pilih via hash dari 6):
1. "Saran gaib: lebih sering tertawa bareng, khodam kalian suka keramaian."
2. "Saran gaib: jangan berantem pas malam Jumat Kliwon."
3. "Saran gaib: traktir pasanganmu, rezeki kalian sedang disorot khodam."
4. "Saran gaib: khodam kalian akur kalau kalian sering jalan malam."
5. "Saran gaib: ucapkan terima kasih tiap hari — energi syukur memperkuat ikatan gaib."
6. "Saran gaib: hindari drama, khodam kalian benci sinetron."

*Catatan build: sifat/perilaku per elemen ditulis sebagai tabel kecil (5 elemen × 3 varian sifat) agar blok 1–2 tidak generik.*

---

## 5. Kartu Share (canvas 1080×1350)

- Header: TERAWANG KHODAM 💞
- Baris: [khodam A + tier]  VS  [khodam B + tier]
- Skor raksasa di tengah: "87%" + badge kategori
- Satu kalimat hubungan: "{rel}: {deskripsiRelasi}"
- Footer: "Cek kecocokanmu juga 👇 TerawangKhodam"
- Tombol download & bagikan sama seperti fitur utama.

---

## 6. Deep Link & Share

- Format: `?n1=Budi&n2=Siti` → buka langsung hasil kecocokan.
- Teks share: "Kecocokanku dengan {B}: {skor}% {kat}! Cek kecocokanmu 💞"
- Web Share API, fallback salin link (sama seperti fitur utama).

---

## 7. Edge Cases

- Input kosong salah satu → shake + toast, sama seperti fitur utama.
- Nama sama persis → kasus khusus 99% (lihat bagian 3).
- Nama sangat panjang (>30 char) → maxlength 30 seperti input utama.
- Karakter aneh/emoji → hash tetap jalan, tidak perlu sanitasi khusus selain trim.

---

## 8. Definisi Selesai

- [ ] Tab navigasi Cek Khodam | Kecocokan berfungsi
- [ ] Skor deterministik: pasangan nama sama (urutan dibalik) = skor sama — terverifikasi
- [ ] Distribusi skor masuk akal (tidak semua 90+, tidak semua 20-)
- [ ] 3 blok analisis + saran tampil dengan slot terisi benar
- [ ] Kartu canvas ter-render rapi di HP
- [ ] Deep link ?n1=&n2= membuka hasil langsung
- [ ] Test di HP Android: semua tombol jalan

---

*Setelah fitur ini live dan ada trafik, kandidat berikutnya: Ramalan Harian, lalu Tarot 3 Kartu, lalu Terawangan Mendalam (berbayar).*
