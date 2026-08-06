# 🪢 Game Calculator — Math Tug of War

A competitive, browser-based math game where players or teams race to answer correctly and pull the rope to their side. No build tools, no dependencies — pure HTML/CSS/JS.

**Languages:** [English](#english) | [العربية](#العربية)

---

## English

### Overview

Two sides face off answering math questions as fast and accurately as possible. Every correct answer pulls the rope toward that side. Play head-to-head, or set up full teams where members rotate in automatically, round after round, until a winner is decided.

### Features

- **Two game modes**
  - **Individual** — one person vs. another.
  - **Team** — 2 to 5 players per team; a random pair faces off each round.
- **Automatic round rotation** — when a round's timer ends, the next random pair steps in until everyone has played.
- **Round-based scoring** — the side with more correct answers in a round earns their team 1 point. If the match ends tied on points, a decisive **tiebreaker round** is played; if that's still tied, **sudden death** kicks in (first correct answer wins).
- **Pre-round "Get Ready" screen** — announces the upcoming matchup with a countdown before questions start.
- **Post-round result screen** — announces which side scored the point.
- **Configurable settings** — operation type (all / addition / subtraction / multiplication / division), round duration, and difficulty (easy / medium / hard).
- **Live tug-of-war visual** — a rope and progress bar that shift in real time based on each round's performance.
- **Bilingual UI (Arabic/English)** — full text translation plus automatic RTL/LTR layout switching, with your language choice remembered between pages.
- **Name validation** — team/player names accept letters only (Arabic or English), no numbers or symbols.

### Getting Started

No installation or build step required.

1. Clone or download this repository.
2. Open `Home.html` directly in any modern browser — or serve the folder with any static file server (e.g. `python -m http.server`, the VS Code Live Server extension, or a static host like GitHub Pages / Netlify).
3. Choose Individual or Team mode, fill in the names, pick your settings, and press **Start**.

### Project Structure

```
Game-Calculator/
├── Home.html      # Setup screen: game mode, names, options
├── Game.html       # Gameplay: rounds, timer, scoring, results
├── style.css       # All styling for both pages
├── lang.js         # Shared Arabic/English translation engine
├── index.html      # Redirects to Home.html
└── img/
    └── background.PNG
```

### Tech Stack

Vanilla HTML, CSS, and JavaScript only — no frameworks, no package manager, no build step.

### License

[MIT](LICENSE)

### Author

Zamzam Issa

---

## العربية

### نظرة عامة

فريقان (أو شخصان) يتنافسان على الإجابة بسرعة ودقة على أسئلة رياضية. كل إجابة صحيحة تشد الحبل نحو الجهة اللي جاوبت. تقدر تلعب فردي (شخص ضد شخص)، أو جماعي بفرق كاملة يتبادل أعضاؤها الدور تلقائيًا جولة بعد جولة لين تُحسم النتيجة.

### المميزات

- **وضعان للعب**
  - **فردي** — شخص ضد شخص.
  - **جماعي** — من 2 إلى 5 لاعبين بكل فريق؛ زوج عشوائي يتنافس كل جولة.
- **تبديل تلقائي للاعبين** — لما ينتهي وقت الجولة، يدخل زوج عشوائي جديد لين يلعب الجميع.
- **نظام نقاط بالجولة** — الطرف اللي يجاوب أكثر صح بالجولة ياخذ فريقه نقطة. لو انتهت المباراة بتعادل بالنقاط، تُلعب **جولة فاصلة** حاسمة؛ ولو استمر التعادل، يبدأ **الموت المفاجئ** (أول إجابة صحيحة تحسم الفوز).
- **شاشة استعداد قبل كل جولة** — تعلن اللاعبَين القادمَين مع عدّاد تنازلي قبل بدء الأسئلة.
- **شاشة نتيجة بعد كل جولة** — تعلن مين أخذ النقطة.
- **إعدادات قابلة للتخصيص** — نوع العمليات (الكل / جمع / طرح / ضرب / قسمة)، مدة الجولة، ومستوى الصعوبة (سهل / متوسط / صعب).
- **مؤثر شد الحبل الحي** — حبل وشريط تقدّم يتحركان لحظيًا حسب أداء كل جولة.
- **واجهة بلغتين (عربي/إنجليزي)** — ترجمة كاملة للنصوص مع تبديل تلقائي لاتجاه الصفحة (يمين لليسار / يسار لليمين)، واختيار اللغة يُحفظ بين الصفحات.
- **التحقق من الأسماء** — أسماء الفرق واللاعبين تقبل أحرف فقط (عربي أو إنجليزي)، بدون أرقام أو رموز.

### طريقة التشغيل

بدون أي تثبيت أو خطوات بناء.

1. حمّل أو استنسخ (clone) هذا المستودع.
2. افتح ملف `Home.html` مباشرة بأي متصفح حديث — أو شغّله عبر أي سيرفر ملفات ثابتة (مثل `python -m http.server`، إضافة Live Server في VS Code، أو استضافة ثابتة زي GitHub Pages / Netlify).
3. اختر الوضع فردي أو جماعي، عبّي الأسماء، اضبط الإعدادات، واضغط **ابدأ اللعبة**.

### هيكلة المشروع

```
Game-Calculator/
├── Home.html      # شاشة الإعداد: وضع اللعب، الأسماء، الخيارات
├── Game.html       # اللعب الفعلي: الجولات، المؤقت، النقاط، النتائج
├── style.css       # تنسيق الصفحتين بالكامل
├── lang.js         # محرك الترجمة المشترك (عربي/إنجليزي)
├── index.html      # يحوّل تلقائيًا لـ Home.html
└── img/
    └── background.PNG
```

### التقنيات المستخدمة

HTML وCSS وJavaScript خام فقط — بدون أي إطار عمل (framework)، ولا مدير حزم، ولا خطوة بناء.

### الترخيص

[MIT](LICENSE)

### المطوّرة

زمزم عيسى
