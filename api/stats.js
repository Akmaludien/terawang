// TerawangKhodam — baca statistik kunjungan.
// Dipakai Muse saat Akmal tanya "cek traffic".
const BIN_URL = "https://api.npoint.io/9acd96850e3b694d52be";

module.exports = async (req, res) => {
  try {
    const r = await fetch(BIN_URL);
    const data = await r.json();
    res.setHeader("Cache-Control", "no-store, no-cache");
    res.status(200).json({ total: data.total || 0, days: data.days || {} });
  } catch (e) {
    res.status(500).json({ error: "unavailable" });
  }
};
