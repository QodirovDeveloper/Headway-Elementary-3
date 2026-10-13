# Headway Elementary — Unit 3 test

**Work hard, play hard!** bo'limi bo'yicha o'quvchini tekshiradigan interaktiv test (Headway Elementary, 4th edition, 22–29-betlar).
Sayt to'liq ingliz tilida, avvalo telefon uchun qilingan: bitta ekranda bitta savol, katta tugmalar, javobdan keyin pastda "Continue".

React + TypeScript + Tailwind CSS + Vite.

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tayyor sayt dist/ papkasiga (istalgan hostingga qo'yiladi)
npm run typecheck  # faqat TypeScript tekshiruvi
```

## Test tarkibi (9 qism, 84 savol)

| # | Qism | Turi |
|---|------|------|
| 1 | Marco's two jobs — matnga fe'l qo'yish | variant |
| 2 | Questions & negatives — do / does / don't / doesn't | variant |
| 3 | Question words — What time, Where, Who, Why, How | variant |
| 4 | Make it opposite — gapni teskarisiga aylantirish | yozish |
| 5 | How often? — always … never, so'z tartibi | variant |
| 6 | Free time — bo'sh vaqt, so'z birikmalari, oylar, fasllar | variant |
| 7 | like + -ing — playing, running, dancing | yozish |
| 8 | Jamie or Shilpa? — "Town and country weekends" matni | variant |
| 9 | Social expressions — kundalik iboralar | variant |

## Tuzilishi

```
src/
  main.tsx, App.tsx      — kirish nuqtasi; App qaysi ekran ochiqligini (View) boshqaradi
  types.ts               — Section, McItem, TypeItem, Answer, View turlari
  data/sections.tsx      — hamma savollar (yangi savol qo'shish — faqat shu fayl)
  store.ts               — useAnswers(): javoblar, localStorage'ga saqlash
  lib/
    check.ts             — yozma javobni tekshirish ("doesn't" = "does not", katta-kichik harf, nuqta farq qilmaydi)
    stats.ts             — bo'lim / umumiy ball, "davom etish" qayerdan boshlanadi
  components/
    ui.tsx               — BigButton, Score, PartList (bosh sahifa va natijalarda bitta ro'yxat)
    TopBar.tsx           — tepadagi progress va ball
    Question.tsx         — savol ekrani: variantlar yoki yozish maydoni
    FeedbackBar.tsx      — pastdan chiqadigan "Correct! / Not quite." paneli
    Home, PartEnd, Results — bosh sahifa, qism natijasi (xatolar ro'yxati), yakuniy natija
```

## Savol qo'shish

`src/data/sections.tsx` da kerakli bo'limga:

```tsx
mc('Where ___ you live?', ['do', 'does', 'are'], 0)          // variantli: to'g'ri javob raqami (0 dan)
{ q: 'I like ___ golf. (play)', accept: ['playing'] }        // yoziladigan: accept[0] — namuna javob
```

## Eslatmalar

- Javoblar o'quvchi telefonining brauzerida saqlanadi (`localStorage`) — sahifani yopib qayta ochsa, shu joydan davom etadi.
- Har savolda birinchi javob hisoblanadi. Qismni "Try this part again" bilan qaytadan ishlash mumkin.
- Qorong'i rejim telefon sozlamasiga qarab o'zi yoqiladi.
- Shriftlar Google Fonts'dan yuklanadi; internet bo'lmasa oddiy tizim shrifti chiqadi.
