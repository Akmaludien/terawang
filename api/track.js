// TerawangKhodam — pencatat kunjungan (tracking pixel 1x1).
// Setiap halaman dimuat, <img src="/api/track"> memicu fungsi ini.
// Data disimpan di npoint.io (JSON bin gratis, tanpa akun).
const BIN_URL = "https://api.npoint.io/9acd96850e3b694d52be";

module.exports = async (req, res) => {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    let data = { total: 0, days: {} };
    try {
      const r = await fetch(BIN_URL, { signal: ctrl.signal });
      if (r.ok) data = await r.json();
    } catch (e) { /* pakai data kosong */ }
    clearTimeout(timer);

    const today = new Date().toISOString().slice(0, 10);
    data.total = (data.total || 0) + 1;
    data.days = data.days || {};
    data.days[today] = (data.days[today] || 0) + 1;

    try {
      const ctrl2 = new AbortController();
      const timer2 = setTimeout(() => ctrl2.abort(), 5000);
      await fetch(BIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: ctrl2.signal,
      });
      clearTimeout(timer2);
    } catch (e) { /* gagal simpan, abaikan */ }
  } catch (e) { /* jangan pernah gagalkan pixel */ }

  const gif = Buffer.from(
    "R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
    "base64"
  );
  res.setHeader("Content-Type", "image/gif");
  res.setHeader("Cache-Control", "no-store, no-cache");
  res.status(200).send(gif);
};
