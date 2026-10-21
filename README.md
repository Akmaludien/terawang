# Ramalin 💘

Web hiburan viral: **Terawang Khodam** + **Cek Kecocokan Khodam** + **Ramalin (Cek Jodoh)** — satu situs, tiga fungsi.

Live: https://ramalinjodoh.vercel.app

## Fungsi

| Halaman | File | Keterangan |
|---|---|---|
| Cek Khodam | `index.html` | Input nama → khodam penjaga (50 khodam, 5 tier, seeded hash) |
| Kecocokan Khodam | `index.html` (?n1=&n2=) | Dua nama → skor + analisis elemen |
| Cek Jodoh (Ramalin) | `jodoh.html` | Web version filter TikTok "my next relationship" — 5 reel 3D three.js + 3 kartu bonus |

## Prinsip

- **Deterministik**: input sama = hasil sama (seeded hash — djb2 + mulberry32). Bisa di-share & dibanding-bandingin.
- **Ringan**: satu file HTML per halaman, tanpa build step. three.js cuma di `jodoh.html` via CDN (ada fallback 2D).
- **Anti AI-slop**: logo SVG digambar manual, ikon stroke konsisten, tipografi Marcellus + grain, tanpa gradient norak.

## Struktur

```
index.html          → Cek Khodam + Kecocokan
jodoh.html / jodoh.js → Ramalin (Cek Jodoh)
api/track.js        → tracking pixel kunjungan (npoint.io)
api/stats.js        → baca statistik kunjungan
assets/             → logo & favicon SVG (khodam + jodoh)
*.md                → spec, task list, stok konten promosi
```

## Deploy

Vercel, static + serverless functions (`api/`). Setiap ada perubahan file, deploy ulang via Vercel MCP.

---
Dibuat untuk hiburan. Jangan dijadikan acuan keputusan hidup (apalagi keputusan jodoh).
