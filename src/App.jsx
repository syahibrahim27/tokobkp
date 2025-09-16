import React, { useEffect, useMemo, useRef, useState } from "react";

export default function VideoStore() {
  const [selected, setSelected] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [toast, setToast] = useState(null);

  const videos = useMemo(
    () => [
      {
        id: "v1",
        title: "Viral Tiktok full update tiap hari",
        category: "Viral Tiktok",
        price: 50000,
        length: "10:15",
        poster: "/thumb1.png",
        previewUrl: "/video1.mp4",
        description: "Kumpulan konten viral TikTok pilihan. selalu update cari yang terbaru.",
      },
      {
        id: "v2",
        title: "Hijab Viral Update tiap hari",
        category: "Hijab",
        price: 40000,
        length: "15:22",
        poster: "/thumb2.png",
        previewUrl: "/video2.mp4",
        description: "Akses semua full video sekali bayar, garansi grup hangus dapat yang baru.",
      },
      {
        id: "v3",
        title: "Selebgram viral terupdate",
        category: "Selebgram",
        price: 50000,
        length: "18:05",
        poster: "/thumb3.png",
        previewUrl: "/video3.mp4",
        description: "Koleksi video selebgram favorit.",
      },
      {
        id: "v4",
        title: "VIP Exclusive Pack",
        category: "VIP",
        price: 75000,
        length: "25:40",
        poster: "/thumb4.png",
        previewUrl: "/video4.mp4",
        description: "Akses VIP ke video premium eksklusif.",
      },
    ],
    []
  );

  function openCheckout(video) {
    setSelected(video);
    setShowCheckout(true);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-black/80 border-b border-red-900/30">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-red-700 grid place-items-center font-bold">tb</div>
            <div className="text-lg font-semibold tracking-wide">
              <span className="text-white">Toko</span>
              <span className="text-red-500">bkp</span>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex gap-4 text-sm">
            <a href="#home" className="hover:text-red-500">Home</a>
            <a href="#viral" className="hover:text-red-500">Viral Tiktok</a>
            <a href="#hijab" className="hover:text-red-500">Hijab</a>
            <a href="#selebgram" className="hover:text-red-500">Selebgram</a>
            <a href="#vip" className="hover:text-red-500">VIP</a>
          </nav>
        </div>
      </header>

      {/* CATALOG */}
      <section id="catalog" className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-bold mb-6">
          BELI SEKALI DAPATKAN GRUP TELEGRAM FULL UPDATE BERGARANSI
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {videos.map((v) => (
            <VideoCard
              key={v.id}
              video={v}
              onBuy={() => openCheckout(v)}
            />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-red-900/30 mt-10">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Tokobkp. All rights reserved.</p>
          <a href="https://t.me/+Jo85gdLsIpQ3MzM1" className="hover:text-white">Join Telegram Group</a>
        </div>
      </footer>

      {/* CHECKOUT MODAL */}
      <CheckoutModal
        open={showCheckout}
        video={selected}
        onClose={() => setShowCheckout(false)}
        onConfirm={() => {
          setShowCheckout(false);
          setToast("Kirim bukti pembayaran via Telegram untuk masuk grup.");
          setTimeout(() => setToast(null), 3000);
        }}
      />

      {/* TOAST */}
      <Toast msg={toast} />

      <style>{tailwindHelpers}</style>
    </div>
  );
}

function VideoCard({ video, onBuy }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (hover) {
      el.muted = true;
      el.playsInline = true;
      el.play().catch(() => {});
    } else {
      el.pause();
      el.load(); // reset ke poster
    }
  }, [hover]);

  return (
    <div className="rounded-2xl overflow-hidden border border-red-900/30 bg-zinc-950">
      <div
        className="relative aspect-video overflow-hidden cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <video
          ref={ref}
          className="h-full w-full object-cover"
          poster={video.poster}
          muted
          loop
          playsInline
          preload="none"
        >
          <source src={video.previewUrl} type="video/mp4" />
        </video>
        <div className="absolute left-3 top-3 text-xs bg-red-700/90 px-2 py-1 rounded-md">PREVIEW</div>
      </div>

      <div className="p-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold leading-tight">{video.title}</h3>
          <p className="text-xs mt-1 text-zinc-400 capitalize">{video.category}</p>
        </div>
        <div className="text-right">
          <div className="font-bold text-red-500">Rp {formatRupiah(video.price)}</div>
          <button className="btn-mini mt-2" onClick={onBuy}>Beli</button>
        </div>
      </div>
    </div>
  );
}

function CheckoutModal({ open, video, onClose, onConfirm }) {
  if (!open || !video) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-red-900/40 bg-zinc-950 p-5 shadow-2xl">
        <h3 className="text-xl font-bold mb-4">Checkout {video.title}</h3>
        <p className="mb-2">Transfer ke rekening berikut:</p>
        <div className="rounded-xl border border-red-900/30 p-4 mb-4">
          <div>PERMATA • 8528081359899898</div>
          <div className="text-xs text-zinc-400">a.n SUG*******</div>
        </div>
        <p className="mb-2">Atau bayar via QRIS:</p>
        <div className="rounded-xl border border-red-900/30 p-4 mb-4 text-center">
          <img src="/qris.jpg" alt="QRIS" className="mx-auto h-40" />
        </div>
        <p className="text-sm text-zinc-400">
          Setelah transfer, kirim bukti pembayaran ke Telegram untuk diverifikasi,
          lalu kamu akan dimasukkan ke grup VIP.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button className="btn-ghost" onClick={onClose}>Batal</button>
          <a
            href="https://t.me/Megawatiiyy"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            onClick={onConfirm}
          >
            Kirim Bukti via Telegram
          </a>
        </div>
      </div>
    </div>
  );
}

function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="rounded-full bg-black/80 border border-red-900/40 px-4 py-2 text-sm">{msg}</div>
    </div>
  );
}

function formatRupiah(n) {
  return new Intl.NumberFormat("id-ID").format(n);
}

const tailwindHelpers = `
.btn-primary{ @apply inline-flex items-center justify-center rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition shadow ring-1 ring-red-900/50; }
.btn-ghost{ @apply inline-flex items-center justify-center rounded-xl border border-red-900/30 bg-zinc-950 px-4 py-2 text-sm text-white hover:bg-red-700/10 transition; }
.btn-mini{ @apply inline-flex items-center justify-center rounded-lg border border-red-900/30 bg-zinc-950 px-3 py-1.5 text-xs text-white hover:bg-red-700/10 transition; }
`;
