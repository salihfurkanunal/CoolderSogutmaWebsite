# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Market, dükkan, mandıra ve küçük işletme sahipleri. Soğutma bozulduğunda veya yeni reyon / soğuk oda / süt tankı gerektiğinde, çoğu zaman telefonda, jargonsuz net cevap ararlar. İkincil: Konya ve çevresinden keşif isteyen işletmeler.

_Kaynak: önceki konuşmalarda onaylanan halka açık, sade site yönü._

## Product Purpose

COOLDER’ın kamu sitesi. Ziyaretçi doğru ürün grubunu seçer, ölçü ve ihtiyacı 2–3 adımda söyler, WhatsApp’tan teklif veya 7/24 arıza kaydı bırakır. Başarı: arama veya form yerine tek konuşmada teklif / servis çağrısı.

## Positioning

Üretici değil; Konya merkezli seçim, kurulum ve tamir firması. Beygir / kapasite hesabını ziyaretçiye bırakmaz — grup seçilir, uygun cihaz birlikte belirlenir. Komşu katalog sitelerinden farkı: tek sayfa, jargonsuz Türkçe, acil arıza ile teklifin ayrılması.

## Operating Context

Tek sayfa kaydırmalı site. Bölümler: kapak → hakkımızda → ürün grupları → servis → **saha işlerimiz** (kayan galeri) → iletişim footer.

- Ürün karosu NeedWizard’ı açar (grup tipine göre adımlar değişir: içerik + m², litre veya serbest not).
- Arıza: DispatchModal → WhatsApp; belirtiler cihaz tipine göre.
- Numara tıklanınca `tel:` değil WhatsApp.
- Teklif penceresi otomatik açılmaz; “Teklif al” veya ürün karosu ile açılır.

## Capabilities and Constraints

- On iki ürün grubu: endüstriyel sistem, evaporatör, merkezi, kondenser, chiller, monoblok, süt tankı, reyon, dik dolap, yaş pasta, soğuk oda, morg.
- Bayilik / B2B portal yok.
- Firma üretim iddiası taşımaz.
- Kapak, hakkımızda, ürün ve saha galeri görselleri `public/images/` altında; kaynaklar `image/` / `raw-media/` (repoya büyük orijinal basılmaz).
- Sertifika, ödül, “üretici” iddiası yok.

## Brand Commitments

- Ad: COOLDER.
- Ses: sade, halkın anlayacağı Türkçe; mühendis-mühendis HUD / jargon yok.
- İletişim: WhatsApp `+90 505 136 72 72` (`905051367272`).
- Adres: 1. Organize Sanayi Bölgesi, Konya.
- Slogan: “Soğuk kalsın, iş yürüsün.” / “Soğutmanız bozulmasın, işiniz durmasın.”

## Evidence on Hand

- Metin ve ürün grupları kodda (`lib/catalog.ts`, ana sayfa bileşenleri).
- Ürün, hero, hakkımızda ve saha işleri fotoğrafları sitede kullanılıyor.
- Müşteri yorumu, vaka, basın, fiyat listesi yok — uydurulmaz.

## Product Principles

1. Ziyaretçi 10 saniyede ne satıldığını ve kimi arayacağını anlar.
2. Teklif ve arıza ayrı kapılardır; ikisi de WhatsApp’a düşer.
3. Üretim, ödül, sertifika veya kanıtsız güven iddiası yazılmaz.
4. Teknik seçimi firma yapar; sitede HP / SKU süzgeci yok.
5. Görsel yoksa yer tutucu dürüst kalır; stok fotoğraf uydurulmaz.

## Accessibility & Inclusion

Halka açık, mobil öncelikli. Büyük dokunma alanları, görünür klavye odağı, jargonsuz Türkçe. Galeride `prefers-reduced-motion` ve mobil duraklat. Resmi WCAG hedefi ayrıca bağlanmadı.
