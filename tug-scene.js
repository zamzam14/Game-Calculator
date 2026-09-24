// مشهد شد الحبل: ٦ أطفال بأسلوب الخط الواحد + حبل يتحرك كوحدة واحدة
// TugScene.update(r)  → r من 0 إلى 1 (نسبة إجابات الفريق 1 الصحيحة)، 0.5 = المنتصف
// TugScene.shake()    → اهتزاز خفيف للأطفال أثناء الشد
const TugScene = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  const INK = '#000', HAIR = '#7A4A2A';
  const CENTER = 450, ROPE_Y = 170, GROUND_Y = 263, MAX = 130;
  const TEAM1 = '#3b82f6', TEAM2 = '#ef4444';

  const LEFT = [
    { x: 380, shirt: '#FFD23F', shorts: '#3D5A80', skin: '#F6C9A6', pony: false },
    { x: 312, shirt: '#3BCE8C', shorts: '#8C5A3C', skin: '#E3A77F', pony: true },
    { x: 244, shirt: '#FF7AA2', shorts: '#3D5A80', skin: '#F6C9A6', pony: false },
  ];
  const RIGHT = [
    { x: 520, shirt: '#9B72F2', shorts: '#3D5A80', skin: '#E3A77F', pony: true },
    { x: 588, shirt: '#4CC9F0', shorts: '#8C5A3C', skin: '#F6C9A6', pony: false },
    { x: 656, shirt: '#FFD23F', shorts: '#3D5A80', skin: '#E3A77F', pony: false },
  ];

  let svg, rig, goalL, goalR, shakeTimer;

  const limb = (d, c, w = 4) =>
    `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 3}" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

  const rope = (d) =>
    `<g fill="none" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="${d}" stroke="${INK}" stroke-width="7.5"/>` +
    `<path d="${d}" stroke="#E6B96F" stroke-width="4.5"/>` +
    `<path d="${d}" stroke="#B9853E" stroke-width="4.5" stroke-dasharray="2 6"/></g>`;

  const coil = (cx, cy, rx, ry) =>
    rope(`M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${2 * rx} 0 a ${rx} ${ry} 0 1 0 ${-2 * rx} 0`);

  function kid(k, flip, delay) {
    return `<g transform="translate(${k.x} ${ROPE_Y}) scale(${flip ? -1 : 1} 1)">
      <g class="tow-kid" style="animation-delay:${delay}ms">
        ${limb('M -14 44 L -7 68 L -10 90', k.skin)}
        <path d="M -16 92 L -3 92" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>
        ${limb('M -12 44 L 3 65 L 12 89', k.skin)}
        <path d="M 9 91 L 22 91" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>
        <path d="M -26 46 L -6 36 L 5 55 L -9 60 L -13 52 L -19 62 Z" fill="${k.shorts}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        ${limb('M -40 4 Q -20 6 -3 1', k.skin, 3.5)}
        <path d="M -32 -5 Q -46 -2 -53 9 L -27 50 Q -14 46 -4 38 Z" fill="${k.shirt}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        ${limb('M -36 8 Q -16 9 4 0', k.skin, 3.5)}
        <circle cx="-50" cy="-17" r="13" fill="${k.skin}" stroke="${INK}" stroke-width="2"/>
        <path d="M -40 -27 A 14 14 0 0 0 -62 -7 Q -49 -13 -40 -27 Z" fill="${HAIR}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        ${k.pony ? `<circle cx="-66" cy="-24" r="5.5" fill="${HAIR}" stroke="${INK}" stroke-width="2"/>` : ''}
        <circle cx="-3" cy="1" r="3.8" fill="${k.skin}" stroke="${INK}" stroke-width="1.8"/>
        <circle cx="4" cy="0" r="3.8" fill="${k.skin}" stroke="${INK}" stroke-width="1.8"/>
      </g></g>`;
  }

  function build() {
    svg = document.getElementById('tugScene');
    if (!svg) return;
    let ticks = '';
    for (let i = -5; i <= 5; i++) {
      const tx = CENTER + i * (MAX / 5);
      const goal = Math.abs(i) === 5;
      ticks += `<line ${goal ? `id="${i < 0 ? 'tugGoalL' : 'tugGoalR'}"` : ''} x1="${tx}" x2="${tx}"
        y1="${GROUND_Y + 7}" y2="${GROUND_Y + (goal ? 20 : 12)}" stroke="${INK}"
        stroke-width="${goal ? 5 : 1.5}" stroke-linecap="round"/>`;
    }
    const le = LEFT[2].x, re = RIGHT[2].x;
    svg.innerHTML = `
      <line x1="16" y1="${GROUND_Y}" x2="884" y2="${GROUND_Y}" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
      ${ticks}
      <line x1="${CENTER}" y1="98" x2="${CENTER}" y2="${GROUND_Y + 26}" stroke="${INK}" stroke-width="3" stroke-dasharray="0.1 9" stroke-linecap="round"/>
      <g id="tugRig" class="tow-rig">
        ${rope(`M ${le} ${ROPE_Y} L ${re} ${ROPE_Y}`)}
        ${rope(`M ${le} ${ROPE_Y} C 210 172 198 222 187 257`)}
        ${coil(160, 259, 28, 7)}${coil(158, 253, 20, 5)}
        ${rope(`M ${re} ${ROPE_Y} C 690 172 702 222 713 257`)}
        ${coil(740, 259, 28, 7)}${coil(742, 253, 20, 5)}
        <g transform="translate(${CENTER} ${ROPE_Y})" stroke="${INK}" stroke-width="2" stroke-linejoin="round" fill="#E63946">
          <path d="M -2 3 L -8 24 L -3 21 L 1 26 Z"/><path d="M 2 3 L 7 23 L 2 21 Z"/>
          <path d="M 0 0 L -13 -9 L -13 9 Z"/><path d="M 0 0 L 13 -9 L 13 9 Z"/><circle r="4"/>
        </g>
        ${LEFT.map((k, i) => kid(k, false, i * 60)).join('')}
        ${RIGHT.map((k, i) => kid(k, true, i * 60 + 30)).join('')}
      </g>`;
    rig = document.getElementById('tugRig');
    goalL = document.getElementById('tugGoalL');
    goalR = document.getElementById('tugGoalR');
  }

  // الفريق 1 يظهر يمين الشاشة بالعربي ويسارها بالإنجليزي — نخلي أطفاله بنفس الجهة
  const team1OnRight = () => document.documentElement.dir === 'rtl';

  function update(r) {
    if (!svg) build();
    if (!rig) return;
    const right = team1OnRight();
    goalR.setAttribute('stroke', right ? TEAM1 : TEAM2);
    goalL.setAttribute('stroke', right ? TEAM2 : TEAM1);
    const tx = (r - 0.5) * 2 * MAX * (right ? 1 : -1);
    rig.style.transform = `translateX(${tx}px)`;
  }

  function shake() {
    if (!svg) return;
    svg.classList.remove('is-tugging');
    void svg.getBoundingClientRect();
    svg.classList.add('is-tugging');
    clearTimeout(shakeTimer);
    shakeTimer = setTimeout(() => svg.classList.remove('is-tugging'), 1000);
  }

  return { build, update, shake };
})();
