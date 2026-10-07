import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="display text-4xl">Sayfa bulunamadı</h1>
      <p className="mt-4 text-mute">Aradığınız sayfa yok. Ana sayfadan devam edebilirsiniz.</p>
      <Link href="/" className="btn mt-8 bg-frost text-white">
        Ana sayfaya dön
      </Link>
    </div>
  );
}
