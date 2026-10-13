# Headway Elementary — Unit 3 test

**Work hard, play hard!** bo'limi bo'yicha o'quvchini tekshiradigan interaktiv test (Headway Elementary Student's Book, 4th edition).
Sayt to'liq ingliz tilida, avvalo telefon uchun qilingan: bitta ekranda bitta savol, katta tugmalar, javobdan keyin pastda "Continue".
**Yozish minimal** (Z avlodi uchun): hamma savollar bosib javob beriladi; arizada faqat ism va familiya yoziladi, qolgani tugmalar bilan.

Ikki qism — bosh sahifada alohida kartochkalar, har ekranda yorliq (CLASSWORK / HOMEWORK) va kitobdagi bet:

| Qism | Kitobning qayeri | Nima |
|------|------------------|------|
| **Classwork** | old qismi, 22–29-betlar | sinfda o'qituvchi bilan ishlangan dars: 9 qism, 84 savol |
| **Homework** | orqa qismi: Writing Unit 3 (106-bet), Grammar Reference (135–136-betlar) | uy vazifasi: 7 qism, 51 savol + o'z arizasini to'ldirish |

React + TypeScript + Tailwind CSS + Vite.

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tayyor sayt dist/ papkasiga (istalgan hostingga qo'yiladi)
npm run typecheck  # faqat TypeScript tekshiruvi
```

## Classwork (9 qism, 84 savol)

| # | Qism | Turi |
|---|------|------|
| 1 | Marco's two jobs — matnga fe'l qo'yish | variant |
| 2 | Questions & negatives — do / does / don't / doesn't | variant |
| 3 | Question words — What time, Where, Who, Why, How | variant |
| 4 | Make it opposite — gapni teskarisiga aylantirish | variant |
| 5 | How often? — always … never, so'z tartibi | variant |
| 6 | Free time — bo'sh vaqt, so'z birikmalari, oylar, fasllar | variant |
| 7 | like + -ing — playing, running, dancing (to'g'ri yozilishini tanlash) | variant |
| 8 | Jamie or Shilpa? — "Town and country weekends" matni | variant |
| 9 | Social expressions — kundalik iboralar | variant |

## Homework (7 qism, 51 savol + yozma ish)

| # | Qism | Bet | Turi |
|---|------|-----|------|
| 1 | Lena's application form — "Fit & Well" arizasi bo'yicha savollar (forma savol tepasida) | 106 | variant |
| 2 | Form words — surname, BLOCK CAPITALS, tick, underline, dd/mm/yy, Mr/Mrs/Miss/Ms | 106 | variant |
| 3 | Your application form — o'quvchi o'z arizasini to'ldiradi (ism/familiya yoziladi; title, sana dd/mm/yy, millat, shahar, sport, imzo — bosish bilan); tekshiruvdan o'tsa "o'zim haqimda" matni va Lena bilan solishtirish chiqadi | 106 | yozma ish (ballsiz) |
| 4 | Present Simple: short answers (Grammar Reference 3.1) | 135 | variant |
| 5 | Adverbs of frequency (3.2) — so'z gapda qayerda turadi | 136 | variant |
| 6 | like / love + -ing (3.3) | 136 | variant |
| 7 | Prepositions — from/to, on, at, until, in, to, of | 136 | variant |

## Tuzilishi

```
src/
  main.tsx, App.tsx      — kirish nuqtasi; App qaysi ekran ochiqligini (View) boshqaradi
  types.ts               — Section, Group (class / home), McItem, Answer, View turlari
  data/
    classwork.tsx        — sinf ishi savollari (old qism, 22–29-betlar)
    homework.tsx         — uy vazifasi savollari (orqa qism, 106 va 135–136-betlar)
    sections.ts          — ikkalasini birlashtiradi; GROUPS — "Front/Back of the book" matnlari
  store.ts               — useAnswers(): javoblar, localStorage'ga saqlash
  lib/
    check.ts             — to'g'ri javob matni
    stats.ts             — bo'lim / guruh balli, keyingi bo'lim, "davom etish" qayerdan boshlanadi
    form.ts              — ariza maydonlari (qaysi biri yoziladi / bosiladi), Lena namunasi, tekshirish, "o'zim haqimda" matni
  components/
    ui.tsx               — BigButton, GroupBadge, BookStrip (kitob chizig'i), PartHeader, Score, PartList
    TopBar.tsx           — tepadagi progress va ball (ochiq guruh bo'yicha)
    Question.tsx         — savol ekrani: variantlar, kerak bo'lsa Lenaning formasi
    FormCard.tsx         — "Fit & Well" ariza formasi: faqat o'qish (Lena) yoki to'ldirish (o'quvchi)
    Writing.tsx          — yozma ish: o'z arizasini to'ldirish va tayyor matn
    FeedbackBar.tsx      — pastdan chiqadigan "Correct! / Not quite." paneli (+ izoh)
    Home, PartEnd, Results — bosh sahifa (2 kartochka), qism natijasi (xatolar ro'yxati), guruh natijasi
```

## Savol qo'shish

`src/data/classwork.tsx` yoki `src/data/homework.tsx` da kerakli bo'limga:

```tsx
mc('Where ___ you live?', ['do', 'does', 'are'], 0)                       // variantli: to'g'ri javob raqami (0 dan)
mc('Is she married?', ['Yes, she is.', "No, she isn't."], 1, { why: '…' }) // why — javobdan keyin chiqadigan izoh
```

## Eslatmalar

- Javoblar o'quvchi telefonining brauzerida saqlanadi (`localStorage`) — sahifani yopib qayta ochsa, shu joydan davom etadi.
- Har savolda birinchi javob hisoblanadi. Qismni "Try this part again" bilan qaytadan ishlash mumkin.
- Qorong'i rejim telefon sozlamasiga qarab o'zi yoqiladi.
- Shriftlar Google Fonts'dan yuklanadi; internet bo'lmasa oddiy tizim shrifti chiqadi.
