---
name: COOLDER
description: Konya soğutma — açık kâğıt, buzlu don, sade halk dili
colors:
  frost: "#183044"
  cyan: "#0e7490"
  sky: "#0369a1"
  alert: "#c81e1e"
  ok: "#047857"
  amber: "#c2410c"
  paper: "#eef3f7"
  white: "#ffffff"
  mute: "#3d5363"
  line: "#c9d7e1"
  ice: "#e0f2fe"
  matte: "#e4edf3"
  steel: "#f4f8fb"
  plate: "#d5e2eb"
  mist: "#d6e6ef"
  night: "#101c24"
  night-edge: "#1f3a4a"
typography:
  display:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6.2vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "-0.015em"
  label:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
  nav:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
    lineHeight: 1.4
  script:
    fontFamily: "Caveat, Segoe Script, Apple Chancery, cursive"
    fontSize: "clamp(1.85rem, 4.2vw, 2.9rem)"
    fontWeight: 500
    lineHeight: 1.15
rounded:
  tile: "1.15rem"
  soft: "0.9rem"
  pill: "999px"
spacing:
  section: "6rem"
  group: "1rem"
  gutter: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.cyan}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.4rem"
  button-primary-hover:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.white}"
  button-on-hero:
    backgroundColor: "{colors.white}"
    textColor: "{colors.frost}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.4rem"
  button-alert:
    backgroundColor: "{colors.alert}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.4rem"
  card-tile:
    backgroundColor: "{colors.white}"
    textColor: "{colors.frost}"
    rounded: "{rounded.tile}"
    padding: "0"
---

# Design System: COOLDER

## Overview

**Creative North Star: "Soğuk kâğıt, sıcak cevap"**

Açık, gündüz işletme ışığında okunan bir vitrin. Zemin soğuk kâğıt (`#eef3f7`); yazı don laciverti (`#183044`). Cyan yalnız kapı ve vurgu için. Üst kapak buzdan bir sahne; altı sakin, halkın okuduğu bir katalog.

Yoğunluk düşük. Bölümler bol boşlukla ayrılır, ilgili satırlar sık durur. Kart her şeyi sarmasın: ürün karosu görsel içindir, servis iki düz yüzeydir, kurulum sıra şerididir.

**Key Characteristics:**
- IBM Plex Sans gövde ve başlık; Caveat yalnız slogan
- Eyebrow / kicker yok; başlık kendi ağırlığını taşır
- Numara tıklanınca WhatsApp
- Gerçek ürün / saha görselleri; yoksa dürüst yer tutucu

## Colors

Soğuk kâğıt + don lacivert + seyrek cyan. Gri, hue’suz kullanılmaz.

### Primary
- **Don lacivert** (`#183044`): gövde metni, footer zemini, marka.
- **Derin cyan** (`#0e7490`): tek aksan; buton, WhatsApp, sıra numarası.

### Secondary
- **Uyarı kırmızısı** (`#c81e1e`): yalnız arıza.
- **Gökyüzü** (`#0369a1`): cyan hover.
- **Onay yeşili** (`#047857`): başarı / onay.
- **Kehribar** (`#c2410c`): uyarı seçimleri.

### Neutral
- **Soğuk kâğıt** (`#eef3f7`): sayfa zemini.
- **Matte** (`#e4edf3`): scrollbar / yumuşak yüzey.
- **Steel** (`#f4f8fb`): açık panel.
- **Plate** (`#d5e2eb`): görsel boş zemin.
- **Beyaz** (`#ffffff`): hakkımızda, servis, karo.
- **Don mürekkep** (`#3d5363`): ikincil metin; frost’tan tint.
- **Çizgi** (`#c9d7e1`): ayırıcı.
- **Buz** (`#e0f2fe`): hafif vurgu.
- **Mist** (`#d6e6ef`): footer ikincil yazı.
- **Night** (`#101c24`) / **Night edge** (`#1f3a4a`): kapak derinliği.

**The One Voice Rule.** Cyan bir ekranın en fazla onda biridir. Acil kırmızı yalnız arıza kapısındadır.

## Typography

**Display Font:** IBM Plex Sans  
**Body Font:** IBM Plex Sans  
**Script Font:** Caveat (yalnız slogan)

**Character:** Teknik ama halk dili. Display sıkı tracking (`-0.04em`); gövde 65–75ch civarı.

### Hierarchy
- **Display** (700, clamp 2.5–4.5rem): kapak başlığı.
- **Headline** (700, 2.25–2.5rem): bölüm başlığı.
- **Title** (700, 1.25rem): karo ve adım başlığı.
- **Body** (400, 1rem / 1.75): açıklama.
- **Label** (600, 0.875rem): WhatsApp, adım.
- **Nav** (500, 0.95rem): üst menü linkleri.
- **Script** (500, clamp 1.85–2.9rem): “Soğuk kalsın, iş yürüsün.”

**The No-Kicker Rule.** Başlığın üstüne küçük uppercase etiket konmaz.

## Layout

Max genişlik `72rem` (`max-w-6xl`), yatay `1–1.5rem`. Bölüm `5–6rem`. Ürün ızgarası lg’de 4’lü satırlar, eşit karo. Nav sabit `4.25rem`. Footer iletişim çubuğudur. Ana sayfa sırası: kapak → hakkımızda → ürünler → servis → saha işlerimiz → iletişim.

## Elevation & Depth

Düz yüzey varsayılan. Gölge yalnız hover veya diyalog.

### Shadow Vocabulary
- **Karo dinlenme** (`0 10px 28px rgba(0, 0, 0, 0.06)`)
- **Karo / diyalog** (`0 14px 36px rgba(0, 0, 0, 0.16)`): offset + yumuşak blur.

**The Resting Flat Rule.** Sıfır ofsetli renk halesi yok.

## Shapes

Karo ve panel `1.15rem`. Alan / not alanı `0.9rem` (soft). Buton ve nav eylemi tam hap. Kapak kare köşe.

## Components

### Buttons
- **Shape:** hap (`999px`), min yükseklik `3rem`
- **Primary:** cyan zemin, beyaz yazı
- **Hero:** beyaz zemin, frost yazı; ikincil cam kenar
- **Alert:** kırmızı, yalnız arıza
- **Hover:** 1px yukarı

### Cards / Containers
- Ürün karosu: görsel kare + alt etiket; hover’da cyan kenar
- Servis: iki düz renkli panel, iç içe kart yok
- Kurulum: numaralı sıra, kutu değil

### Inputs / Fields
- Açık kâğıt zemin, `0.9rem` yarıçap, cyan caret ve odak halkası

### Navigation
- Sabit beyaz çubuk: logo + wordmark, menü (Ana Sayfa → İletişim, arada Saha işlerimiz), sağda WhatsApp numarası + Teklif al
- Aktif bölümde kısa siyah alt çizgi (scroll-spy)

### Signature: Saha işlerimiz galerisi
Sonsuz kayan gri şerit; hover’da renk + büyüme (yanları iter); sürükle ile kaydırma; tıklanınca lightbox + oklar. Mobilde “Kaydı durdur”.

### Signature: Media placeholder
Nokta ızgaralı buz zemini; görsel yoksa dürüst yer tutucu (üretim iddiası yok).

## Do's and Don'ts

### Do:
- **Do** ikincil metni frost’tan tintle (`#3d5363`).
- **Do** numarayı WhatsApp’a bağla.
- **Do** görselsiz yerde yer tutucu bırak.

### Don't:
- **Don't** eyebrow / kicker koy.
- **Don't** üretim, ödül veya sertifika uydur.
- **Don't** Inter, mor gradyan veya iç içe kart kullan.
- **Don't** `tel:` aç.
