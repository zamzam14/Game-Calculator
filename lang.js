/* ========================================================================
   lang.js — دعم لغتين (عربي/إنجليزي) مشترك بين Home.html وGame.html
   قاموس ترجمة + دوال تطبيق الترجمة على العناصر اللي عليها data-i18n،
   وضبط اتجاه الصفحة (rtl/ltr) حسب اللغة المختارة، محفوظة بـ localStorage.
   ========================================================================= */

const I18N = {
  ar: {
    dir: 'rtl',
    pageTitleHome: 'Home-Game Calculator',
    pageTitleGame: 'Game Start-Game Calculator',
    heroTitle: '🪢 وقت اللعب!',
    subtitle: 'لعبة رياضيات تنافسية — فريقان يتنافسان على الإجابة',
    modeIndividual: '👤 فردي',
    modeTeam: '👥 جماعي',
    person1Placeholder: 'اسم الشخص الأول',
    person2Placeholder: 'اسم الشخص الثاني',
    nameHint: 'الاسم أحرف فقط (عربي أو إنجليزي)، بدون أرقام أو رموز',
    team1Placeholder: 'اسم الفريق الأول',
    team2Placeholder: 'اسم الفريق الثاني',
    playerPlaceholder: 'اسم اللاعب',
    teamCountHint: 'بين 2 و5 لاعبين',
    teamNameHint: 'الأسماء أحرف فقط (عربي أو إنجليزي)، بدون أرقام أو رموز',
    addPlayer: '+ إضافة لاعب',
    maxPlayers: 'الحد الأقصى 5 لاعبين',
    operationsLabel: 'نوع العمليات',
    opAll: 'جميع العمليات',
    opAdd: ' + جمع',
    opSub: ' - طرح',
    opMul: ' × ضرب',
    opDiv: ' ÷ قسمة',
    timeLabelGame: 'مدة اللعبة',
    timeLabelRound: 'مدة كل جولة',
    timeUnlimited: 'بدون وقت محدد',
    time1: '1 دقيقة',
    time2: '2 دقائق',
    time3: '3 دقائق',
    difficultyLabel: 'مستوى الصعوبة',
    diffEasy: 'سهل',
    diffMedium: 'متوسط',
    diffHard: 'صعب',
    startGame: 'ابدأ اللعبة',
    fallbackPerson1: 'اللاعب الأول',
    fallbackPerson2: 'اللاعب الثاني',
    fallbackTeam1: 'الفريق الأول',
    fallbackTeam2: 'الفريق الثاني',
    fallbackPlayer: 'لاعب',

    exitBtn: '← خروج',
    gameTitle: 'شد الحبل — رياضيات',
    pointsLabel: 'النقاط',
    upcomingChallenge: 'التحدي القادم',
    getReady: 'استعداد',
    roundResultTitle: 'نتيجة الجولة',
    tieRound: 'تعادل بالجولة — بدون نقطة',
    tookPoint: (name) => `${name} أخذ النقطة!`,
    winnerLabel: 'الفائز',
    tie: 'تعادل !',
    playAgain: 'العب مرة أخرى',
    roundOf: (r, total) => `الجولة ${r} من ${total}`,
    tiebreakerRound: 'الجولة الفاصلة 🔥',
    suddenDeath: 'موت مفاجئ ⚡ أول إجابة صحيحة تحسم الفوز',
  },
  en: {
    dir: 'ltr',
    pageTitleHome: 'Home-Game Calculator',
    pageTitleGame: 'Game Start-Game Calculator',
    heroTitle: '🪢 Playtime!',
    subtitle: 'A competitive math game — two teams race to answer',
    modeIndividual: '👤 Individual',
    modeTeam: '👥 Team',
    person1Placeholder: "First person's name",
    person2Placeholder: "Second person's name",
    nameHint: 'Letters only (Arabic or English), no numbers or symbols',
    team1Placeholder: 'First team name',
    team2Placeholder: 'Second team name',
    playerPlaceholder: 'Player name',
    teamCountHint: 'Between 2 and 5 players',
    teamNameHint: 'Letters only (Arabic or English), no numbers or symbols',
    addPlayer: '+ Add player',
    maxPlayers: 'Maximum 5 players',
    operationsLabel: 'Operation type',
    opAll: 'All operations',
    opAdd: ' + Addition',
    opSub: ' - Subtraction',
    opMul: ' × Multiplication',
    opDiv: ' ÷ Division',
    timeLabelGame: 'Game duration',
    timeLabelRound: 'Round duration',
    timeUnlimited: 'No time limit',
    time1: '1 minute',
    time2: '2 minutes',
    time3: '3 minutes',
    difficultyLabel: 'Difficulty level',
    diffEasy: 'Easy',
    diffMedium: 'Medium',
    diffHard: 'Hard',
    startGame: 'Start Game',
    fallbackPerson1: 'Player One',
    fallbackPerson2: 'Player Two',
    fallbackTeam1: 'Team One',
    fallbackTeam2: 'Team Two',
    fallbackPlayer: 'Player',

    exitBtn: 'Exit →',
    gameTitle: 'Tug of War — Math',
    pointsLabel: 'Points',
    upcomingChallenge: 'Next Challenge',
    getReady: 'Get Ready',
    roundResultTitle: 'Round Result',
    tieRound: 'Round tied — no point',
    tookPoint: (name) => `${name} scored the point!`,
    winnerLabel: 'Winner',
    tie: 'Tie!',
    playAgain: 'Play Again',
    roundOf: (r, total) => `Round ${r} of ${total}`,
    tiebreakerRound: 'Tiebreaker Round 🔥',
    suddenDeath: 'Sudden Death ⚡ First correct answer wins',
  },
};

function getLang() {
  return localStorage.getItem('game_lang') || 'ar';
}

// t('key') يرجّع نص، أو t('key', ...args) لو كانت الترجمة دالة (زي tookPoint/roundOf)
function t(key, ...args) {
  const val = I18N[getLang()][key];
  return typeof val === 'function' ? val(...args) : val;
}

function applyLangDir() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = I18N[lang].dir;
}

function applyTranslations() {
  applyLangDir();
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const val = t(el.getAttribute('data-i18n'));
    if (typeof val === 'string') el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const val = t(el.getAttribute('data-i18n-placeholder'));
    if (typeof val === 'string') el.placeholder = val;
  });
  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = getLang() === 'ar' ? 'EN' : 'عربي';
}

function setLang(lang) {
  localStorage.setItem('game_lang', lang);
  applyTranslations();
  if (typeof onLangChange === 'function') onLangChange(); // خطّاف تعيده كل صفحة لتحديث نصوصها الديناميكية
}

function toggleLang() {
  setLang(getLang() === 'ar' ? 'en' : 'ar');
}

// نضبط lang/dir فورًا (بدون انتظار DOMContentLoaded) عشان ما تصير ومضة اتجاه خاطئ
// أثناء تحميل الصفحة — ده يشتغل صح فقط إذا كان <script src="lang.js"> داخل <head>
applyLangDir();

document.addEventListener('DOMContentLoaded', applyTranslations);
